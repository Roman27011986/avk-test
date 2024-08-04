import { PostDitails } from '@/components/PostDitails/ui/PostDitails/PostDitails';
import { getPostById } from '@/services/posts';
import { EQueryKeys } from '@/shared/types';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { getImage } from '@/services/image';

interface IPostProps {
  params: { id: string };
};

export default async function Post({ params }: IPostProps) {
  const queryClient = new QueryClient();
  const postId = params.id;

  await queryClient.prefetchQuery({
    queryKey: [EQueryKeys.Post, postId],
    queryFn: getPostById,
  });

  const { base64, img } = await getImage(`https://via.assets.so/furniture.png?id=${postId}&q=95&w=320&h=320&fit=fill`);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PostDitails postId={postId} imgData={{ base64, img }} />
    </HydrationBoundary>
  );
};