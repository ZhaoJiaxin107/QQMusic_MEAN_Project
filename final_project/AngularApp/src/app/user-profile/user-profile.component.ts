import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../shared/user.service';
import { ReviewService } from '../shared/review.service';
import { Router } from '@angular/router';
import { Review } from '../shared/review.model';
declare var M:any;

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
  providers:[UserService,ReviewService]
})
export class UserProfileComponent implements OnInit {
  userDetails;
  showSuccessMessage:boolean;
  serverErrorMessage:string;
  constructor(private userService:UserService,
    private reviewService:ReviewService,
    private router:Router) { }

  ngOnInit() {
    this.userService.getUserProfile().subscribe(
      res=>{
        this.userDetails = res['user'];
      },
      
      err=>{}
    );
  }

  resetForm(form?:NgForm){
    if(form)
      form.reset();
    this.reviewService.selectedReview={
      _id:"",
      title:"",
      fullname:"",
      text:"",
      rating:null
    }  
  }

  
  onSubmit(form: NgForm) {
      this.reviewService.postReview(form.value).subscribe(
        res=>{
          this.showSuccessMessage = true;
          setTimeout(() => this.showSuccessMessage=false,4000);
          this.resetForm(form);
          //M.toast({html:'Saved successfully',classes:'rounded'});
        }
        
      );
  }

  onLogout(){
    this.userService.deleteToken();
    this.router.navigate(['/login']);
  }

}
