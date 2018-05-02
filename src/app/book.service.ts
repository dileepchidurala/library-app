import { Injectable } from '@angular/core';
import { Http , Headers , RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class BookService {

  result:any;

  constructor(private _http:Http) { }

  getAllBooks(){
    return this._http.get('/api/books')
      .map(result => this.result = result.json());
  }
}
