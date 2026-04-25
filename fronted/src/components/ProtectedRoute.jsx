import React from 'react';
import SignupForm from './SignupForm';
import { Navigate } from 'react-router-dom';


import { useSelector } from 'react-redux';
function ProtectedRoute({children}) {
     const check=useSelector((state)=>state.auth.checkingauth);
     const token=useSelector((state)=>state.auth.accessToken);
     console.log(`befor protecr check:${check}`)
     if(check) {return <h1>Loadin...</h1>}
     console.log("protect after startup");
     if(!token) {return <Navigate to="/loginForm"/>}
     return children;
}
    

export default ProtectedRoute;