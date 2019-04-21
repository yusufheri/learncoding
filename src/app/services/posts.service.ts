import { Injectable } from '@angular/core';
import { Post } from './../models/post.model';
import { Subject } from 'rxjs';
import * as firebase from 'firebase';
import { User } from "../models/user.model";
import 'firebase/database';
import 'firebase/storage';
import DataSnapshot = firebase.database.DataSnapshot;

@Injectable({
  providedIn: 'root'
})
export class PostsService {
posts: Post[]  = [];
postsSubject = new Subject<Post[]>();

emitPosts() {
  this.postsSubject.next(this.posts);
}
  constructor() {this.getPosts(''); }

  likedPost(post: Post){
    this.posts.filter(elt => elt==post)[0].likes++;
    this.saveUsers();
    this.emitPosts();
  }

  disLikedPost(post: Post){
    this.posts.filter(elt => elt==post)[0].dislikes++;
    this.saveUsers();
    this.emitPosts();
  }
  
  saveUsers() {
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
    this.saveUsers();
    this.emitPosts();
  }

}
