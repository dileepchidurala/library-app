import { Component, OnInit } from '@angular/core';

import { ITdDataTableColumn } from '@covalent/core/data-table';
import { TdDialogService } from '@covalent/core/dialogs';

import{ Book } from '../book';

//service
import { BookService } from '../book.service';

// const DECIMAL_FORMAT: (v: any) => any = (v: number) => v.toFixed(2);

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
 export class BooksComponent implements OnInit {
  columns: ITdDataTableColumn[] = [
    { name: 'book_id',  label: 'Book Id' },
    { name: 'book_name', label: 'Book Name' },
    { name: 'description', label: 'Description' },
    { name: 'author', label: 'Author' },
    { name: 'publication', label: 'Publication' },
    {name:'price',label:'Price'},
    {name:'status',label:'Status'},
  ];

  books: Array<Book> ;

  constructor(private _dialogService: TdDialogService , private _bookService: BookService) { }

  ngOnInit() {
    this._bookService.getAllBooks()
      .subscribe(res => {
        this.books = res;
      });
  }
  
  openPrompt(row: any, name: string): void {
    this._dialogService.openPrompt({
      message: 'Do you want Reserve this book',
      value: row[name],
    }).afterClosed().subscribe((value: any) => {
      if (value !== undefined) {
        row[name] = value;
      }
    });
  }

}
