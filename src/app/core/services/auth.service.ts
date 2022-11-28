import {Injectable} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {UserInfo} from "@firebase/auth";
import {Credentials} from "../../model/credentials.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  readonly authState$ = this.fireAuth.authState;
  private userData!: UserInfo | null;

  constructor(private fireAuth: AngularFireAuth) {
  }

  login(credentials: Credentials) {
    return this.fireAuth.signInWithEmailAndPassword(credentials.email, credentials.password)
      .then(userCredential => this.userData = userCredential.user)
  }

  register(credentials: Credentials) {
    return this.fireAuth.createUserWithEmailAndPassword(credentials.email, credentials.password);
  }

  logout() {
    return this.fireAuth.signOut();
  }

  isLoggedIn() {
    return !!this.userData;
  }

  get user() {
    return this.userData;
  }
}
