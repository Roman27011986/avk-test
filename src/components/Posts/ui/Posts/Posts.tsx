'use client';

import { useCallback, useLayoutEffect, useState } from 'react';
import { PostsList } from '../PostsList/PostsList';
import { PostsListSkeleton } from '../PostsListSkeleton/PostsListSkeleton';
import { Button, Dialog, DialogContent, Pagination } from '@mui/material';
import { CreatePostForm } from '../CreatePostForm/CreatePostForm';
import { usePosts } from '@/hooks/hooks';
import { INITIAL_PAGE } from '@/shared/constants';
import { useSearchParams, useRouter } from 'next/navigation'
import { EQueryParams } from '@/shared/types';

export const Posts = () => {
  const [currentPaginationPage, setCurrentPaginationPage] = useState(INITIAL_PAGE);
  const [isOpenCreatePostForm, setIsOpenCreatePostForm] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const {
    data: posts,
    isLoading,
    isSuccess
  } = usePosts(currentPaginationPage);

  const handlePaginationPageChange = (
    _: React.ChangeEvent<unknown>,
    value: number
  ) => {
    if (value === currentPaginationPage) return;

    router.push(`?${EQueryParams.Page}=${value}`)
    setCurrentPaginationPage(value);
  };

  const handleOpenForm = useCallback(() => {
    setIsOpenCreatePostForm(prev => !prev);
  }, []);

  useLayoutEffect(() => {
    const currentPageBySearchParams = Number(searchParams.get(EQueryParams.Page))
 
    if (currentPageBySearchParams) {
      setCurrentPaginationPage(currentPageBySearchParams);
    };
    
  }, [searchParams])

  if (isLoading) return <PostsListSkeleton />

  return (
    <>
      {isSuccess && <PostsList posts={posts} />}
           
      <Pagination
        count={6}
        page={currentPaginationPage}
        onChange={handlePaginationPageChange}
      />

      <Button variant='outlined' onClick={handleOpenForm}>
        Add New Post
      </Button>

      <Dialog
        fullWidth
        maxWidth='sm'
        onClose={handleOpenForm}
        open={isOpenCreatePostForm}
      >
        <DialogContent>
          <CreatePostForm
            onhandleOpenForm={handleOpenForm}
          />
        </DialogContent>
      </Dialog>
    </>
  )
};