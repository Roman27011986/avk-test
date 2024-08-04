import { Skeleton } from '@mui/material';

interface IPostsListSkeleton {
    itemsCount?: number
};

export const PostsListSkeleton = ({ itemsCount = 20 }: IPostsListSkeleton) => {
  return (
    <ul>
      {new Array(itemsCount).fill(0).map((item: number, i) => (
        <li key={i}>
          <Skeleton variant='text' width={610} height={25} />
        </li>
      ))}
    </ul>
  );
};