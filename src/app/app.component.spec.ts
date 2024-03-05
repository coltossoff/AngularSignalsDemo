import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { EntryServiceService } from './services/entry-service.service';
import { EntryFormComponent } from './components/form/entry-form/entry-form.component';
import { EntryItemComponent } from './components/entry-item/entry-item.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('AppComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      RouterTestingModule,
      ReactiveFormsModule
    ],
    declarations: [AppComponent, EntryFormComponent, EntryItemComponent],
    providers: [
      EntryServiceService
    ]
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render Entry Form', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const children = compiled.querySelector('app-entry-form');
    expect(children)?.toBeTruthy();
  });
});
