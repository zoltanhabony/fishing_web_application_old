import jwt, { JwtPayload } from "jsonwebtoken";

interface SignOptions {
  expiresIn: string | number;
}

const DEFAULT_SIGN_OPTION: SignOptions = {
  expiresIn: 10,
};

export function getJWTAccessToken(
  payload: JwtPayload,
  options: SignOptions = DEFAULT_SIGN_OPTION
) {
  const secretKey = process.env.JWT_SECRET;
  const token = jwt.sign(payload, secretKey!, options);
  return token;
}

export function verifyJWT(token: string) {
  try {
    const secretKey = process.env.JWT_SECRET;
    const decodedToken = jwt.verify(token, secretKey!)
    return decodedToken as JwtPayload
  } catch (error) {
    console.log(error)
    return null
  }
}
