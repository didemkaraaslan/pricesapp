import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoeCommentsComponent } from './shoe-comments.component';

describe('ShoeCommentsComponent', () => {
  let component: ShoeCommentsComponent;
  let fixture: ComponentFixture<ShoeCommentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShoeCommentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoeCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
