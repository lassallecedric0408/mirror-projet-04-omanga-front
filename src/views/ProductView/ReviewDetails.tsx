import React from 'react';

import { Stack, Paper, Typography, styled } from '@mui/material';

import { materialUITheme } from '../../utils/materialUITheme';

interface reviewDetailsProps {
  index: number;
  userId: number;
  content: string;
}

const ReviewDetails: React.FC<reviewDetailsProps> = ({
  index,
  userId,
  content,
}) => {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: `${materialUITheme.palette.primary.main}`,
    padding: theme.spacing(1),
    color: `${materialUITheme.palette.secondary.main}`,
  }));

  return (
    <Item key={index}>
      <Stack>
        <Typography
          variant='h6'
          display='block'
          gutterBottom
          sx={{ fontFamily: 'Caveat' }}
        >
          {userId}
        </Typography>
        <Typography
          variant='subtitle1'
          display='block'
          gutterBottom
          sx={{ fontFamily: 'Caveat' }}
        >
          {content}
        </Typography>
      </Stack>
    </Item>
  );
};

export { ReviewDetails };
