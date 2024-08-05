'use client';

import { useMemo } from 'react';
import { usePost } from '@/hooks/hooks';
import { useQueryClient } from '@tanstack/react-query';
import { Divider, Stack } from '@mui/material';
import { PostComments } from '../PostComments/PostComments';
import { EQueryKeys, IImgData } from '@/shared/types';
import { CREATED_POST_PAGE } from '@/shared/constants';
import { PostDitails } from '../PostDitails/PostDitails';
import { GoBackBtn } from '@/shared/ui/GoBackBtn/GoBackBtn';
import Image from 'next/image';

interface IPostDitails {
  postId: string,
  imgData: IImgData
};

export const Post = ({ postId, imgData }: IPostDitails) => {
  const queryClient = useQueryClient();

  const {
    data: postData,
    isSuccess: isPostSuccess,
    isLoading: isPostLoading
  } = usePost(postId);

  const post = useMemo(() => {
    if (isPostSuccess) return postData;

    const createdPosts = queryClient.getQueryData([EQueryKeys.Posts, CREATED_POST_PAGE]);

    if (Array.isArray(createdPosts)) {
      return createdPosts.find((post) => post.id === postId);
    };
    
  }, [isPostSuccess, postData, queryClient, postId]);


  return (
    <section>
      <Stack
        direction={{ xs: 'column', lg: 'row' }}
        padding={{ xs: 2, lg: 10 }}
        alignItems={"center"}
      >

        <div className='absolute top-5 left-5'>
          <GoBackBtn />
        </div>
        
        <Image
          {...imgData.img}
          alt="furniture"
          blurDataURL={imgData.base64}
          placeholder="blur"
        />

        <PostDitails post={post} isPostLoading={isPostLoading} />
      </Stack>

      <Divider className='mt-3' />
     
      {isPostSuccess && <PostComments postId={postId} />}
    </section>
  );
};