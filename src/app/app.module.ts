import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EntryFormComponent } from './components/form/entry-form/entry-form.component';
import { EntryItemComponent } from './components/entry-item/entry-item.component';

@NgModule({
  declarations: [
    AppComponent,
    EntryFormComponent,
    EntryItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
