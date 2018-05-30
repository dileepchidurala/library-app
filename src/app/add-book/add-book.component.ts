import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from "@angular/forms";

import { BookService } from "../book.service";
import { Book } from "../book";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-add-book",
  templateUrl: "./add-book.component.html",
  styleUrls: ["./add-book.component.css"]
})
export class AddBookComponent implements OnInit {
  book: Book;
  bookFrm: FormGroup;

  constructor(
    private _bookService: BookService,
    private router: Router,
    private aR: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.bookFrm = this.fb.group({
      book_id: [
        ,
        Validators.compose([Validators.required, Validators.pattern("[0-9]*")])
      ],
      book_name: [
        ,
        Validators.compose([
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(4)
        ])
      ],
      description: [null],
      author: [
        ,
        Validators.compose([Validators.required, Validators.minLength(3)])
      ],
      publication: [, Validators.compose([Validators.required])],
      price: [0, Validators.compose([Validators.pattern("[0-9]*")])]
      // 'status':[true],
    });
  }

  addbook(book: Book) {
    book.status = 1;
    var subscribe = this._bookService.insertbook(book).subscribe(() => {
      this.router.navigateByUrl("/books");
    });
  }
}
