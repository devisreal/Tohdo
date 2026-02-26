export type JwtPayload = {
  sub: string;
  email: string;
  iss: string;
  aud: string;
  iat?: number;
  exp?: number;
};

export type LoginPayload = {
  email: string;
  password: string;
};
