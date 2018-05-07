import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';

import { BookService } from '../book.service';
import{ Book } from '../book';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {

  book: Book;
  bookFrm: FormGroup;

  constructor(private _bookService:BookService, private router:Router, private aR:ActivatedRoute, private fb:FormBuilder) { }

  ngOnInit() {
    this.bookFrm = this.fb.group({
      'book_id': [null,Validators.compose([Validators.required])],
      'book_name':[null,Validators.compose([Validators.required, Validators.minLength(3) ])],
      'description':[null],
      'author':[null, Validators.compose([Validators.required, Validators.minLength(3) ])],
      'publication':[null],
      'price':[0],
      // 'status':[true],
    });
  }


  addbook(book: Book){
    console.log(book);
    book.status=true;
    var subscribe = this._bookService.insertbook(book)
      .subscribe(() =>{
        this.router.navigateByUrl('/books');
      });
  }
}
