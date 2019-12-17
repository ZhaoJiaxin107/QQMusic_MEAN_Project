import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GooglepageComponent } from './googlepage.component';

describe('GooglepageComponent', () => {
  let component: GooglepageComponent;
  let fixture: ComponentFixture<GooglepageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GooglepageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GooglepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
