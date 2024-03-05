import { Component } from '@angular/core';
import { EntryServiceService } from './services/entry-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'testPrep';

  constructor(public service: EntryServiceService) {}
}
