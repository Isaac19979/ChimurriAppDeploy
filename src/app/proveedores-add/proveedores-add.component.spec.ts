import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProveedoresAddComponent } from './proveedores-add.component';

describe('ProveedoresAddComponent', () => {
  let component: ProveedoresAddComponent;
  let fixture: ComponentFixture<ProveedoresAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProveedoresAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProveedoresAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
