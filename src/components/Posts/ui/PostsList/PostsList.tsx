import { PostsListItem } from '../PostsListItem/PostsListItem';
import { Paper, Stack } from '@mui/material';
import { IPost, TPostsList } from '../../model/types';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

interface IPostsList {
  posts: TPostsList
};

export const PostsList = ({ posts }: IPostsList) => {
  return (
    <Stack width={{ xs: '90vw', lg: '45vw' }}>
      <Paper elevation={5} className='p-4 w-full h-[72dvh] overflow-y-scroll'>
        <ul className='flex flex-col gap-y-2'>
          {posts.map((post: IPost, i: number) => (
            <li key={post.id + post.title + i} className='w-full flex bg-orange-100 pl-2 border border-indigo-300'>
              <PostsListItem post={post} />
              <ArrowRightIcon />
            </li>
          ))}
        </ul>
      </Paper>
    </Stack>
  );
};