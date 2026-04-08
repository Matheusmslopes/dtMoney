import { IUser } from "../userInterface";

export interface IAuthenticateResponse {
  user: IUser;
  token: string;
}
