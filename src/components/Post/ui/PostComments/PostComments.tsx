import { PostCommentsList } from './PostCommentsList';
import { TCommentsList } from '../../model/types';
import { Typography, Stack, Skeleton } from '@mui/material';
import { useComments } from '@/hooks/hooks';

interface IPostCommentsProps {
  postId: string,
};

export const PostComments = ({postId }: IPostCommentsProps) => {
  const {
    data: comments,
    isLoading: isCommentsLoading,
    isSuccess: isCommentsSuccess
  } = useComments(postId);

  if (isCommentsLoading) {
    return (
      <Stack width={'100%'} padding={{ xs: 2, lg: 10 }} gap={2}>
        <Skeleton variant='text' height={25} />
        <Skeleton variant='text' height={25} />
        <Skeleton variant='text' height={25} />
        <Skeleton variant='text' height={25} />
      </Stack>
    );
  };
  
  return (
    <Stack padding={{ xs: 2, lg: 10 }}>
      <Typography
        color="black"
        fontSize="1.5rem"
      >
        Comments:
      </Typography>

      <div className='p-5'>
        {isCommentsSuccess && <PostCommentsList comments={comments} />}
      </div>
    </Stack>
  );
};