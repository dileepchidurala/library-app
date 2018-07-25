import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { BooksComponent } from './books/books.component';
import { AddBookComponent } from './add-book/add-book.component';
import { AdminSectionComponent } from './admin-section/admin-section.component';
import { MiddleComponent } from './middle/middle.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'middle',
    component: MiddleComponent,
    children: [
      {
        path: 'books',
        component: BooksComponent
      },
      {
        path: 'admin',
        component: AdminSectionComponent
      }
    ]
  },
  {
    path: 'addbook',
    component: AddBookComponent
  },
  {
    path: '**',
    component: HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
