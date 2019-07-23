/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CervejasComponent } from './cervejas.component';

describe('CervejasComponent', () => {
  let component: CervejasComponent;
  let fixture: ComponentFixture<CervejasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CervejasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CervejasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
