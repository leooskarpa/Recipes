import { useAuth0 } from '@auth0/auth0-react'
import * as React from 'react'
import { Link } from 'react-router-dom'

import './Profile.css'

const Profile = () => {
  const { user, isAuthenticated, isLoading, loginWithRedirect } = useAuth0()

  if (isLoading) {
    return <></>
  } else if (!isAuthenticated) {
    loginWithRedirect({
      redirectUri: 'http://localhost:3001/profile',
    })
  } else {
    return (
      <div className="main-container">
        <Link to="/" className="go-back-link">
          Go Back
        </Link>
        <div className="profile-container">
          <div className="profile-picture-container">
            <img
              className="profile-picture"
              src={user.picture}
              alt="Avatar"></img>
          </div>
          <div className="profile-data-container">
            <div className="profile-data">
              Name: <span>{user.name}</span>
            </div>
            <div className="profile-data">
              Email: <span>{user.email}</span>
            </div>
            <div className="profile-data">
              Nickname: <span>{user.nickname}</span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Profile
