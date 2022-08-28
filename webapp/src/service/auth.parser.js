import { skillStackParserToIds } from './skillStack.parser';

export const signUpParser = (sigupRawData) => {
  const { email, password } = sigupRawData;
  return { email, pwd: password };
};

export const loginParser = (loginRawData) => {
  const { email, password } = loginRawData;
  return { email, pwd: password };
};

export const userInfoParser = (userInfoRaw) => {
  const { id, image, name } = userInfoRaw;
  return { id, nickname: name, profileImg: image };
};

export const essentialInfoParser = (essentialInfoRawData) => {
  const {
    introduction,
    hopeSession,
    profileImage,
    job,
    nickname,
    portfolio,
    slogan,
    techSkills,
    belongTeam,
  } = essentialInfoRawData;
  const paresedTechSkills = skillStackParserToIds(techSkills);
  return {
    content: introduction,
    hope_session: hopeSession,
    image: profileImage,
    job,
    name: nickname,
    portfolio,
    slogan,
    skills: paresedTechSkills,
  };
};