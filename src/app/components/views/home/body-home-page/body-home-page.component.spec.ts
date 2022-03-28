import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BodyHomePageComponent } from './body-home-page.component';

describe('BodyHomePageComponent', () => {
  let component: BodyHomePageComponent;
  let fixture: ComponentFixture<BodyHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BodyHomePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BodyHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
