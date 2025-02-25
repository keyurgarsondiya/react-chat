export interface PayloadTypes {
  loginRequest: {
    username: string;
    password: string;
  };
  loginRequestSuccess: {
    token: string;
  };
  logout: {
    cookieName: string;
  };
}
