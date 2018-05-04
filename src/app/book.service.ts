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

  insertbook(post: Book){
    let headers = new Headers({'content-type':'application/json'});
    let options = new RequestOptions({headers:headers});
    return this._http.post('/api/addbook',JSON.stringify(post),options)
      .map(result =>this.result = result.json());
  }

}
