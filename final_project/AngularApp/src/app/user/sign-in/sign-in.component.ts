import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../shared/user.service';
import { AuthService,SocialUser,GoogleLoginProvider} from 'ng4-social-login';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  public user:any = SocialUser;
  userDetails;
  constructor(private userService:UserService,private router:Router,
    private socialAuthService:AuthService) {}
  model = {
    email:'',
    password:''
  };
  emailRegex = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
  serverErrorMessages:string;
  ngOnInit() {
  }

  onSubmit(form:NgForm){
    this.userService.login(form.value).subscribe(
      res=>{
        this.userService.setToken(res['token']);
        //console.log(form.value);
        this.userService.getUserProfile().subscribe(
          res=>{
            this.userDetails = res['user'];
            if(this.userDetails.local.isAdmin == true){
              this.router.navigateByUrl('/admin');
            }else{
              this.router.navigateByUrl('/userprofile');
            }
          }
        )
      },
      err =>{
        if(err.status === 401)
          this.serverErrorMessages = 'Please contact with admin!';
        else
          this.serverErrorMessages = 'Login unsuccessful!';
      }
    );
  }
  googlelogin(){
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then((userData)=>{
      this.user = userData;
    });
  }
}
