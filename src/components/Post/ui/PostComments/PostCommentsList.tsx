import { TCommentsList } from '../../model/types';
import { PostCommentsListItem } from './PostCommentsListItem';

interface IPostCommentsListProps {
    comments: TCommentsList
};

export const PostCommentsList = ({ comments }: IPostCommentsListProps) => {
  return (
    <ul className='flex flex-col gap-y-2'>
      {
        comments.map((comment) => (
          <li key={comment.id}>
            <PostCommentsListItem comment={comment} />
          </li>
        ))
      }
    </ul>
  );
};