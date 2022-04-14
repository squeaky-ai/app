import { useRouter } from 'next/router';
import type { Recording } from 'types/graphql';

interface Props {
  recording: Recording;
}

interface UsePrevAndNextRecording {
  prev: string | null;
  next: string | null;
}

export const usePrevAndNextRecording = (props: Props): UsePrevAndNextRecording => {
  const router = useRouter();

  const getRecordingLink = (id: string) => `/sites/${router.query.site_id}/recordings/${id}`;
  
  console.log(props, getRecordingLink(''));

  return {
    prev: null,
    next: null,
  };
};
