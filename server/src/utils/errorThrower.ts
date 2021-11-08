import httpErrorValidator from "../services/schemaValidators/httpErrorValidator";
import isNothing from "./isNothing";
import { IHttpError, Maybe } from "./types";

export default (...m: any) => {
  console.log(m);
  m.forEach((el: any) => { 
    console.log(httpErrorValidator.validate(el));
    if (httpErrorValidator.validate(el)) {
      throw el;
    }
   });
};