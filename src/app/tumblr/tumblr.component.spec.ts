import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TumblrComponent } from './tumblr.component';

describe('TumblrComponent', () => {
  let component: TumblrComponent;
  let fixture: ComponentFixture<TumblrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TumblrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TumblrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
