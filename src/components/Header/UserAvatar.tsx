import React from 'react';
import { Tooltip, IconButton, Avatar } from '@mui/material';

import { materialUITheme } from '../../utils/materialUITheme';

interface UserAvatarProps {
  handleOpenUserMenu: (event: React.MouseEvent<HTMLElement>) => void
}

const UserAvatar: React.FC<UserAvatarProps> = ({ handleOpenUserMenu }) => {

  return (
    <>
      <Tooltip title='Paramètre utilisateur'>
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar
            style={{
              backgroundColor: `${materialUITheme.palette.secondary.main}`,
              color: `${materialUITheme.palette.primary.main}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            TO
          </Avatar>
        </IconButton>
      </Tooltip>
    </>
  );
};

export { UserAvatar };