export class Comment {
  created_at: Date;
  constructor(
    public id: number,
    public id_user: number,
    public id_post: number,
    public comment: string
  ) {
    this.created_at = new Date();
  }
}
