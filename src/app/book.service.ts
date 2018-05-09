import { Injectable } from '@angular/core';
import { Http , Headers , RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

import{ Book } from './book';

@Injectable()
export class BookService {

  result:any;

  constructor(private _http:Http) { }

  getAllBooks(){
    return this._http.get('/api/books')
      .map(result => this.result = result.json());
  }

  getAvaliableBooks(){
    return this._http.get('/api/avaliable_books')
      .map(result => this.result = result.json());
  }

  getReservedBooks(){
    return this._http.get('/api/reserved_books')
      .map(result => this.result = result.json());
  }

  reservationOfBook(id){
    return this._http.get('/api/reservation/'+id)
      .map(result => this.result = result.json());
  }

  insertbook(post: Book){
    let headers = new Headers({'content-type':'application/json'});
    let options = new RequestOptions({headers:headers});
    return this._http.post('/api/addbook',JSON.stringify(post),options)
      .map(result =>this.result = result.json());
  }

  deleteBook(id){
    return this._http.delete('/api/delete/'+id)
      .map(result => this.result = result);
  }

}
