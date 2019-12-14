import { Component, OnInit, ViewChild } from '@angular/core';
import { ReviewService } from '../shared/review.service';
import { Review } from '../shared/review.model';
import { Observable } from 'rxjs';
import { MatSort,MatSortable,MatTableDataSource} from '@angular/material';
import { Router } from '@angular/router';
import { ScrollingModule } from '@angular/cdk/scrolling';
@Component({
  selector: 'app-reviewdetails',
  templateUrl: './reviewdetails.component.html',
  styleUrls: ['./reviewdetails.component.css'],
  providers:[ReviewService]
})
export class ReviewdetailsComponent implements OnInit {

  constructor(private reviewService:ReviewService,private router:Router) { }
  

  @ViewChild(MatSort,null) sort:MatSort;
  ngOnInit() {  
    this.refreshReviewList();
  }

  refreshReviewList(){
    this.reviewService.getReviewList().subscribe((res) =>{
      this.reviewService.reviews = res as Review[];
      console.log(this.reviewService.reviews);
    });
  }
  
}
