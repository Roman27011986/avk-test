import { apiPosts } from '@/api';
import { TCommentsList } from '@/components/PostDitails/model/types';
import { IPost, TPostsList } from '@/components/Posts/model/types'; 
import { MutationFunction, QueryFunction } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

const getPosts: QueryFunction<TPostsList, [string, number]> = async ({ queryKey }) => {
  try {
    const [_key, page] = queryKey;
    const { data } = await apiPosts.get(`posts?_limit=20&_page=${page}`);
    toast.success(`success posts page ${page}`);
    return data;
  } catch (error) {
    throw new Error('posts not found');
  };
};

const getPostById: QueryFunction<IPost, [string, string]> = async ({ queryKey }) => {
    try {
      const [_key, postId] = queryKey;
      const { data } = await apiPosts.get(`posts/${postId}`);
      return data;
    } catch (error) {
      throw new Error('api not save created post :)');
    }
};

const getCommentsByPostId: QueryFunction<TCommentsList, [string, string]> = async ({ queryKey }) => {
  const [_key, postId] = queryKey;
  const { data } = await apiPosts.get(`posts/${postId}/comments`);
  return data;
};

const createPost: MutationFunction<Omit<IPost, number>> = async (newPost) => {
  try {
    const { data } = await apiPosts.post('posts', newPost);
    toast.success(`success sdded new post in 6 page`);
    return data;
  } catch (error) {
    throw new Error('error create post');
  }
};

export {
  getPosts,
  createPost,
  getPostById,
  getCommentsByPostId,
};