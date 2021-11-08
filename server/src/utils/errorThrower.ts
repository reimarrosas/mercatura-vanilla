import httpErrorValidator from "../services/schemaValidators/httpErrorValidator";
import isNothing from "./isNothing";
import { IHttpError, Maybe } from "./types";

export default (...m: any) => {
  m.forEach((el: any) => { 
    if (httpErrorValidator.validate(el)) {
      throw el;
    }
   });
};