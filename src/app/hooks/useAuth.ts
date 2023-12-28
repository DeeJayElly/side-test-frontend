import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const useAuth = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    // Add logic here to check if the token is expired.
    // For this example, we just check if the token exists.
    if (!token) {
      router.push('/login');
    }
  }, [router]);
};

export default useAuth;
