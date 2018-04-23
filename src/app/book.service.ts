import { Injectable } from '@angular/core';
import { Http , Headers , RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class BookService {

  result:any;

  constructor(private _http:Http) { }

  home_page(){
    return this._http.get('/')
      .map(result => this.result = result.json);
  }
}
