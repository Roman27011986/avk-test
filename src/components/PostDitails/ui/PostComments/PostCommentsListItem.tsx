import { useState } from 'react';
import { Collapse, Stack, Typography } from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { IComment } from '../../model/types';

interface IPostCommentsListItemProps {
    comment: IComment
};

export const PostCommentsListItem = ({ comment }: IPostCommentsListItemProps) => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <Stack direction="column">
        <Typography
          color="red"
          fontSize="0.8rem"
        >
          {comment.email}
        </Typography>

        <Stack direction="row">
          <Typography
            className='cursor-pointer'
            color="#6b7280"
            fontSize="1rem"
            onClick={handleClick}
          >
            {comment.name}
          </Typography>
            
          {open ? (
            <ExpandLess
              sx={{
                color: '#6b7280'
              }}
            />
          ) : (
            <ExpandMore
              sx={{
                color: '#6b7280'
              }}
            />
          )}
        </Stack>
      </Stack>

      <Collapse
        in={open}
        timeout="auto"
        unmountOnExit
      >
        <Typography color='#6b7280'>
          {comment.body}
        </Typography>
      </Collapse>
    </>
  );
};