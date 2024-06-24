import { defineAuth } from '@aws-amplify/backend'

/**
 * Define and configure your auth resource
 * @see https://docs.amplify.aws/gen2/build-a-backend/auth
 */
export const auth = defineAuth({
  loginWith: {
    email: {
      verificationEmailStyle: 'CODE',
      verificationEmailSubject: 'Hard Program Tracker - Verification Code',
      verificationEmailBody: (createCode) =>
        `Use this code to confirm your account: ${createCode()}`,
    },
  },
  multifactor: {
    mode: 'OPTIONAL',
    totp: true,
  },
  userAttributes: {
    preferredUsername: {
      mutable: true,
      required: true,
    },
  },
})
