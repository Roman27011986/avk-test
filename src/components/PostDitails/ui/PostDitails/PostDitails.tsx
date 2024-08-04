'use client';

import { usePost, useComments } from '@/hooks/hooks';
import { useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';
import { Divider, Stack, Fab, Skeleton } from '@mui/material';
import { PostComments } from '../PostComments/PostComments';
import Link from 'next/link';
import HolidayVillageSharpIcon from '@mui/icons-material/HolidayVillageSharp';
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
    isLoading: isPostLoading,
    isError: isPostError,
  } = usePost(postId);

  const {
    data: comments,
    isLoading: isCommentsLoading,
    isSuccess: isCommentsSuccess
  } = useComments(postId, isPostSuccess);
       
  const post = useMemo(() => {
    if (!isPostError && isPostSuccess) return postData;

    const createdPosts = queryClient.getQueryData(['posts', 6]);

    if (Array.isArray(createdPosts)) {
      return createdPosts.find((post) => post.id === postId.toString());
    };
    
  }, [isPostError, isPostSuccess, postData, queryClient, postId]);

  return (
    <section>
      <Stack
        direction={{ xs: 'column', lg: 'row' }}
        alignItems={"center"}
        padding={{ xs: 2, lg: 10 }}
      >

        <Link href='/' className='absolute top-5 left-5'>
          <Fab variant='extended' size='small'>
            <HolidayVillageSharpIcon color='info'/>
          </Fab>
        </Link>
        
        <Image
          {...imgData.img}
          alt="furniture"
          blurDataURL={imgData.base64}
          placeholder="blur"
        />

        {
          post && !isPostLoading
            ?
            <Stack gap={{ xs: 2, lg: 4 }} marginLeft={{ xs: 0, lg: 10 }}>
              <p className='text-white text-4xl'>
                {post.title}
              </p>
              <p className='text-gray-500'>
                {post.body}
              </p>
            </Stack>
            :
            <Stack width={'100%'} padding={{ xs: 2, lg: 10 }} gap={2}>
              <Skeleton variant='text' width={'100%'} height={45} />
              <Skeleton variant='text' width={'100%'} height={25} />
              <Skeleton variant='text' width={'50%'} height={25} />
            </Stack>
        }
      </Stack>

      <Divider className='mt-3' />

      {
        !isCommentsLoading && isCommentsSuccess
          ?
          <PostComments comments={comments} />
          :
          <Stack width={'100%'} padding={{ xs: 2, lg: 10 }} gap={2}>
            <Skeleton variant='text' height={25} />
            <Skeleton variant='text' height={25} />
            <Skeleton variant='text' height={25} />
            <Skeleton variant='text' height={25} />
          </Stack>
      }
    </section>
  );
};