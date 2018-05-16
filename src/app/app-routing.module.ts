import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { HomeComponent } from "./home/home.component";
import { BooksComponent } from "./books/books.component";
import { AddBookComponent } from "./add-book/add-book.component";

const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "books",
    component: BooksComponent
  },
  {
    path: "addbook",
    component: AddBookComponent
  },
  {
    path: "remove",
    component: BooksComponent
  },
  {
    path: "reinstate",
    component: BooksComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
