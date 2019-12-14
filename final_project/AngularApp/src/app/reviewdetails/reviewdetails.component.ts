import { Component, OnInit, ViewChild } from '@angular/core';
import { ReviewService } from '../shared/review.service';
import { Review } from '../shared/review.model';
import { Observable } from 'rxjs';
import { MatSort,MatSortable,MatTableDataSource} from '@angular/material';
import { Router } from '@angular/router';
import { filter } from 'rxjs/operators';
@Component({
  selector: 'app-reviewdetails',
  templateUrl: './reviewdetails.component.html',
  styleUrls: ['./reviewdetails.component.css'],
  providers:[ReviewService]
})
export class ReviewdetailsComponent implements OnInit {

  constructor(private reviewService:ReviewService,private router:Router) { }
  listData:MatTableDataSource<any>;
  displayedColumns:string[]=['title','fullname','text','rating','time']

  @ViewChild(MatSort,null) sort:MatSort;
  ngOnInit() {  
    this.refreshReviewList();
  }

  refreshReviewList(){
    this.reviewService.getReviewList().subscribe(data=>{
      this.listData = new MatTableDataSource(data);
      console.log(this.listData);
      this.listData.sort = this.sort;
    });
  }
  applyFilter(filtervalue:string){
    this.listData.filter = filtervalue.trim().toLocaleLowerCase();
  }
}
