export class Post {
  photo: string;
  created_at: Date;
  constructor(
    public id: number,
    public title: string,
    public description: string,
    public id_user: number
  ) {
    this.created_at = new Date();
  }
}
