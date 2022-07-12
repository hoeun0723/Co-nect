import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import MarkdownEditor from 'components/MdEditor';
import useInput from 'hooks/useInput';
import { hopeSessionOption, skillOptions } from 'constant';
import { handleFetcher } from 'utils';
import authApi from 'api/auth';

SignUp.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  close: PropTypes.bool.isRequired,
};

export default function SignUp({ isOpen, close }) {
  const navigate = useNavigate();
  const [userImg, onImgChange] = useInput('');
  const [userJob, onJobChange] = useInput('');
  const [userPortfolio, onPortfolioChange] = useInput('');
  const [hopeSession, onHopeSessionChange] = useInput('무관');
  const [userSlogan, onSloganChange] = useInput('');
  const [mdcontent, setMdContent] = useState('');
  const [userSkill, setUserSkill] = useState('');
  const [selectedSkills, setSelectedSkills] = useState([]);

  const onSkillChange = useCallback((e) => {
    setUserSkill(e.target.value);
    setSelectedSkills((prev) => [...prev, e.target.value]);
  }, []);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {},
  });
  const onValid = async (submitData) => {
    const { email, nickname, password, verifiedPassword } = submitData;
    if (password !== verifiedPassword) {
      setError('verifiedPassword', { message: 'Password is not same' }, { shouldFocus: true });
    }
    const signUpInfo = {
      email,
      name: nickname,
      pwd: password,
      content: mdcontent,
      hope_session: hopeSession,
      img: userImg,
      job: userJob,
      portfolio: userPortfolio,
      skills: selectedSkills,
      slogan: userSlogan,
    };
    // TODO: input validation 추가해야함.
    const { value, error, isError } = await handleFetcher(authApi.POST_SIGN_UP, signUpInfo);
    if (isError) {
      console.log(error);
      return;
    }
    navigate('/login');
  };
  return (
    <div>
      {isOpen ? (
        <div>
          <form
            style={{ display: 'flex', flexDirection: 'column' }}
            onSubmit={handleSubmit(onValid)}
          >
            <div onClick={() => close} role="button" tabIndex="-1">
              <div className="loginModal">
                <span className="close" onClick={() => close} role="button" tabIndex="-1">
                  &times;
                </span>
                <div className="modalContents" onClick={() => isOpen} role="button" tabIndex="-1">
                  <input
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[_a-z0-9-]+(.[_a-z0-9-]+)*@(?:\w+\.)+\w+$/i,
                        message: '이메일 형식으로 입력해주세요.',
                      },
                    })}
                    placeholder="email"
                  />
                  <span>{errors?.email?.message}</span>
                  <input
                    {...register('nickname', {
                      required: '2자리 이상 닉네임을 입력해주세요.',
                      minLength: 2,
                    })}
                    placeholder="nickname"
                  />
                  <span>{errors?.nickname?.message}</span>
                  <input
                    {...register('password', {
                      required: '4자리 이상 비밀번호를 입력해주세요.',
                      minLength: 4,
                      pattern: {
                        value: /(?=.*[0-9])(?=.*[a-z])(?=.*[!@#$%^&+=])(?=\S+$).{8,20}/,
                        message:
                          '8자 이상 20자 이하, 숫자 한개이상 특수문자 한개이상 영어 한개이상 포함 공백 불가',
                      },
                    })}
                    placeholder="password"
                  />
                  <span>{errors?.password?.message}</span>
                  <input
                    {...register('verifiedPassword', {
                      required: '비밀번호가 일치하지 않습니다.',
                    })}
                    placeholder="verifiedPassword"
                  />
                  <span>{errors?.verifiedPassword?.message}</span>
                  <span>선택한 기술 스킬: {selectedSkills.join(', ')}</span>
                  <select value={userSkill} onChange={onSkillChange}>
                    {skillOptions.map(({ id, value, label }) => (
                      <option key={id} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                  <span>희망 작업 기간</span>
                  <select value={hopeSession} onChange={onHopeSessionChange}>
                    {hopeSessionOption.map(({ id, value }) => (
                      <option key={id} value={value}>
                        {value}
                      </option>
                    ))}
                  </select>
                  <input
                    name="profile-image"
                    onChange={onImgChange}
                    value={userImg}
                    placeholder="임시 프로필 이미지 문자열로 입력"
                  />
                  <input
                    name="slogan"
                    onChange={onSloganChange}
                    value={userSlogan}
                    placeholder="slogan"
                  />
                  <input name="job" onChange={onJobChange} value={userJob} placeholder="직업" />
                  <input
                    name="portfolio"
                    onChange={onPortfolioChange}
                    value={userPortfolio}
                    placeholder="포트폴리오"
                  />
                  <button>가입</button>
                  <div>
                    <MarkdownEditor mdValue={mdcontent} setContent={setMdContent} />
                  </div>
                  <span>{errors?.extraError?.message}</span>
                </div>
              </div>
            </div>
          </form>
        </div>
      ) : null}
    </div>
  );
}

// const ModalWrapper = styled.div`
//   box-sizing: border-box;
//   display: ${(props) => (props.visible ? 'block' : 'none')};
//   position: fixed;
//   top: 0;
//   right: 0;
//   bottom: 0;
//   left: 0;
//   z-index: 1000;
//   overflow: auto;
//   outline: 0;
// `;

// const ModalOverlay = styled.div`
//   box-sizing: border-box;
//   display: ${(props) => (props.visible ? 'block' : 'none')};
//   position: fixed;
//   top: 0;
//   left: 0;
//   bottom: 0;
//   right: 0;
//   background-color: rgba(0, 0, 0, 0.6);
//   z-index: 999;
// `;

// const ModalInner = styled.div`
//   box-sizing: border-box;
//   position: relative;
//   box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.5);
//   background-color: #fff;
//   border-radius: 10px;
//   width: 360px;
//   max-width: 480px;
//   top: 50%;
//   transform: translateY(-50%);
//   margin: 0 auto;
//   padding: 40px 20px;
// `;
