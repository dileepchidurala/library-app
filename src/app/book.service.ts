import { Injectable } from "@angular/core";
import { Http, Headers, RequestOptions } from "@angular/http";
import { Observable } from "rxjs";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";

import { Book } from "./book";

@Injectable()
export class BookService {
  result: any;

  constructor(private _http: Http) {}

  getAllBooks() {
    return this._http
      .get("/api/books")
      .map(result => (this.result = result.json()));
  }

  getAvaliableBooks() {
    return this._http
      .get("/api/avaliable_books")
      .map(result => (this.result = result.json()));
  }

  getReservedBooks() {
    return this._http
      .get("/api/reserved_books")
      .map(result => (this.result = result.json()));
  }

  getNotAvaliableBooks() {
    return this._http
      .get("/api/notavaliable_books")
      .map(result => (this.result = result.json()));
  }

  insertbook(post: Book) {
    let headers = new Headers({ "content-type": "application/json" });
    let options = new RequestOptions({ headers: headers });
    return this._http
      .post("/api/addbook", JSON.stringify(post), options)
      .map(result => (this.result = result.json()));
  }

  reservationOfBook(id) {
    return this._http
      .get("/api/reservation/" + id)
      .map(result => (this.result = result.json()))
      .catch(this._errorHandler);
  }

  reinstateBook(id) {
    return this._http
      .get("/api/reinstate/" + id)
      .map(result => (this.result = result.json()));
  }

  notAvaliableBook(id) {
    return this._http
      .get("/api/notavaliable/" + id)
      .map(result => (this.result = result.json()));
  }

  deleteBook(id) {
    return this._http
      .delete("/api/delete/" + id)
      .map(result => (this.result = result));
  }

  _errorHandler(error) {
    console.error(error._body);
    return Observable.throw(error._body || "Server Error");
  }
}
