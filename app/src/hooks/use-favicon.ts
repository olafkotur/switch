import { useQuery } from 'react-query';
import { GOOGLE_FAVICON_URL } from '../const';

// TODO: currently broken due to CORS, use server as proxy instead
export const useFavicon = (url: string) => {
  const { isLoading, error, data } = useQuery('repoData', () =>
    fetch(`${GOOGLE_FAVICON_URL}?domain=${url}&sz=128`).then((res) => res.json()),
  );

  if (isLoading === false && error == null) {
    return data;
  }
};
