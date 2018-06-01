import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpModule} from '@angular/http';
import {FormsModule , ReactiveFormsModule} from '@angular/forms';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';

//All the module that covalent needed is imported in this shared folder
import { SharedModule } from './shared/shared.module';

//Angular Materials imports
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';

import { BookService } from './book.service';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BooksComponent } from './books/books.component';
import { AddBookComponent } from './add-book/add-book.component';
import { DialogComponent } from './dialog/dialog.component';
import { AdminSectionComponent } from './admin-section/admin-section.component';
import { MiddleComponent } from './middle/middle.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BooksComponent,
    AddBookComponent,
    DialogComponent,
    AdminSectionComponent,
    MiddleComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    BrowserAnimationsModule,
    SharedModule,
    MatInputModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  entryComponents: [
    DialogComponent
  ],
  providers: [BookService],
  bootstrap: [AppComponent]
})
export class AppModule { }
