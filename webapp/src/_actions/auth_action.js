import { AUTH, LOGIN_USER, SIGNUP_USER } from '_types/authType';

export function actionLogin(responseData) {
  const { data } = responseData;
  const { data: userInfo } = data;
<<<<<<< HEAD
<<<<<<< HEAD
  setCookie(USER_INFO, userInfo, { maxAge: 60 * 60, path: '/' });
=======

>>>>>>> 24a587b (Feat : UserInfo 쿠키 정보 생성 기능 구현)
=======
>>>>>>> fetch_head
  return {
    type: LOGIN_USER,
    payload: responseData,
  };
}

export function actionSignUp(responseData) {
  return {
    type: SIGNUP_USER,
    payload: responseData,
  };
}

export function checkUserInfo(userInfo) {
  return {
    type: AUTH,
    payload: userInfo,
  };
}
