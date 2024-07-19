import { Outlet, Navigate } from 'react-router-dom';
// import { useUserContext } from "../context/AuthContext";
import React from 'react';

const AuthLayout = () => {
  // const { isAuthenticated } = useUserContext();
  const isAuthenticated= false;
  return (
    <>
      {isAuthenticated ? (
        <Navigate to='/' />
      ): (
        <>
          <section className="flex flex-1 justify-center items-center flex-col py-10">
            <Outlet />
          </section>

          <img 
            src="/assets/images/side-image.png"
            alt="logo" 
            className="hidden xl:block h-screen w-1/2 object-cover bg-no-repeat pointer-events-none"  
          />
        </>
      )}
    </>
  )
}

export default AuthLayout