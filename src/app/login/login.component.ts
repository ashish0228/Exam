import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submit = false;
  constructor(private fb: FormBuilder,
    private router: Router) { 
    this.loginForm = this.fb.group({
      email: [null, Validators.compose([Validators.required, Validators.email])],
      password: [null, Validators.compose([Validators.required])],
    });
  }

  ngOnInit(): void {
  }
  saveLoginValue() {
    this.submit = true;
    if (this.loginForm.invalid) {
      return
    }
    console.log(this.loginForm.value);
    if (this.loginForm.value.email == 'admin@gmail.com' && this.loginForm.value.password == '123456') {
      localStorage.setItem('loginDetail', 'true');
      this.router.navigateByUrl('dashboard');

    } else {
      alert('Please Enter Valid Credential')
    }
  }

  resetForm() {
    this.loginForm.reset();
  }
}
