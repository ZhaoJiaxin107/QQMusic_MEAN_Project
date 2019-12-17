import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../shared/user.service';
import { ReviewService } from '../shared/review.service';
import { SongService } from '../shared/song.service';
import { Router } from '@angular/router';
import { Review } from '../shared/review.model';
import { Song } from '../shared/song.model';
declare var M:any;

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
  providers:[UserService,ReviewService,SongService]
})
export class UserProfileComponent implements OnInit {
  userDetails;
  showSuccessMessage:boolean;
  serverErrorMessage:string;
  constructor(private userService:UserService,
    private reviewService:ReviewService,
    private songService:SongService,
    private router:Router) { }

  ngOnInit() {
    this.userService.getUserProfile().subscribe(
      res=>{
        this.userDetails = res['user'];
        console.log(this.userDetails);
      },
      
      err=>{}
    );
    this.resetForm();
  }

  resetForm(form?:NgForm){
    if(form)
      form.reset();
    this.reviewService.selectedReview={
      _id:"",
      title:"",
      fullname:"",
      text:"",
      rating:null,
      time:null
    }  
  }

  resetSongForm(form?:NgForm){
    if(form)
      form.reset();
    /*this.songService.selectedSong={
      header:"",
      _id:"",
      title:"",
      artist:"",
      album:"",
      year:null,
      comment:"",
      reserve:"",
      track:null,
      genre:"",
      review:"",
      num:null,
      score:null
    }*/  
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

  onSubmit1(form: NgForm) {
    this.songService.postSong(form.value).subscribe(
      res=>{
        this.showSuccessMessage = true;
        setTimeout(() => this.showSuccessMessage=false,4000);
        this.resetForm(form);
        console.log('Saved Successfully!');
        //M.toast({html:'Saved successfully',classes:'rounded'});
      }
      
    );
}
  onLogout(){
    this.userService.deleteToken();
    this.router.navigate(['/home']);
  }

}
