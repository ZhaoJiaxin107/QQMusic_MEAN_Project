import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateplaylistComponent } from './updateplaylist.component';

describe('UpdateplaylistComponent', () => {
  let component: UpdateplaylistComponent;
  let fixture: ComponentFixture<UpdateplaylistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateplaylistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateplaylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
