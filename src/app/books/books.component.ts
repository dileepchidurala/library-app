import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router"; //for identifying router and use it for remove

import {
  ITdDataTableColumn,
  TdDataTableService,
  TdDataTableSortingOrder,
  ITdDataTableSortChangeEvent
} from "@covalent/core/data-table";
import { TdDialogService } from "@covalent/core/dialogs";

//Angular material
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

//Dailog component
import { DialogComponent } from "../dialog/dialog.component";

import { Book } from "../book";

//service
import { BookService } from "../book.service";

// const DECIMAL_FORMAT: (v: any) => any = (v: number) => v.toFixed(2);

@Component({
  selector: "app-books",
  templateUrl: "./books.component.html",
  styleUrls: ["./books.component.css"]
})
export class BooksComponent implements OnInit {
  columns: ITdDataTableColumn[] = [
    { name: "book_id", label: "Book Id", width: 70 },
    { name: "book_name", label: "Book Name", width: 300 },
    { name: "description", label: "Description", width: 300 },
    { name: "author", label: "Author", width: 200 },
    { name: "publication", label: "Publication" },
    { name: "price", label: "Price" },
    { name: "status", label: "Status", width: 150 }
  ];

  books: Array<Book> = [];

  // columns: ITdDataTableColumn[] = [
  //   { name: 'first_name',  label: 'First Name', sortable: true, width: 150 },
  //   { name: 'last_name', label: 'Last Name', filter: true, sortable: false },
  //   { name: 'gender', label: 'Gender', hidden: false },
  //   { name: 'email', label: 'Email', sortable: true, width: 250 },
  //   { name: 'balance', label: 'Balance', numeric: true },
  // ];
  data: Array<any> = [];
  style_all: any;
  style_avaliable: any;
  style_notAvaliable: any;
  style_reserved: any;
  filteredData: any[] = this.data;
  filteredTotal: number = this.data.length;

  searchTerm: string = "";
  res: string;
  constructor(
    private router: Router,
    private dialog: MatDialog,
    private _dataTableService: TdDataTableService,
    private _bookService: BookService
  ) {}

  ngOnInit() {
    if (this.router.url == "/books") {
      this.avaliablebooks();
    } else if (this.router.url == "/remove") {
      this.avaliablebooks();
    } else if (this.router.url == "/reinstate") {
      this.reservedbooks();
    } else {
      this.notAvaliablebooks();
    }
    this.filter();
  }

  search(searchTerm: string): void {
    this.searchTerm = searchTerm;
    this.filter();
  }

  showAlert(event: any): void {
    let row: any = event.row;
    let dialogRef;
    if (this.router.url == "/books") {
      dialogRef = this.dialog.open(DialogComponent, {
        width: "350px",
        data: {
          text: "Are you sure you want to reserve this book",
          status: event.row.status,
          book: event.row.book_name,
          for: "On_avliable"
        }
      });
    } else if (this.router.url == "/remove") {
      dialogRef = this.dialog.open(DialogComponent, {
        width: "350px",
        data: {
          text: "Are you sure you want to delete this book",
          status: event.row.status,
          book: event.row.book_name,
          for: "On_avliable"
        }
      });
    } else {
      dialogRef = this.dialog.open(DialogComponent, {
        width: "350px",
        data: {
          text: "You want to Reinstate the book",
          status: event.row.status,
          book: event.row.book_name,
          for: "On_reserve"
        }
      });
    }

    dialogRef.afterClosed().subscribe(result => {
      this.res = result;
      if (this.res) {
        if (this.router.url == "/books") {
          console.log(
            "Mail will be sent for you to get the book" + event.row.id
          );
          this._bookService.reservationOfBook(event.row.id).subscribe(res => {
            this.avaliablebooks();
          });
        } else if (this.router.url == "/remove") {
          this._bookService.deleteBook(event.row.id).subscribe(res => {
            this.avaliablebooks();
          });
        } else if (this.router.url == "/notavaliable") {
          this._bookService.notAvaliableBook(event.row.id).subscribe(res => {
            this.notAvaliablebooks();
          });
        } else {
          this._bookService.reinstateBook(event.row.id).subscribe(res => {
            this.reservedbooks();
          });
        }
      }
    });
  }

  allbooks() {
    this._bookService.getAllBooks().subscribe(res => {
      this.data = res;
      this.filter();
    });
    this.style_all = {
      "background-color": "lightseagreen"
    };
    this.style_avaliable = null;
    this.style_reserved = null;
    this.style_notAvaliable = null;
  }

  avaliablebooks() {
    this._bookService.getAvaliableBooks().subscribe(res => {
      this.data = res;
      this.filter();
    });
    this.style_all = null;
    this.style_avaliable = {
      "background-color": "lightseagreen"
    };
    this.style_reserved = null;
    this.style_notAvaliable = null;
  }

  reservedbooks() {
    this._bookService.getReservedBooks().subscribe(res => {
      this.data = res;
      this.filter();
    });
    this.style_all = null;
    this.style_avaliable = null;
    this.style_reserved = {
      "background-color": "lightseagreen"
    };
    this.style_notAvaliable = null;
  }

  notAvaliablebooks() {
    this._bookService.getNotAvaliableBooks().subscribe(res => {
      this.data = res;
      this.filter();
    });
    this.style_all = null;
    this.style_avaliable = null;
    this.style_reserved = null;
    this.style_notAvaliable = {
      "background-color": "lightseagreen"
    };
  }

  filter(): void {
    let newData: any[] = this.data;
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
