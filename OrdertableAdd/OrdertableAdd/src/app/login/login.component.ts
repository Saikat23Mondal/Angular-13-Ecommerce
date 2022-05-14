import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder,Validators} from "@angular/forms";
import { Router } from '@angular/router';
import { ApiService } from '../shared/api.service';
import { UserModel } from '../user.model';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
public loginForm!: FormGroup
public loginObj = new UserModel();
public userName :any= "" ;
  constructor(private fromBuilder : FormBuilder,private http:HttpClient,private router: Router, private api:ApiService) { }

  ngOnInit(): void {
    this.loginForm = this.fromBuilder.group({
      email:['',Validators.required],
      password:['',Validators.required]
    })
  }
  login(){
    this.loginObj.Email=this.loginForm.value.email;
    this.loginObj.Password=this.loginForm.value.password;
    this.api.login(this.loginObj)
    .subscribe(res=>{
      alert(res.message);
      this.loginForm.reset();
    localStorage.setItem('token',res.jwtToken);
    localStorage.setItem('userType',res.type);
      if(res.message === "User Not Found"){
        this.router.navigate([''])
      }
      else{
      this.router.navigate(['/product'])
    }
    })
  }
  // login(){
  //   this.http.get<any>("https://localhost:7265/api/Login/users")
  //   .subscribe(res=>{
  //    const user = res.find((a:any)=>{
  //      return a.email===this.loginForm.value.email && 
  //      a.password===this.loginForm.value.password
  //    });
  //    if(user){
  //      alert("Login Success");
  //      this.loginForm.reset();
  //      this.router.navigate(['/product'])
  //    }
  //    else{
  //      alert("User Not Found");
  //    }
  //   },err=>{
  //   alert("Somthing Went Wrong")
  //   })
  // }

}
