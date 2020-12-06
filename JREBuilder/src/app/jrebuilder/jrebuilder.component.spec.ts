import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JrebuilderComponent } from './jrebuilder.component';

describe('JrebuilderComponent', () => {
  let component: JrebuilderComponent;
  let fixture: ComponentFixture<JrebuilderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JrebuilderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JrebuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
