import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsigCentroComponent } from './asig-centro.component';

describe('AsigCentroComponent', () => {
  let component: AsigCentroComponent;
  let fixture: ComponentFixture<AsigCentroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsigCentroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsigCentroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
