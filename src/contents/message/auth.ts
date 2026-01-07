const AUTH_MESSAGES = {
  nickname: {
    invalid: '열 자 이하로 작성해주세요.',
  },
  email: {
    invalid: '이메일 형식으로 작성해 주세요.',
    duplicated: '이미 사용 중인 이메일입니다.',
  },
  password: {
    invalid: '8자 이상 입력해주세요.',
    wrong: '비밀번호가 일치하지 않습니다.',
  },
  passwordConfirmation: {
    invalid: '8자 이상 입력해주세요.',
    notMatch: '비밀번호가 일치하지 않습니다.',
  },
  login: {
    userNotFound: '존재하지 않는 유저입니다.',
  },
  signup: {
    success: '가입이 완료되었습니다.',
    failure: '가입이 실패했습니다.',
  },
};

export default AUTH_MESSAGES;
