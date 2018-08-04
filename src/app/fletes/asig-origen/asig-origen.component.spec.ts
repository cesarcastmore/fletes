import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsigOrigenComponent } from './asig-origen.component';

describe('AsigOrigenComponent', () => {
  let component: AsigOrigenComponent;
  let fixture: ComponentFixture<AsigOrigenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsigOrigenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsigOrigenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
