import { useRouter } from 'next/router';

interface UseEventHistory {
  loading: boolean;
  error: boolean;
  history: []
}

export const useEventHistory = (): UseEventHistory => {
  const router = useRouter();

  console.log(router.query);

  return {
    loading: true,
    error: false,
    history: [],
  };
};
