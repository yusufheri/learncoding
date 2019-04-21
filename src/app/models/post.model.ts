import { User } from './user.model';
import * as uniqid from 'uuid';
export class Post {
  id: string;
  idUser: string;
  photo: string;
  createdAt: Date = new Date();
  likes: number;
  dislikes: number;
  constructor(
    public title: string,
    public description: string,
    public category,
    public user: User
  ) 
  {  
        
    this.id = uniqid.v4();
    this.idUser = user.id; 
    this.likes = 0;
    this.dislikes = 0;
    
  }
}
