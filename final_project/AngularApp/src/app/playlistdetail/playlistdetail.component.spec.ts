import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistdetailComponent } from './playlistdetail.component';

describe('PlaylistdetailComponent', () => {
  let component: PlaylistdetailComponent;
  let fixture: ComponentFixture<PlaylistdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaylistdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaylistdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
