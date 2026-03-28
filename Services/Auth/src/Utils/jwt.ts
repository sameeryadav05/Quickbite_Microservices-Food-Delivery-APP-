import jwt, { JwtPayload } from "jsonwebtoken";

export interface TokenPayload {
  userId: string;
}

export const generateToken = (
  payload: TokenPayload,
  secret: string
): string => {
  return jwt.sign(payload, secret, {
    expiresIn: "10d",
  });
};

export const verifyToken = (
  token: string,
  secret: string
): TokenPayload | JwtPayload => {
  return jwt.verify(token, secret) as TokenPayload;
};