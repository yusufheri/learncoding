import { User } from './user.model';
import * as uniqid from 'uuid';
export class Post {
  id: string;
  photo: string;
  idUser: string;
  createdAt: Date = new Date();
  likes: number;
  dislikes: number;
  source: string;

  constructor(
    public title: string,
    public description: string,
    public category,
    public user: User
  ) 
  {  
        
    this.id = uniqid.v4();
    this.likes = 0;
    this.dislikes = 0;
    this.idUser = user.id
    
  }
}
