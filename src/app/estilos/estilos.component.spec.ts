/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EstilosComponent } from './estilos.component';

describe('EstilosComponent', () => {
  let component: EstilosComponent;
  let fixture: ComponentFixture<EstilosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstilosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstilosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
