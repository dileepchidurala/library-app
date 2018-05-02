import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpModule} from '@angular/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';

//All the module that covalent needed is imported in this shared folder
import { SharedModule } from './shared/shared.module';

//Angular Materials imports
import {MatInputModule} from '@angular/material/input';

import { BookService } from './book.service';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BooksComponent } from './books/books.component';
import { AddBookComponent } from './add-book/add-book.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BooksComponent,
    AddBookComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    BrowserAnimationsModule,
    SharedModule,
    MatInputModule,
  ],
  providers: [BookService],
  bootstrap: [AppComponent]
})
export class AppModule { }
