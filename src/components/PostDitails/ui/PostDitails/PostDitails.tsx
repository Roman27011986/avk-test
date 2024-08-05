import { IPost } from "@/components/Posts/model/types"
import { Skeleton, Stack } from "@mui/material";

interface IPostDitailsProps {
  post: IPost,
  isPostLoading: boolean
};

export const PostDitails = ({ post, isPostLoading }: IPostDitailsProps) => {
  if (isPostLoading) {
    return (
      <Stack width={'100%'} padding={{ xs: 2, lg: 10 }} gap={2}>
        <Skeleton variant='text' width={'100%'} height={45} />
        <Skeleton variant='text' width={'100%'} height={25} />
        <Skeleton variant='text' width={'50%'} height={25} />
      </Stack>
    );
  };
  
  return (
    <Stack gap={{ xs: 2, lg: 4 }} marginLeft={{ xs: 0, lg: 10 }}>
      <p className='text-white text-4xl'>
        {post.title}
      </p>
      <p className='text-gray-500'>
        {post.body}
      </p>
    </Stack>
  );
};