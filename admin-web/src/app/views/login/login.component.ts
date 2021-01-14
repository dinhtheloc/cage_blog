import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    password: new FormControl('', Validators.required)
  });

  constructor(private http: HttpClient, private router: Router) {
    if (localStorage.getItem('token')) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
  }

  onSubmit() {
    const url = `${environment.urlApi}/auth/login-bo`;
    const body = {
      password: this.loginForm.value.password
    };

    this.http.post(url, body, {})
      .subscribe(
        res => {
          // tslint:disable-next-line:no-string-literal
          localStorage.setItem('token', res['token']);
          this.router.navigate(['/']);
        }
      );
  }
}
