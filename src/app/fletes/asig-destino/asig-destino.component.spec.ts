import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsigDestinoComponent } from './asig-destino.component';

describe('AsigDestinoComponent', () => {
  let component: AsigDestinoComponent;
  let fixture: ComponentFixture<AsigDestinoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsigDestinoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsigDestinoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
