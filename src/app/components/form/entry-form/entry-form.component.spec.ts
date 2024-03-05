import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntryFormComponent } from './entry-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('EntryFormComponent', () => {
  let component: EntryFormComponent;
  let fixture: ComponentFixture<EntryFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EntryFormComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule
      ]
    });
    fixture = TestBed.createComponent(EntryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
