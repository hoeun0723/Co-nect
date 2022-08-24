import { emailRegex, passwordRegex } from 'constant/service.constant';

const loginValidate = ({ email, password }) => {
  const validateErrors = {
    email: '',
    password: '',
  };
  if (!email) {
    validateErrors.email = '이메일이 입력되지 않았습니다. ';
  } else if (!email.match(emailRegex)) {
    validateErrors.email = '이메일 형식으로 입력해주세요.';
  }

  if (!password) {
    validateErrors.password = '비빌번호가 입력되지 않았습니다. ';
  } else if (password.length < 8 || password.length > 20) {
    validateErrors.password = '비빌번호는 8자 이상 20자 이하이어야 합니다. ';
  } else if (!password.match(passwordRegex)) {
    validateErrors.password =
      '숫자 한 개 이상, 특수문자 한 개 이상, 영어 한 개 이상, 포함 공백 불가';
  }

  return validateErrors;
};

export default loginValidate;