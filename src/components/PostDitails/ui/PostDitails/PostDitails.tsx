'use client';

import { usePost, useComments } from '@/hooks/hooks';
import { useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';
import { redirect } from 'next/navigation';
import { Divider, Stack } from '@mui/material';
import { PostComments } from '../PostComments/PostComments';
import Image from 'next/image';
import { IImgData } from '@/shared/types';

interface IPostDitails {
  postId: string,
  imgData: IImgData
};

export const PostDitails = ({ postId, imgData }: IPostDitails) => {
  const queryClient = useQueryClient();

  const {
    data: postData,
    isSuccess: isPostSuccess,
    isError: isPostError
  } = usePost(postId);

  const {
    data: comments,
    isSuccess: isCommentsSuccess
  } = useComments(postId, isPostSuccess);
       
  const post = useMemo(() => {
    if (!isPostError && isPostSuccess) return postData;

    const createdPosts = queryClient.getQueryData(['posts', 6]);

    if (Array.isArray(createdPosts)) {
      return createdPosts.find((post) => post.id === postId.toString());
    };

    redirect('/');
  }, [isPostError, isPostSuccess, postData, queryClient, postId]);

  return (
    <section>
      <Stack
        direction={{ xs: 'column', lg: 'row' }}
        alignItems={"center"}
        padding={{ xs: 2, lg: 10 }}
      >
        <Image
          {...imgData.img}
          alt="furniture"
          blurDataURL={imgData.base64}
          placeholder="blur"
        />

        <Stack gap={{ xs: 2, lg: 4 }} marginLeft={{ xs: 0, lg: 10 }}>
          <p className='text-white text-4xl'>
            {post.title}
          </p>
          <p className='text-gray-500'>{post.body}</p>
        </Stack>
      </Stack>

      <Divider className='mt-3' />

      {
        isCommentsSuccess &&
        <PostComments comments={comments} />
      }
    </section>
  );
};