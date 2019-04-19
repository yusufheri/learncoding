export class User {
  photo: string;
  skills: string;
  created_at: Date;
  constructor(
    public username: string,
    public email: string,
    public password: string
  ) {
    this.created_at = new Date();
  }
}
