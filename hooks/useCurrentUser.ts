import fetcher from '@/lib/fetcher';
import useSWR from 'swr';

const useCurrentUser = () => {

    const { data, error , isLoading, mutate} = useSWR('/api/current', fetcher);
    const user= data;
    const loading = isLoading;
    const isError = error;
    console.log(isLoading, isError, user);
    return { user, loading, isError, mutate };

}

export default useCurrentUser;