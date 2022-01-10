import * as React from 'react'
import { useAuth0 } from '@auth0/auth0-react'

import './Header.css'
import { Link, useNavigate } from 'react-router-dom'

const Header = () => {
  const { isAuthenticated, loginWithRedirect, logout, isLoading } = useAuth0()
  const navigate = useNavigate()

  const downloadFiles = () => {
    const downloadAnchorNode = document.createElement('a')
    document.body.appendChild(downloadAnchorNode)
    downloadAnchorNode.setAttribute('href', '/files/recipes.json')
    downloadAnchorNode.setAttribute('download', 'recipes.json')
    downloadAnchorNode.click()
    downloadAnchorNode.setAttribute('href', '/files/recipes.csv')
    downloadAnchorNode.setAttribute('download', 'recipes.csv')
    downloadAnchorNode.click()
    downloadAnchorNode.remove()
  }

  if (!isLoading) {
    return (
      <div className="header-container">
        <div className="header-holder">
          {isAuthenticated ? (
            <div className="header-buttons">
              <Link className="profile-button" to="/profile">
                My Profile
              </Link>
              <div className="refresh-button" onClick={downloadFiles}>
                Refresh Data
              </div>
              <div
                className="logout-button"
                onClick={() => {
                  logout({ localOnly: true })
                  navigate('/')
                }}>
                Logout
              </div>
              <div className="logout-4-real-button" onClick={() => logout()}>
                Logout4Real
              </div>
            </div>
          ) : (
            <div className="login-button" onClick={() => loginWithRedirect()}>
              Login
            </div>
          )}
        </div>
      </div>
    )
  } else {
    return <></>
  }
}

export default Header
