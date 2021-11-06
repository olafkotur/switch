import React from 'react';
import { UserService } from '../../services/user';
import { ISettingConfig } from '../../typings/d';
import { IProfileData } from '../../typings/data';
import './profile.css';

const defaultAvatar = require('../../../assets/default-avatar.png');

const Profile = (): React.ReactElement => {
  const [loading, setLoading] = React.useState<boolean>(true);
  const [profileData, setProfileData] = React.useState<IProfileData | null>(
    null,
  );

  React.useEffect(() => {
    fetchProfileData();
  }, []);

  /**
   * Fetches user profile data.
   */
  const fetchProfileData = async (): Promise<void> => {
    const data = await UserService.fetchProfile();
    if (data) {
      setProfileData(data);
    }
    setLoading(false);
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
    <div className="profile-container bg-secondary d-flex flex-row align-items-center">
      <img src={defaultAvatar} className="profile-avatar" />
      <div className="align-items-center ml-3">
        {profileData ? (
          <>
            {renderRow('Email', profileData.email)}
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
