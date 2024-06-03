import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickbookingComponent } from './quickbooking.component';

describe('QuickbookingComponent', () => {
  let component: QuickbookingComponent;
  let fixture: ComponentFixture<QuickbookingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuickbookingComponent]
    });
    fixture = TestBed.createComponent(QuickbookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
