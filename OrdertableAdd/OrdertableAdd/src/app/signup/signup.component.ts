import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder, Validators} from "@angular/forms";
import { Router } from '@angular/router';
import { ApiService } from '../shared/api.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  public signupForm !: FormGroup;

  constructor(private formBuilder :FormBuilder , private http : HttpClient , private router:Router, private api :ApiService) { }

  ngOnInit(): void {
    this.signupForm=this.formBuilder.group({
      fullName:['',Validators.required],
      phoneNumber:['',Validators.required],
      email:['',Validators.required],
      userType:['',Validators.required],
      password:['',Validators.required]
    })
  }
  signUp(){
  this.api.signUp(this.signupForm.value)
  .subscribe(res=>{
    alert(res.messege);
    this.signupForm.reset();
    this.router.navigate(['login']);
  })
  }
}
