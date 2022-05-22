export const HOME = '/';
export const PROFILE = '/profile';
export const LOGIN = '/login';
export const SIGN_UP = '/signup';
export const USER_BOARD = '/user-board';
export const TEAM_BOARD = '/team-board';
export const MY_USER_LIST = '/users-list';
export const NEW_POST = '/new-post';
export const MY_POST = '/my-post';
export const OAUTH_URL = {
  GITHUB: `${process.env.REACT_APP_SERVER_API}oauth2/authorization/github`,
  GOOGLE: `${process.env.REACT_APP_SERVER_API}oauth2/authorization/google`,
};

export const ROOT_URL = process.env.REACT_APP_SERVER_API;
<<<<<<< HEAD

export const MOCK_SERVER_URL = process.env.REACT_APP_MOCK_SERVER_API;
=======
console.log(ROOT_URL);
>>>>>>> fa6a12ae010484d2036323ee77f4e12f45836740
