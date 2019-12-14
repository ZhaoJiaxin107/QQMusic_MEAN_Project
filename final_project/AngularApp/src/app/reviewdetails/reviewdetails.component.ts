import { Component, OnInit, ViewChild } from '@angular/core';
import { ReviewService } from '../shared/review.service';
import { Review } from '../shared/review.model';
import { Observable } from 'rxjs';
import { MatSort,MatSortable,MatTableDataSource} from '@angular/material';
import { Router } from '@angular/router';
@Component({
  selector: 'app-reviewdetails',
  templateUrl: './reviewdetails.component.html',
  styleUrls: ['./reviewdetails.component.css'],
  providers:[ReviewService]
})
export class ReviewdetailsComponent implements OnInit {

  constructor(private reviewService:ReviewService,private router:Router) { }
  listData:MatTableDataSource<any>;
  displayedColumns:string[]=['title','fullname','text','rating']

  @ViewChild(MatSort,null) sort:MatSort;
  ngOnInit() {
  }

}
