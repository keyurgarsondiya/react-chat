const SERVER_BASE_URL = 'http://localhost:5000';

export const api = {
  auth: {
    signUp: `${SERVER_BASE_URL}/api/auth/signup`,
    login: `${SERVER_BASE_URL}/api/auth/login`,
    logout: `${SERVER_BASE_URL}/api/auth/logout`,
    check: `${SERVER_BASE_URL}/api/auth/check`,
    updateProfile: `${SERVER_BASE_URL}/api/auth/update-profile`,
  },
};
