import { useQuery } from '@tanstack/react-query';
import { getCommentsByPostId, getPostById, getPosts } from '@/services/posts';
import { EQueryKeys } from '@/shared/types';

const usePosts = (page: number) => {
  return useQuery({
    queryKey: [EQueryKeys.Posts, page],
    queryFn: getPosts,
    retry: false
  });
};

const usePost = (postId: string) => {
  return useQuery({
    queryKey: [EQueryKeys.Post, postId],
    queryFn: getPostById,
    retry: false,
  });
};

const useComments = (postId: string) => {
  return useQuery({
    queryKey: [EQueryKeys.Comments, postId],
    queryFn: getCommentsByPostId
  });
};

export { usePosts, usePost, useComments };