import jwt, { JwtPayload } from 'jsonwebtoken';
import HttpError from '../utils/httpError';

export default (token: string): string | JwtPayload => {
  let payload: string | JwtPayload;
  try {
    payload = jwt.verify(token, process.env['TOKEN_SECRET'] ?? 'Boots and Cats does not mix.');
  } catch (err: any) {
    throw new HttpError(
      403,
      'Token Invalid',
      'Cookie Auth is invalid.'
    );
  }

  return payload;
}