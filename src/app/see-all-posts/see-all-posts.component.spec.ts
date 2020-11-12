import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeeAllPostsComponent } from './see-all-posts.component';

describe('SeeAllPostsComponent', () => {
  let component: SeeAllPostsComponent;
  let fixture: ComponentFixture<SeeAllPostsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeeAllPostsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeeAllPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
