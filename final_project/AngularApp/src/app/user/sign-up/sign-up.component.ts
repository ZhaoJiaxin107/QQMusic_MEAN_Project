import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/user.service'
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  emailRegex = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
  showSuccessMessage:boolean;
  serverErrorMessage:string;
  constructor(private userService:UserService) { }

  ngOnInit() {
  }

  onSubmit(form:NgForm){
    this.userService.postUser(form.value).subscribe(
      res=>{
        this.showSuccessMessage = true;
        setTimeout(() => this.showSuccessMessage = false,4000);
        this.resetForm(form);
      },
      err=>{
        if(err.status === 422){
          this.serverErrorMessage = err.error.join('<br/>');
        }else{
          this.serverErrorMessage = 'This email has existed!';
        }
      }
    );
  }

  resetForm(form:NgForm){
    this.userService.selectedUser = {
      fullname:'',
      email:'',
      password:''
    };
    form.resetForm();
    this.serverErrorMessage='';
  }
}
