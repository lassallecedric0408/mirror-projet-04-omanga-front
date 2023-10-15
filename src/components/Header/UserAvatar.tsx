import React, { useEffect, useState } from 'react';
import { Tooltip, IconButton, Avatar } from '@mui/material';

import { materialUITheme } from '../../utils/materialUITheme';
import { useOmangaContex } from '../../context/OmangaContext';

interface UserAvatarProps {
  handleOpenUserMenu: (event: React.MouseEvent<HTMLElement>) => void;
}

const UserAvatar: React.FC<UserAvatarProps> = ({ handleOpenUserMenu }) => {
  const { OmangaState } = useOmangaContex();
  const { user } = OmangaState;

  const [userInitial, setUserInitial] = useState('OM');

  useEffect(() => {
    if (user?.user?.firstname && user?.user?.lastname) {
      const initials =
        user?.user.firstname.charAt(0) + user?.user.lastname.charAt(0);
      setUserInitial(initials);
    }
  }, [user]);

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
            {userInitial}
          </Avatar>
        </IconButton>
      </Tooltip>
    </>
  );
};

export { UserAvatar };
