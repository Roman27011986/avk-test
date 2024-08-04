import { PostCommentsList } from './PostCommentsList';
import { TCommentsList } from '../../model/types';
import { Typography, Stack } from '@mui/material';

interface IPostCommentsProps {
    comments: TCommentsList
};

export const PostComments = ({ comments }: IPostCommentsProps) => {
  return (
    <Stack padding={{ xs: 2, lg: 10 }}>
      <Typography
        color="black"
        fontSize="1.5rem"
      >
        Comments:
      </Typography>

      <div className='p-5'>
        <PostCommentsList comments={comments} />
      </div>
    </Stack>
  );
};