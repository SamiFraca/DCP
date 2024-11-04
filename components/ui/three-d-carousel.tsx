"use client";

import { memo, useEffect, useLayoutEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useAnimation,
  useMotionValue,
  useTransform,
} from "framer-motion";
import {
  FlaskConical,
  Cpu,
  Trophy,
  Palette,
  BriefcaseBusiness,
  Calculator,
  Cog,
  Megaphone,
} from "lucide-react";
import Link from "next/link";
export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

type UseMediaQueryOptions = {
  defaultValue?: boolean;
  initializeWithValue?: boolean;
};

const IS_SERVER = typeof window === "undefined";

export function useMediaQuery(
  query: string,
  {
    defaultValue = false,
    initializeWithValue = true,
  }: UseMediaQueryOptions = {}
): boolean {
  const getMatches = (query: string): boolean => {
    if (IS_SERVER) {
      return defaultValue;
    }
    return window.matchMedia(query).matches;
  };

  const [matches, setMatches] = useState<boolean>(() => {
    if (initializeWithValue) {
      return getMatches(query);
    }
    return defaultValue;
  });

  const handleChange = () => {
    setMatches(getMatches(query));
  };

  useIsomorphicLayoutEffect(() => {
    const matchMedia = window.matchMedia(query);
    handleChange();

    matchMedia.addEventListener("change", handleChange);

    return () => {
      matchMedia.removeEventListener("change", handleChange);
    };
  }, [query]);

  return matches;
}

const categories = [
  {
    icon: <FlaskConical width={100} height={100} aria-hidden="true" />,
    textKey: "CategoryGrid.Science",
  },
  {
    icon: <Cpu width={100} height={100} aria-hidden="true" />,
    textKey: "CategoryGrid.IT",
  },
  {
    icon: <Trophy width={100} height={100} aria-hidden="true" />,
    textKey: "CategoryGrid.Sports",
  },
  {
    icon: <Palette width={100} height={100} aria-hidden="true" />,
    textKey: "CategoryGrid.Arts",
  },
  {
    icon: <BriefcaseBusiness width={100} height={100} aria-hidden="true" />,
    textKey: "CategoryGrid.Business",
  },
  {
    icon: <Calculator width={100} height={100} aria-hidden="true" />,
    textKey: "CategoryGrid.Mathematics",
  },
  {
    icon: <Cog width={100} height={100} aria-hidden="true" />,
    textKey: "CategoryGrid.Engineering",
  },
  {
    icon: <Megaphone width={100} height={100} aria-hidden="true" />,
    textKey: "CategoryGrid.Communication",
  },
];

const Carousel = memo(
  ({
    controls,
    cards,
    isCarouselActive,
  }: {
    handleClick: (category: string, index: number) => void;
    controls: any;
    cards: typeof categories;
    isCarouselActive: boolean;
  }) => {
    const isScreenSizeSm = useMediaQuery("(max-width: 640px)");
    const cylinderWidth = isScreenSizeSm ? 1100 : 2500;
    const faceCount = cards.length;
    const faceWidth = cylinderWidth / faceCount;
    const radius = cylinderWidth / (2 * Math.PI);
    const rotation = useMotionValue(0);
    const transform = useTransform(
      rotation,
      (value) => `rotate3d(0, 1, 0, ${value}deg)`
    );

    return (
      <div
        role="region"
        aria-label="Category Carousel"
        className="flex h-full items-center justify-center bg-mauve-dark-2"
        style={{
          perspective: "1000px",
          transformStyle: "preserve-3d",
          willChange: "transform",
        }}
      >
        <motion.div
          drag={isCarouselActive ? "x" : false}
          className="relative flex h-full origin-center cursor-grab justify-center active:cursor-grabbing"
          style={{
            transform,
            rotateY: rotation,
            width: cylinderWidth,
            transformStyle: "preserve-3d",
          }}
          onDrag={(_, info) =>
            isCarouselActive &&
            rotation.set(rotation.get() + info.offset.x * 0.01)
          }
          onDragEnd={(_, info) => {
            if (isCarouselActive) {
              controls.start({
                rotateY: rotation.get() + info.velocity.x * 0.01,
                transition: {
                  type: "spring",
                  mass: 0.3,
                },
              });
            }
          }}
          animate={controls}
        >
          {cards.map((category, i) => (
            <motion.div
              key={`category-${category.textKey}-${i}`}
              className="absolute flex h-full origin-center items-center justify-center rounded-xl bg-mauve-dark-2 p-2"
              style={{
                width: `${faceWidth}px`,
                transform: `rotateY(${
                  i * (360 / faceCount)
                }deg) translateZ(${radius}px)`,
              }}
            >
              <Link
                href={"./test"}
                tabIndex={0}
                aria-label={category.textKey.split(".")[1]}
              >
                <motion.div
                  layoutId={`category-${category.textKey}`}
                  className="flex flex-col items-center bg-background border p-5 rounded-md hover:card-hover"
                >
                  {category.icon}
                  <h2 className="mt-2 text-center" id={`category-title-${i}`}>
                    {category.textKey.split(".")[1]}
                  </h2>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    );
  }
);
Carousel.displayName = "Carousel";

function ThreeDPhotoCarousel() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [isCarouselActive, setIsCarouselActive] = useState(true);
  const controls = useAnimation();

  const handleClick = (category: string) => {
    setActiveCategory(category);
    setIsCarouselActive(false);
    controls.stop();
  };

  return (
    <motion.div layout className="relative">
      <AnimatePresence mode="sync">
        {activeCategory && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            layoutId={`category-container-${activeCategory}`}
            layout="position"
            className="fixed inset-0 bg-black bg-opacity-10 flex items-center justify-center z-50 m-5 md:m-36 lg:mx-[19rem] rounded-3xl"
            style={{ willChange: "opacity" }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          ></motion.div>
        )}
      </AnimatePresence>
      <div className="relative h-[500px] w-full overflow-hidden">
        <Carousel
          handleClick={handleClick}
          controls={controls}
          cards={categories}
          isCarouselActive={isCarouselActive}
        />
      </div>
    </motion.div>
  );
}

export { ThreeDPhotoCarousel };
