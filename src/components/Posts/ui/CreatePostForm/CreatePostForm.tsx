import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { Stack, Typography, OutlinedInput, TextField, Button } from '@mui/material';
import { EKeyCode } from '@/shared/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createPost } from '@/services/posts';
import { TPostsList } from '../../model/types';
import { useRouter } from 'next/navigation';
import { EQueryKeys } from '@/shared/types';
import { yupResolver } from '@hookform/resolvers/yup';
import { v4 as uuidv4 } from 'uuid';
import SendIcon from '@mui/icons-material/Send';
import schema from './schema';

interface FormValues {
  title: string,
  body: string,
};

export const CreatePostForm = () => {
  const formRef = useRef<HTMLButtonElement>(null);
  const { push } = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({ mode: 'onChange', resolver: yupResolver(schema) });

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: createPost,
    onSuccess: (data) => {
      const newPost = {
          ...data,
          id: uuidv4()
      };
    
      queryClient.setQueryData([EQueryKeys.Posts, 6], (currentPosts: TPostsList) => {
        
      if (currentPosts) {
        return [...currentPosts, newPost]
      };
                
        return [newPost]
      });

      push(`/${newPost.id}`);
    },
  });

  const onSubmit = async (data: FormValues) => {
    const { title, body } = data;
    mutate({ userId: 1, title, body });
    reset();
  };

  const handleKeypress = (e: KeyboardEvent) => {
    if (formRef?.current && e.code === EKeyCode.Enter && !e.shiftKey) {
      e.preventDefault();
      formRef.current.click();
    };
  };

  useEffect(() => {
    document.addEventListener('keypress', handleKeypress);
    return () => {
      document.removeEventListener('keypress', handleKeypress);
    };
  }, []);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='w-full'
    >
      <Stack spacing={1}>
        <OutlinedInput
          fullWidth
          size='small'
          placeholder='Title'
          type='text'
          {...register('title')}
        />

        <Stack position='relative'>
          <ErrorMessage
            errors={errors}
            name='title'
            render={({ message }) => (
              <Typography
                variant='caption'
                color='red'
                className='absolute bottom-[-10px] left-10'
              >
                {message}
              </Typography>
            )}
          />
        </Stack>
                
        <OutlinedInput
          fullWidth
          size='small'
          placeholder='Body'
          type='text'
          multiline
          rows={4}
          {...register('body')}
        />

        <Stack position='relative'>
          <ErrorMessage
            errors={errors}
            name='body'
            render={({ message }) => (
              <Typography
                className='absolute bottom-[-10px] left-10'
                variant='caption'
                color='red'
              >
                {message}
              </Typography>
            )}
          />
        </Stack>

        <Button
          ref={formRef}
          variant='contained'
          color='success'
          endIcon={<SendIcon />}
          type='submit'
        >
          Send
        </Button>
      </Stack>
    </form>
  );
};