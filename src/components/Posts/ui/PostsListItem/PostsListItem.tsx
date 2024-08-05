import Link from 'next/link';
import { IPost } from '../../model/types';
import { usePathname, useSearchParams } from 'next/navigation';

interface IPostsListItemProps {
    post: IPost,
};

export const PostsListItem = ({ post }: IPostsListItemProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams().toString();
  const params = new URLSearchParams(searchParams).toString();
  
  return (
    <Link
      href={{
        pathname: pathname + post.id,
        query: params
      }}
      className='block w-full text-orange-900'
    >
      {post.title}
    </Link>
  );
};