import { Component, OnInit } from '@angular/core';
import { UsersList, User } from 'src/app/models/user';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ValidatorService } from 'src/app/services/validator/validator.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // emailRegex : any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  // passwordRegex : any = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,10}$/;
  isEmailValid : boolean = false;
  isPassValid : boolean = false;
  isSubmit : boolean = false;
  uList : UsersList = new UsersList();
  msg : string;
  returnUrl :string;
  constructor(
    private _auth : AuthService,
    private _validator : ValidatorService,
    private router : Router,
    private activatedRoute : ActivatedRoute) {
      this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'] || '/';
    }
  ngOnInit() {
  }

  login(email,password){
    this.isSubmit = true;
    if(this.isValid(email,password)){
      let user : User = this.uList.getUser(email,password);
      if(user){
        this._auth.saveUser(user);
        this.router.navigate([this.returnUrl]);
      }
      else{
        this.msg = 'Wrong Email or Password';
      }
    }
  }

  goOn(){
    let user : User = this.uList.getAllUsers()[0];
    this.login(user.email,user.password);
  }

  isValid(email : string, password : string){
    if(this.validate(email,'email') && this.validate(password,'password')){
      return true;
    }
    else{
      this.msg = 'Email or Password are not valid';
      return false;
    }
  }

  validate(val : any,whichInput :string) : boolean{
    let isV : boolean = this._validator.validate(val,whichInput);
    whichInput == 'email' ? this.isEmailValid = isV : this.isPassValid = isV;
    return isV;
  }

  // emailValidator(email : any){
  //   var re = new RegExp(this.emailRegex);
  //   if (re.test(email)) {
  //     this.isEmailValid = true;
  //     return true;
  //   } else {
  //     this.isEmailValid = false;
  //     return false;
  //   }
  // }

  // passwordValidator(pass : string){
  //   var re = new RegExp(this.passwordRegex);
  //   if (re.test(pass)) {
  //     this.isPassValid = true;
  //     return true;
  //   } else {
  //     this.isPassValid = false;
  //     return false;
  //   }
  // }
}
