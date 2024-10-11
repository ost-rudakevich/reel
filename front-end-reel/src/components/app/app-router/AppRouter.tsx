import { FC } from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from 'components/layout/Layout'
import Auth from 'components/app/auth/Auth'
import Error from 'ui/error/Error'
import AdminLayout from 'components/layout/admin-layout/AdminLayout'
import RequireAuth from 'hoc/require-auth/RequireAuth'
import RequireAdmin from 'hoc/require-admin/RequireAdmin'
import { ADMIN_ROUTES, USER_ROUTES } from 'data/app-router-data/app-router-data'

const AppRouter: FC = () => {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          {USER_ROUTES.map(userRoute => {
            return (
              <Route
                key={userRoute.path}
                path={userRoute.path}
                element={
                  userRoute.requireAuth ? (
                    <RequireAuth>
                      <userRoute.element />
                    </RequireAuth>
                  ) : (
                    <userRoute.element />
                  )
                }
              />
            )
          })}
          <Route path='*' element={<Error error='clientError' />} />
        </Route>
        <Route element={<AdminLayout />}>
          {ADMIN_ROUTES.map(adminRoute => {
            return (
              <Route
                key={adminRoute.path}
                path={adminRoute.path}
                element={
                  <RequireAdmin>
                    <adminRoute.element />
                  </RequireAdmin>
                }
              />
            )
          })}
          <Route path='*' element={<Error error='clientError' />} />
        </Route>
        <Route path='login' element={<Auth />} />
        <Route path='register' element={<Auth />} />
      </Routes>
    </>
  )
}

export default AppRouter
