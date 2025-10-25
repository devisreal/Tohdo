export type JwtPayload = {
  sub: string;
  email: string;
  iss: string;
  aud: string;
  iat?: number;
  exp?: number;
};
