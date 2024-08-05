import { getImage } from '@/services/image';
import { Post } from '@/components/Post/ui/Post/Post';

interface IPostProps {
  params: { id: string };
};

export default async function PostPage({ params }: IPostProps) {
  const postId = params.id;
  const { base64, img } = await getImage(postId);

  return (
    <main>
      <Post postId={postId} imgData={{ base64, img }} />
    </main>
  );
};