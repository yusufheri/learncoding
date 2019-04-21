import * as uniqid from "uuid";

export class User {
  id:string;
  photo: string;
  skills: string;
  created_at: Date;
  constructor(
    public username: string,
    public email: string,
    public password: string
  ) {
    this.id = uniqid.v4();
    this.created_at = new Date();
  }
}
