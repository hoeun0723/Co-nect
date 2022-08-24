import { API } from 'constant/api.constant';
import publicApiInstance from './instance/publicApiInstance';

const authApi = {
  POST_LOGIN(data) {
    return publicApiInstance({
      url: API.AUTH.LOGIN,
      method: 'post',
      data,
    });
  },
  signUp(data) {
    return publicApiInstance({
      url: API.AUTH.SIGNUP,
      method: 'post',
      data,
    });
  },
  DEL_WITHDRAWAL() {
    return publicApiInstance({
      url: API.AUTH.WITHDRAWAL,
      method: 'delete',
    });
  },
  checkDuplicateEmail({ email }) {
    return publicApiInstance({
      url: API.AUTH.CHECK_DUPLICATE_EMAIL,
      method: 'post',
      params: { email },
    });
  },
  checkDuplicateNickName(config) {
    return publicApiInstance({
      url: API.AUTH.CHECK_DUPLICATE_NICKNAME,
      method: 'post',
      ...config,
    });
  },
};

export default authApi;