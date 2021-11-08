import jwt from 'jsonwebtoken';
import { IJwtOption, IPayload, Token } from '../utils/types';

export default (tokenType : Token, payload: IPayload, secretKey: string): string => {
  let jwtOption: IJwtOption;

  switch(tokenType) {
    case TokenType.REFRESH:
      jwtOption = {
        expiresIn: '1y'
      };
      break;
    case TokenType.ACCESS:
      jwtOption = {
        expiresIn: '15m'
      }
  }
  return jwt.sign(payload, secretKey, jwtOption);
}