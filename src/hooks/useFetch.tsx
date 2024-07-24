import { useEffect, useState } from 'react';

interface FetchResult<T> {
  data: T | null;
  isLoading: boolean;
  isSuccess: boolean;
  error: Error | null;
}

// 이 로직을 다양한 타입에 재사용하기 위해 제네릭 타입<T> 사용
function useFetchData<T>(fetchFunction: () => Promise<T>): FetchResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setLoading] = useState(true);
  //   후속 작업, 후속 API 호출이 필요한 경우를 위해
  const [isSuccess, setSuccess] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetchFunction();
        setData(data);
        setSuccess(true);
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [isLoading]);

  return { data, isLoading, isSuccess, error };
}

export default function useFetch<T>(fetchFunction: () => Promise<T>) {
  const { data, isLoading, isSuccess, error } = useFetchData(fetchFunction);
  return { data, isLoading, isSuccess, error };
}