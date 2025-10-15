export type SignupRequest = {
  name: string;
  nickName: string;
  password: string;
  phoneNumber: string;
  gender: string;
  role: string;
};

export type SignupResponse = {
  name: string;
};

export type LoginRequest = {
  username: string;
  password: string;
};

export type LoginResponse = {
  name: string;
  user_id: string;
};
