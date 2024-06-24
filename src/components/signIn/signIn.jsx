// AWS Authentication
import { Authenticator } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css'
// React Router
import { Outlet } from 'react-router-dom'

const SignIn = () => {
  return (
    <Authenticator>
      {({ signOut }) => <Outlet context={signOut} />}
    </Authenticator>
  )
}

export { SignIn }
