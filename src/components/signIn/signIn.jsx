// AWS Authentication
import { Authenticator } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css'
// React Router
import { Outlet } from 'react-router-dom'

const SignIn = () => {
  return <Authenticator>{(auth) => <Outlet context={auth} />}</Authenticator>
}

export { SignIn }
