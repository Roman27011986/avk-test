import Link from 'next/link';
import { IPost } from '../../model/types';

interface IPostsListItemProps {
    post: IPost,
};

export const PostsListItem = ({ post }: IPostsListItemProps) => {
  return (
    <Link
      href={`/${post.id}`}
      rel='preload'
      className='block w-full text-orange-900'
    >
      {post.title}
    </Link>
  );
};