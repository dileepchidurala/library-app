import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router"; //for identifying router and use it for remove

//for covalent table imports
import { ITdDataTableColumn } from "@covalent/core/data-table";
import { TdDialogService } from "@covalent/core/dialogs";

import { Book } from "../book";

//service
import { BookService } from "../book.service";

@Component({
  selector: "app-admin-section",
  templateUrl: "./admin-section.component.html",
  styleUrls: ["./admin-section.component.css"]
})
export class AdminSectionComponent implements OnInit {
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
  style_all: any;
  style_avaliable: any;
  style_notAvaliable: any;
  style_reserved: any;

  constructor(
    private router: Router,
    private _dialogService: TdDialogService,
    private _bookService: BookService
  ) {}

  openPrompt(row: any, name: string): void {
    this._dialogService
      .openPrompt({
        message: "Enter comment?",
        value: row[name]
      })
      .afterClosed()
      .subscribe((value: any) => {
        if (value !== undefined) {
          row[name] = value;
        }
      });
  }

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
    this._bookService.getAllBooks().subscribe(res => {
      this.books = res;
    });
  }
  allbooks() {
    this._bookService.getAllBooks().subscribe(res => {
      this.books = res;
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
      this.books = res;
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
      this.books = res;
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
      this.books = res;
    });
    this.style_all = null;
    this.style_avaliable = null;
    this.style_reserved = null;
    this.style_notAvaliable = {
      "background-color": "lightseagreen"
    };
  }
}
