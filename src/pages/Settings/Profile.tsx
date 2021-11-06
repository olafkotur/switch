import { Button, IconButton, Menu, MenuItem } from '@material-ui/core';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setEmail } from '../../redux/user';
import { UserService } from '../../services/user';
import { RootState } from '../../store';
import { MoreVert } from '@material-ui/icons';
import './styles.css';

const Profile = (): React.ReactElement => {
  const [anchorEl, setAnchorEl] = React.useState<Element | null>(null);
  const { auth, email, avatar } = useSelector((state: RootState) => state.user);

  /**
   * Render profile row.
   * @param label - row label
   * @param value - row value
   */
  const renderRow = (label: string, value: string): React.ReactElement => {
    return (
      <div className="d-flex flex-row justify-content-between align-items-center mb-2">
        <div>
          <span className="primary align-self-center">{label}</span>
          <br />
          <span className="text-muted">{value}</span>
        </div>
        <div className="d-flex flex-row justify-content-center align-items-center"></div>
      </div>
    );
  };

  return (
    <div className="setting-group bg-secondary">
      <div className="d-flex justify-content-end">
        <IconButton
          className="p-1 m-0"
          aria-controls="basic-menu"
          aria-haspopup="true"
          aria-expanded={!!anchorEl ? 'true' : undefined}
          onClick={(e) => setAnchorEl(e.currentTarget)}
        >
          <MoreVert className="primary" />
        </IconButton>
        <Menu
          anchorEl={anchorEl as Element}
          open={!!anchorEl}
          onClose={() => setAnchorEl(null)}
          className="p-0"
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
        >
          {!auth && (
            <MenuItem onClick={() => console.log('do something')}>
              Login
            </MenuItem>
          )}
          {!auth && (
            <MenuItem onClick={() => console.log('do something')}>
              Register
            </MenuItem>
          )}
          {auth && (
            <MenuItem onClick={() => console.log('do something')}>
              <span className="text-danger">Logout</span>
            </MenuItem>
          )}
        </Menu>
      </div>

      <div className="d-flex flex-row align-items-center setting-profile-face-lift">
        <img src={avatar} className="setting-profile-avatar" />
        <div className="align-items-center ml-3">
          {auth ? (
            <>
              {renderRow('Email', email)}
              {renderRow('Password', '**************')}
            </>
          ) : (
            <>
              {renderRow(
                'Not logged in',
                'create an account or login to unlock more features',
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
