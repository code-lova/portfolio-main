import React from 'react'
import { Navigate } from 'react-router-dom';

const TOKEN_EXPIRATION_TIME = 60 * 60 * 1000; // 1 hour in milliseconds

const PublicRoutes = ({component: Component, ...rest}) => {
  
    //Check if the use is authenticated 
    const token = localStorage.getItem('auth_token');
    const tokenCreationTime = localStorage.getItem('token_creation_time');
    const isAuthenticated = token && tokenCreationTime && (new Date().getTime() - tokenCreationTime < TOKEN_EXPIRATION_TIME);

    // Render the component if user is not authenticated, otherwise redirect to home
    return isAuthenticated ? <Navigate to="/" replace /> : <Component {...rest} />


  
}

export default PublicRoutes