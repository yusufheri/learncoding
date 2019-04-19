import { Injectable } from "@angular/core";
import * as firebase from "firebase";
import { User } from "../models/user.model";
import { Subject } from "rxjs";
import "firebase/database";
import "firebase/storage";
import DataSnapshot = firebase.database.DataSnapshot;

@Injectable({
  providedIn: "root"
})
export class AuthService {
  users: User[] = [];
  userSubject = new Subject<User[]>();
  constructor() {}

  emitUsers() {
    this.userSubject.next(this.users);
  }

  saveUsers() {
    firebase
      .database()
      .ref("/users")
      .set(this.users);
  }

  getUsers(){
    console.log("Début opération")
    firebase
      .database()
      .ref("/users")
      .on("value", (data: DataSnapshot) => {
        this.users = data.val() ? data.val() : [];
        this.emitUsers();
      });
       console.log("Fin opération")
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
            resolve();
            this.users.push(user);
            this.saveUsers();
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
