import {Component} from '@angular/core';
import {REACTIVE_FORM_DIRECTIVES, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'login',
  templateUrl: 'app/components/Login/login.component.html',
	directives: [REACTIVE_FORM_DIRECTIVES]
})
export class LoginComponent {

  // Public Variables
  loginForm: FormGroup;

  constructor() {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  login() {
    return new Promise((resolve, reject) => {
      let credentials = {
        username: this.loginForm.value.username,
        password: this.loginForm.value.password
      }
      resolve(credentials);
    });
  }

}
