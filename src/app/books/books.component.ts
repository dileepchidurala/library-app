import { Component, OnInit, OnChanges } from "@angular/core";
import { Router } from "@angular/router";

import {
  ITdDataTableColumn,
  TdDataTableService
} from "@covalent/core/data-table";
import { TdDialogService } from "@covalent/core/dialogs";
import { ViewContainerRef } from "@angular/core";

import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
  ErrorStateMatcher
} from "@angular/material";

//Dailog component
import { DialogComponent } from "../dialog/dialog.component";

import { MiddleComponent } from "../middle/middle.component";

import { Book } from "../book";

//service
import { BookService } from "../book.service";

@Component({
  selector: "app-books",
  templateUrl: "./books.component.html",
  styleUrls: ["./books.component.css"]
})
export class BooksComponent implements OnInit {
  books: Array<any> = [];

  filteredData: any[] = this.books;
  filteredTotal: number = this.books.length;
  searchTerm: string = "";
  columns: ITdDataTableColumn[] = [
    { name: "book_id", label: "Book Id", width: 70 },
    { name: "book_name", label: "Book Name", width: 300 },
    { name: "description", label: "Description", width: 300 },
    { name: "author", label: "Author", width: 200 },
    { name: "publication", label: "Publication" },
    { name: "price", label: "Price" },
    { name: "status", label: "Status", width: 150 }
  ];

  error_msg: string = null;

  res: string;
  constructor(
    private router: Router,
    private dialog: MatDialog,
    private _bookService: BookService,
    private _middleComp: MiddleComponent,
    private _dataTableService: TdDataTableService,
    private _dialogService: TdDialogService,
    private _viewContainerRef: ViewContainerRef
  ) {}

  ngOnInit() {
    this._bookService.cast.subscribe(data => {
      this.books = data;
      this.filter();
    });
  }

  openAlert(): void {
    this._dialogService
      .openAlert({
        message: this.error_msg,
        disableClose: true || false, // defaults to false
        viewContainerRef: this._viewContainerRef, //OPTIONAL
        title: "Alert", //OPTIONAL, hides if not provided
        closeButton: "Okay", //OPTIONAL, defaults to 'CLOSE'
        width: "400px" //OPTIONAL, defaults to 400px
      })
      .afterClosed()
      .subscribe(() => {
        this._middleComp.avaliablebooks();
        this.error_msg = null;
      });
  }

  showAlert(event: any): void {
    let row: any = event.row;
    let dialogRef;
    dialogRef = this.dialog.open(DialogComponent, {
      width: "350px",
      data: {
        text: "Are you sure you want to reserve this book",
        status: event.row.status,
        book: event.row.book_name
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.res = result;
      if (this.res) {
        console.log("Mail will be sent for you to get the book" + event.row.id);
        this._bookService.reservationOfBook(event.row.id).subscribe(
          res => {
            this._middleComp.avaliablebooks();
            this.error_msg = null;
          },
          error => {
            this.error_msg = error;
            this.openAlert();
          }
        );
      }
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
