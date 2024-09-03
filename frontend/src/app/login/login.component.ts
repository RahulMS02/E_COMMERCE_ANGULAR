import { Component,OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  signupUsers: any[] = [];
  signupObj: any = {
    username: '',
    email: '',
    password: ''
  };
  loginObj: any = {
    username: '',
    email: '',
    password: ''
  }

  constructor(private router: Router) {}

  ngOnInit(): void {
    const localData = localStorage.getItem('signupUsers');
    if (localData != null) {
      this.signupUsers = JSON.parse(localData);
    }
  }

  onSignUp() {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailPattern.test(this.signupObj.email)) {
      alert('Please enter a valid email address !');
      return;
    }
    if(this.signupObj.password.length<6)
    {
      alert('Password length should be greater than 5 !');
      return;
    }
    this.signupUsers.push(this.signupObj);
    localStorage.setItem('signupUsers', JSON.stringify(this.signupUsers));
    this.signupObj = {
      username: '',
      email: '',
      password: ''
    }
    if (!this.signupObj.username || !this.signupObj.email || !this.signupObj.password) {
      alert('Please fill in all the input fields !');
      return;
    }
    alert('Sign Up Successful.Kindly Log in');
  }

  onLogin() {
    const isUserExist = this.signupUsers.find(m => m.username === this.loginObj.username && m.password === this.loginObj.password);
    if(!this.loginObj.username ||!this.loginObj.password){
      alert('Please fill in all the input fields.');
      return;
    }
    else if (isUserExist !== undefined) {
      alert('User login successfully');
      this.router.navigate([""]);  // Navigate to the home component
    }
     else {
      alert('Wrong credentials');
   }
 }

}
