import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/RX';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Book } from './book';

@Injectable()
export class BookService {
  result: any;

  // A commone data shared with the middle and admin and books components to sync actions on data in them
  data = new BehaviorSubject<any>([]);
  cast = this.data.asObservable();

  // For child component of middle to know which tab is clicked avaliable,reserved,allbooks
  state = new BehaviorSubject<any>([]);
  cast_state = this.state.asObservable();

  constructor(private _http: Http) {}

  getAllBooks() {
    return this._http
      .get('/api/books')
      .map(result => (this.result = result.json()));
  }

  getAvaliableBooks() {
    return this._http
      .get('/api/avaliable_books')
      .map(result => (this.result = result.json()));
  }

  getReservedBooks() {
    return this._http
      .get('/api/reserved_books')
      .map(result => (this.result = result.json()));
  }

  getNotAvaliableBooks() {
    return this._http
      .get('/api/notavaliable_books')
      .map(result => (this.result = result.json()));
  }

  insertbook(post: Book) {
    const headers = new Headers({ 'content-type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    return this._http
      .post('/api/addbook', JSON.stringify(post), options)
      .map(result => (this.result = result.json()));
  }

  reservationOfBook(id) {
    return this._http
      .get('/api/reservation/' + id)
      .map(result => (this.result = result.json()))
      .catch(this._errorHandler);
  }

  reinstateBook(id) {
    return this._http
      .get('/api/reinstate/' + id)
      .map(result => (this.result = result.json()));
  }

  notAvaliableBook(id) {
    return this._http
      .get('/api/notavaliable/' + id)
      .map(result => (this.result = result.json()));
  }

  deleteBook(id) {
    return this._http
      .delete('/api/delete/' + id)
      .map(result => (this.result = result));
  }

  _errorHandler(error) {
    console.error(error._body);
    return Observable.throw(error._body || 'Server Error');
  }

  editData(newdata) {
    this.data.next(newdata);
  }

  editstate(newstate) {
    this.state.next(newstate);
  }
}
