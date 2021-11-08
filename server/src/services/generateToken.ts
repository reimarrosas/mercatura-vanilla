import jwt from 'jsonwebtoken';
import { IJwtOption, IPayload, Token } from '../utils/types';

export default (tokenType : Token, payload: IPayload, secretKey: string): string => {
  let jwtOption: IJwtOption;

  switch(tokenType) {
    case Token.REFRESH:
      jwtOption = {
        expiresIn: '1y'
      };
      break;
    case Token.ACCESS:
      jwtOption = {
        expiresIn: '15m'
      }
  }
  return jwt.sign(payload, secretKey, jwtOption);
}