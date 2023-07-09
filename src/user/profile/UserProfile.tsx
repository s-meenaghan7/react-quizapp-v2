import React, { useEffect } from 'react';
import { getCurrentUser } from '../../services/AuthService';
import { useNavigate } from 'react-router-dom';

const UserProfile: React.FC = () => {
  const navigate = useNavigate();
  const currentUser = getCurrentUser();

  useEffect(() => {
    if (!currentUser) {
      navigate('/');
    }
  }, []);

  return (
    <div>
      <h2>
        If you are seeing this component, then you are successfully logged in, as user: <strong>{currentUser ? currentUser.email : 'null'}</strong>
      </h2>
    </div>
  );
}

export default UserProfile;
