import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signIn } from '@/lib/auth'; 
import { RootState } from '@/store';
import { setUser, setError } from '@/features/authSlice';
import { useRouter } from 'next/navigation';

export default function SignUp() {
  const dispatch = useDispatch();
  const { user, error } = useSelector((state: RootState) => state.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const { user: signedInUser, error: signInError } = await signIn(email, password);


    if (signInError) {
      dispatch(setError(signInError));
    } else {
      dispatch(setUser(signedInUser));
      router.push('/?registration=success');
    }
    console.log(user);
  };

  return (
    <div>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Sign In</button>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
}