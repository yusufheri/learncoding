import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyListPostsComponent } from './my-list-posts.component';

describe('MyListPostsComponent', () => {
  let component: MyListPostsComponent;
  let fixture: ComponentFixture<MyListPostsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyListPostsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyListPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
