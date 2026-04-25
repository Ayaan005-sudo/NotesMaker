import React from 'react';
import SignupForm from './SignupForm';
import { useEffect,useState } from 'react';
import { useDispatch } from 'react-redux';
import ProtectedRoute from './ProtectedRoute';
import { Route,Routes,Navigate } from 'react-router-dom';
import Dashboard from './Dashboard'; 
import { login,logout } from '../ReduxStore/AuthSlice';
import { setCheckingAuth } from '../ReduxStore/AuthSlice';
import LoginForm from './LoginForm';
import API_URL from '../../utils/api';
function Home() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

    useEffect(() => {
    const checkUser = async () => {
      console.log("startup is runnung"); 
      try {
        const res = await fetch(`${API_URL}/refreshToken`, {
          credentials: "include"
        });

        const data = await res.json();
console.log(data);
        if (res.ok) {
          dispatch(login({
              userData:data.resUser,
              accessToken:data.accessToken,
          }));
        } else {
        dispatch(logout());
      }
      } catch (err) {}finally {
     
      dispatch(setCheckingAuth(false));
      setLoading(false);
    }
    };

    checkUser();
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;

    return ( 
        
 <Routes>



      <Route path="/" 
      element={
      <ProtectedRoute>
      <Dashboard />
      </ProtectedRoute>
      } />
<Route path="/loginForm"  element={<LoginForm/>}/>
      <Route path="/signupForm" element={<SignupForm />} />
      
    </Routes>


     
     );
}

export default Home;