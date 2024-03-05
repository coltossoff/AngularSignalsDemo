import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntryItemComponent } from './entry-item.component';
import { EntryServiceService } from 'src/app/services/entry-service.service';

describe('EntryItemComponent', () => {
  let component: EntryItemComponent;
  let fixture: ComponentFixture<EntryItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EntryItemComponent],
      providers: [EntryServiceService]
    });
    fixture = TestBed.createComponent(EntryItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
