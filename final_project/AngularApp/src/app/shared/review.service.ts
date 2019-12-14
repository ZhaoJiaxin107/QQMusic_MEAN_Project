import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Review } from './review.model';
@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  selectedReview:Review;
  reviews:Review[];
  readonly baseURL = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  postReview(rev: Review) {
    return this.http.post(this.baseURL+'/review', rev);
  }

  getReviewList() {
    return this.http.get(this.baseURL+'/review');
  }
}
