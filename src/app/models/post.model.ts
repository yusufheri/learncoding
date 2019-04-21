import { User } from './user.model';
import * as uniqid from 'uuid';
export class Post {
  id: string;
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
    this.likes = 0;
    this.dislikes = 0;
    
  }
}
