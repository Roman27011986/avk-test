import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { Posts } from '@/components/Posts/ui/Posts/Posts';
import { getPosts } from '@/services/posts';
import { EQueryKeys } from '@/shared/types';
import { INITIAL_PAGE } from '@/shared/constants';
import { Suspense } from 'react'

export default async function Home() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: [EQueryKeys.Posts, INITIAL_PAGE],
    queryFn: getPosts,
  });

  return (
    <main className='flex min-h-screen flex-col items-center justify-evenly'>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense>
          <Posts />
        </Suspense>
      </HydrationBoundary>
    </main>
  );
};
