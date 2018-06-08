import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { Book } from "../book";
import { BookService } from "../book.service";

@Component({
  selector: "app-middle",
  templateUrl: "./middle.component.html",
  styleUrls: ["./middle.component.css"]
})
export class MiddleComponent implements OnInit {
  books: Array<Book> = [];
  style_width: any;
  style_all: any;
  style_avaliable: any;
  style_notAvaliable: any;
  style_reserved: any;

  // state          value
  // all_books        3
  // avaliablebooks   1
  // reservedbooks    0
  // notavaliable     2
  state: any;

  constructor(private router: Router, private _bookService: BookService) {}

  ngOnInit() {
    if (this.router.url == "/notavaliable") {
      this.notAvaliablebooks();
    } else if (this.router.url == "/middle/books") {
      this.avaliablebooks();
    } else if (this.router.url == "/remove") {
      this.avaliablebooks();
    } else if (this.router.url == "/reinstate") {
      this.reservedbooks();
    } else {
      this.allbooks();
    }
  }

  allbooks() {
    this._bookService.getAllBooks().subscribe(res => {
      this._bookService.editData(res);
      this._bookService.editstate(3);
    });
    if (this.router.url == "/middle/admin") {
      this.style_width = { width: "95%" };
    }
    else{
      this.style_width = { width: "90%" };
    }
    this.style_all = {
      "background-color": "lightseagreen"
    };
    this.style_avaliable = null;
    this.style_reserved = null;
    this.style_notAvaliable = null;
  }

  avaliablebooks() {
    this._bookService.getAvaliableBooks().subscribe(res => {
      this._bookService.editData(res);
      this._bookService.editstate(1);
    });
    this.style_width = { width: "90%" };
    this.style_all = null;
    this.style_avaliable = {
      "background-color": "lightseagreen"
    };
    this.style_reserved = null;
    this.style_notAvaliable = null;
  }

  reservedbooks() {
    this._bookService.getReservedBooks().subscribe(res => {
      this._bookService.editData(res);
      this._bookService.editstate(0);
    });
    this.style_width = { width: "90%" };
    this.style_all = null;
    this.style_avaliable = null;
    this.style_reserved = {
      "background-color": "lightseagreen"
    };
    this.style_notAvaliable = null;
  }

  notAvaliablebooks() {
    this._bookService.getNotAvaliableBooks().subscribe(res => {
      this._bookService.editData(res);
      this._bookService.editstate(2);
    });
    this.style_width = { width: "90%" };
    this.style_all = null;
    this.style_avaliable = null;
    this.style_reserved = null;
    this.style_notAvaliable = {
      "background-color": "lightseagreen"
    };
  }
}
