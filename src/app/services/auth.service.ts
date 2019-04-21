import { Injectable, ɵConsole } from '@angular/core';
import * as firebase from 'firebase';
import { User } from "../models/user.model";
import { Subject } from "rxjs";
import 'firebase/database';
import 'firebase/storage';
import DataSnapshot = firebase.database.DataSnapshot;
import { isNullOrUndefined } from "util";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  current_user: User;
  users: User[] = [];
  userSubject = new Subject<User[]>(); 

  constructor() { 
     this.getUsers('');
  }

  emitUsers() {
    this.userSubject.next(this.users);
  }

  setUser(user: User): void {
    if (user != undefined) {
      let user_string = JSON.stringify(user);
      localStorage.setItem("currentUser", user_string);
    }    
  }

  getCurrentUser(): User {
    let user_string = localStorage.getItem("currentUser");
    if (!isNullOrUndefined(user_string)) {
      let user: User = JSON.parse(user_string);
      return user;
    } else {
      return null;
    }
  }

  saveUsers() {
    firebase
      .database()
      .ref("/users")
      .set(this.users);
  }

  getUsers(email){
    firebase
      .database()
      .ref("/users")
      .on("value", (data: DataSnapshot) => {
        this.users = data.val() ? data.val() : [];
        const tab = this.users.filter(elt => elt.email == email);
        if (tab.length == 1) {
          this.setUser(tab[0]);
         } else {
           this.setUser(null);
         }
        this.emitUsers();
      });
  }

  getUser(id: number) {
    return new Promise((resolve, reject) => {
      firebase
        .database()
        .ref("/users/" + id)
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

  createNewUser(user: User) {
    return new Promise((resolve, reject) => {
      firebase
        .auth()
        .createUserWithEmailAndPassword(user.email, user.password)
        .then(
          () => {           
            this.users.push(user);
            this.saveUsers();
            const tab = this.users.filter(elt => elt.email == user.email);
            if (tab.length == 1) {
              this.setUser(tab[0]);
            } else {
              this.setUser(null);
            }
             resolve();
          },
          error => {
            reject(error);
          }
        );
    });
  }

  signInUser(email: string, password: string) {
    return new Promise((resolve, reject) => {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(
          () => {
            resolve();  
            this.getUsers(email);
          },
          error => {
            reject(error);
          }
        );
    });
  }

  lostPassword(email: string) {
    return new Promise((resolve, reject) => {
      firebase
        .auth()
        .sendPasswordResetEmail(email)
        .then(
          () => {
            resolve();
          },
          error => {
            reject(error);
          }
        );
    });
  }

  signOutUser() {
    localStorage.removeItem("user");
    firebase.auth().signOut();   
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
}
