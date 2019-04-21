import { Injectable } from '@angular/core';
import { Post } from './../models/post.model';
import { Subject } from 'rxjs';
import * as firebase from 'firebase';
import { User } from "../models/user.model";
import 'firebase/database';
import 'firebase/storage';
import DataSnapshot = firebase.database.DataSnapshot;
import { AuthService } from 'src/app/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
posts: Post[]  = [];
postsSubject = new Subject<Post[]>();
count_postSubject = new Subject<any>();
count_post_user : number;


  constructor(private auth : AuthService) {this.getPosts(''); }

  emitPosts() {
  this.postsSubject.next(this.posts);  
  }

  emitCountPostUser() {
    this.count_postSubject.next(this.count_post_user);
  }
  
  likedPost(post: Post){
    this.posts.filter(elt => elt==post)[0].likes++;
    this.savePosts();
    this.emitPosts();
  }

  disLikedPost(post: Post){
    this.posts.filter(elt => elt==post)[0].dislikes++;
    this.savePosts();
    this.emitPosts();
  }
  
  savePosts() {
    firebase
      .database()
      .ref("/posts")
      .set(this.posts);
  }

  getPosts(id_user){
    firebase
      .database()
      .ref("/posts")
      .on("value", (data: DataSnapshot) => {
        this.posts = data.val() ? data.val() : [];
        const user_current = this.auth.getCurrentUser();
        this.count_post_user = this.posts.filter(elt => elt.idUser == user_current.id).length; 
        this.emitCountPostUser();       
        this.emitPosts();
        
      });
  }

  getSinglePost(id: number) {
    return new Promise((resolve, reject) => {
      firebase
        .database()
        .ref("/posts/" + id)
        .once("value")
        .then(
          (data: DataSnapshot) => {
            resolve(data.val());
          },
          error => {
            reject(error);
          }
        );
    });
  }

  uploadFile(file: File) {
    return new Promise((resolve, reject) => {
      const almostUniqueFileName = Date.now().toString();
      const upload = firebase
        .storage()
        .ref()
        .child("images/" + almostUniqueFileName + file.name)
        .put(file);
      upload.on(
        firebase.storage.TaskEvent.STATE_CHANGED,
        () => {
          console.log("Loading …");
        },
        error => {
          console.log("Erreur de chargement ! : " + error);
          reject();
        },
        () => {
          // resolve(upload.snapshot.ref.getDownloadURL());
          upload.snapshot.ref.getDownloadURL().then(downloadUrl => {
            console.log("Upload successful ! (" + downloadUrl + ")");
            resolve(downloadUrl);
          });
        }
      );
    });
  }

  createNewPost(post: Post) {
   
    this.posts.push(post);
    this.savePosts();
    this.emitPosts();
    this.emitCountPostUser();
  }

  removePost(post: Post) {

    if(post.photo) {
      const storageRef = firebase.storage().refFromURL(post.photo);
      storageRef.delete().then(
        () => {
          console.log("File removed !!");
        }, error => {
          console.error('Could not to remove file: ' + error);
        }
      );
    }

    const postIndexRemove = this.posts.findIndex(postItem => {
      if (postItem === post) {
        return true;
      }
    });

    this.posts.splice(postIndexRemove, 1);
    this.savePosts();
    this.emitPosts();
    this.emitCountPostUser();
  }

}
