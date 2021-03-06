import { Component, OnInit } from "@angular/core";

import { Router } from "@angular/router";

//for covalent table imports
import {
  ITdDataTableColumn,
  TdDataTableService
} from "@covalent/core/data-table";
import { TdDialogService } from "@covalent/core/dialogs";
import { ViewContainerRef } from "@angular/core";

import { Book } from "../book";
import { MiddleComponent } from "../middle/middle.component";

import { BookService } from "../book.service";

@Component({
  selector: "app-admin-section",
  templateUrl: "./admin-section.component.html",
  styleUrls: ["./admin-section.component.css"]
})
export class AdminSectionComponent implements OnInit {
  books: Array<any> = [];
  state: any;
  content = [
    {
      message: "Are you sure you want to Reinstate this book ",
      title: "Reinstate",
      acceptButton: "Reinstate"
    },
    {
      message: "Are you sure you want to Remove this book ",
      title: "Remove",
      acceptButton: "Remove"
    },
    {
      message: "Are you sure you want to Add this book ",
      title: "ADD",
      acceptButton: "Add"
    }
  ];

  filteredData: any[] = this.books;
  filteredTotal: number = this.books.length;
  searchTerm: string = "";
  columns: ITdDataTableColumn[] = [
    { name: "book_id", label: "Book Id" },
    { name: "book_name", label: "Book Name" },
    { name: "description", label: "Description" },
    { name: "author", label: "Author" },
    { name: "publication", label: "Publication" },
    { name: "price", label: "Price" },
    { name: "status", label: "Status" }
  ];

  constructor(
    private router: Router,
    private _dialogService: TdDialogService,
    private _viewContainerRef: ViewContainerRef,
    private _middleComp: MiddleComponent,
    private _bookService: BookService,
    private _dataTableService: TdDataTableService
  ) {}

  openConfirm(row: any, num: number): void {
    this._dialogService
      .openConfirm({
        message: this.content[num].message + row.book_name,
        disableClose: true || false, // defaults to false
        viewContainerRef: this._viewContainerRef, //OPTIONAL
        title: this.content[num].title, //OPTIONAL, hides if not provided
        cancelButton: "Cancel", //OPTIONAL, defaults to 'CANCEL'
        acceptButton: this.content[num].acceptButton, //OPTIONAL, defaults to 'ACCEPT'
        width: "500px" //OPTIONAL, defaults to 400px
      })
      .afterClosed()
      .subscribe((accept: boolean) => {
        if (accept) {
          if (num == 0) {
            this._bookService.reinstateBook(row.id).subscribe(res => {
              this._middleComp.allbooks();
            });
          } else if (num == 1) {
            this._bookService.notAvaliableBook(row.id).subscribe(res => {
              this._middleComp.allbooks();
            });
          } else {
            this._bookService.reinstateBook(row.id).subscribe(res => {
              this._middleComp.allbooks();
            });
          }
        } else {
          // DO SOMETHING ELSE
          console.log(row.id + "cancelled!!");
        }
      });
  }

  ngOnInit() {
    this._bookService.cast.subscribe(data => {
      this.books = data;
      this.filter();
    });
    this._bookService.cast_state.subscribe(data => {
      this.state = data;
    });
  }

  search(searchTerm: string): void {
    this.searchTerm = searchTerm;
    this.filter();
  }

  filter(): void {
    let newData: any[];
    this._bookService.cast.subscribe(data => {
      newData = data;
    });
    newData.forEach(element => {
      if (element.status == 0) {
        element.status = "Reserved";
      }
      if (element.status == 1) {
        element.status = "Avaliable";
      }
      if (element.status == 2) {
        element.status = "Not Avaliable";
      }
    });

    let excludedColumns: string[] = this.columns
      .filter((column: ITdDataTableColumn) => {
        return (
          (column.filter === undefined && column.hidden === true) ||
          (column.filter !== undefined && column.filter === false)
        );
      })
      .map((column: ITdDataTableColumn) => {
        return column.name;
      });
    newData = this._dataTableService.filterData(
      newData,
      this.searchTerm,
      true,
      excludedColumns
    );
    this.filteredTotal = newData.length;
    this.filteredData = newData;
  }
}
