import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnvironmentManagerComponent } from './environment-manager.component';

describe('EnvironmentManagerComponent', () => {
  let component: EnvironmentManagerComponent;
  let fixture: ComponentFixture<EnvironmentManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnvironmentManagerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnvironmentManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
