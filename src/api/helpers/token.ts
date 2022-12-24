import jwt from "jsonwebtoken";

export interface TokenPayload {
  id: number;
  email: string;
}
const privateKey = process.env?.PRIVATE_KEY as string;
export const generateToken = (
  payload: TokenPayload,
  ttl: string | number | undefined
) => {
  try {
    const token = jwt.sign(payload, privateKey, {
      expiresIn: ttl,
    });
    return token;
  } catch (err) {
    throw err;
  }
};

export const verifyToken = (token: string): TokenPayload | undefined => {
  try {
    const payload = jwt.verify(token, privateKey);
    if (typeof payload !== "string") {
      return {
        id: payload.id as number,
        email: payload.email as string,
      };
    }
  } catch (err) {
    return undefined;
  }
};
