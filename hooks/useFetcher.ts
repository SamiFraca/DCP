import { UserProjectListData } from '@/app/api/profile/user/projects/route';


export const useFetcher: (url: string) => Promise<UserProjectListData> = async (url) => {
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return response.json(); 
};