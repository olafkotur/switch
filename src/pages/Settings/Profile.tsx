import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setEmail } from '../../redux/user';
import { UserService } from '../../services/user';
import { RootState } from '../../store';
import './styles.css';

const Profile = (): React.ReactElement => {
  const [loading, setLoading] = React.useState<boolean>(true);

  const dispatch = useDispatch();
  const { email, avatar } = useSelector((state: RootState) => state.user);

  React.useEffect(() => {
    fetchProfileData();
  }, []);

  /**
   * Fetches user profile data.
   */
  const fetchProfileData = async (): Promise<void> => {
    const data = await UserService.fetchProfile();
    if (data) {
      dispatch(setEmail(data.email));
      setLoading(false);
    }
  };

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

  // return loader
  if (loading) {
    return <></>;
  }

  return (
    <div className="setting-group bg-secondary d-flex flex-row align-items-center">
      <img src={avatar} className="setting-profile-avatar" />
      <div className="align-items-center ml-3">
        {email ? (
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
  );
};

export default Profile;
