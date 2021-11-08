import { Maybe } from "./types"

export default <T>(value: Maybe<T>) => {
  return value === undefined || value === null;
}