import React, { useEffect } from 'react'
import { BrowserRouter, Navigate, Outlet, Route, Routes} from 'react-router-dom'
import {Toaster} from 'react-hot-toast'
import useAppContext from './hooks/useAppContext'
import { Suspense } from 'react'
import Loader from './components/Loader'

const Home = React.lazy(()=>import('./pages/Home'))
const Login = React.lazy(()=>import('./pages/Login'))
const SelectRole = React.lazy(()=>import('./pages/SelectRole'))

const PublicRoute = () => {
  const { isAuth } = useAppContext();
  return isAuth ? <Navigate to="/" replace /> : <Outlet />;
};

// ✅ PrivateRoute — handles role redirect
const PrivateRoute = () => {
  const { isAuth, Loading, user } = useAppContext();
  if (Loading) return <Loader />;
  if (!isAuth) return <Navigate to="/auth" replace />;

  // logged in but no role → force to /role
  if (!user?.role && location.pathname !== '/role') {
    return <Navigate to="/role" replace />;
  }

  return <Outlet />;
};

const App = () => {
  const { setLoading } = useAppContext();

  return (
    <>
    <BrowserRouter>
      <Suspense fallback={<Loader/>}>
          <Routes>

              <Route path='/' element={<PrivateRoute />}>
                  <Route path='/' element={<Home/>}/>
                  <Route path='/role' element={<SelectRole/>}/>
              </Route>

              <Route path='/auth' element={<PublicRoute />}>
                <Route index element={<Login/>}/>
              </Route>

          </Routes>
            <Toaster   position="top-center" reverseOrder={false}   toastOptions={{duration: 3500,removeDelay: 1000}}/>
      </Suspense>
    </BrowserRouter>
    </>
  )
}

export default App