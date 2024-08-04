'use client';

import { forwardRef, useCallback, useState } from 'react';
import { PostsList } from '../PostsList/PostsList';
import { PostsListSkeleton } from '../PostsListSkeleton/PostsListSkeleton';
import { Button, Dialog, DialogContent, Pagination, Slide } from '@mui/material';
import { CreatePostForm } from '../CreatePostForm/CreatePostForm';
import { usePosts } from '@/hooks/hooks';
import { INITIAL_PAGE } from '@/shared/constants';
import { TransitionProps } from '@mui/material/transitions';

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction='up' ref={ref} {...props} />;
});

export const Posts = () => {
  const [currentPage, setCurrentPage] = useState(INITIAL_PAGE);
  const [isOpenCreatePostForm, setIsOpenCreatePostForm] = useState(false);

  const {
    data: posts,
    isLoading,
    isSuccess
  } = usePosts(currentPage);

  const handlePageChange = (
    _: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
  };

  const handleOpenForm = useCallback(() => {
    setIsOpenCreatePostForm(prev => !prev);
  }, []);

  if (isLoading) return <PostsListSkeleton />

  return (
    <>
      {isSuccess && <PostsList posts={posts} />}
           
      <Pagination
        count={6}
        page={currentPage}
        onChange={handlePageChange}
      />

      <Button variant='outlined' onClick={handleOpenForm}>
        Add New Post
      </Button>

      <Dialog
        fullWidth
        maxWidth='sm'
        onClose={handleOpenForm}
        open={isOpenCreatePostForm}
        TransitionComponent={Transition}>
        <DialogContent>
          <CreatePostForm onhandleOpenForm={handleOpenForm} />
        </DialogContent>
      </Dialog>
    </>
  )
};