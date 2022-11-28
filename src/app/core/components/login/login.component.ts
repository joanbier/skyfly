import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  credentials = {
    email: '',
    password: '',
  }

  constructor(
    private router: Router,
    private toast: MatSnackBar,
    private authService: AuthService
  ) {
  }

  login() {
    this.authService.login(this.credentials)
      .then(user => this.router.navigate(['/dashboard']))
      .catch(err => this.toast.open(err, '', {panelClass: 'toast-error'}))
  }

  register() {
    this.authService.register(this.credentials)
      .then(user => this.toast.open(`Account created! Please log in.`, '', {panelClass: 'toast-success'}))
      .catch(err => this.toast.open(err, '', {panelClass: 'toast-error'}))
  }
}
