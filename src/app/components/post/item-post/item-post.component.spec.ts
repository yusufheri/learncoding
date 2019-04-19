import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemPostComponent } from './item-post.component';

describe('ItemPostComponent', () => {
  let component: ItemPostComponent;
  let fixture: ComponentFixture<ItemPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
