import { Component, OnInit } from '@angular/core';

import { ITdDataTableColumn, TdDataTableService, TdDataTableSortingOrder, ITdDataTableSortChangeEvent } from '@covalent/core/data-table';
import { TdDialogService } from '@covalent/core/dialogs';

//Angular material
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

//Dailog component
import{ DialogComponent } from '../dialog/dialog.component';

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
    { name: 'book_id',  label: 'Book Id', width:70 },
    { name: 'book_name', label: 'Book Name', width:300},
    { name: 'description', label: 'Description' ,width:300 },
    { name: 'author', label: 'Author' ,width:200},
    { name: 'publication', label: 'Publication' },
    {name:'price',label:'Price'},
    {name:'status',label:'Status'},
  ];

  books: Array<Book> = [];

  // columns: ITdDataTableColumn[] = [
  //   { name: 'first_name',  label: 'First Name', sortable: true, width: 150 },
  //   { name: 'last_name', label: 'Last Name', filter: true, sortable: false },
  //   { name: 'gender', label: 'Gender', hidden: false },
  //   { name: 'email', label: 'Email', sortable: true, width: 250 },
  //   { name: 'balance', label: 'Balance', numeric: true },
  // ];
  data: Array<any> = [] ;

  filteredData: any[] = this.data;
  filteredTotal: number = this.data.length;

  searchTerm: string = '';
  res:string;
  constructor(private dialog: MatDialog ,private _dataTableService: TdDataTableService , private _bookService: BookService) { }

  ngOnInit() {
    this.allbooks();
    this.filter();
  }

  search(searchTerm: string): void {
    this.searchTerm = searchTerm;
    this.filter();
  }

  showAlert(event: any): void {
    let row: any = event.row;
    // prompt("Are you sure you want to reserve this book");
    let dialogRef = this.dialog.open(DialogComponent, {
      width: '350px',
      data: {text:"Are you sure you want to reserve this book",status:event.row.status}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.res = result;
      if(this.res)
      {
        console.log('Mail will be sent for you to get the book'+event.row.id);
        this._bookService.reservationOfBook(event.row.id)
          .subscribe(res => {
            this.allbooks();
          });
      }
    });  
  }
  
  allbooks(){
    this._bookService.getAllBooks()
      .subscribe(res => {
        this.data = res;
        this.filter();
      });
  }

  avaliablebooks(){
    this._bookService.getAvaliableBooks()
      .subscribe(res => {
        this.data = res;
        this.filter();
      });
  }

  reservedbooks(){
    this._bookService.getReservedBooks()
      .subscribe(res=>{
        this.data=res;
        this.filter();
      });
  }

  filter(): void {
    let newData: any[] = this.data;
    newData.forEach(element => {
      if(element.status==1){
        element.status="Avaliable";
      }
      if(element.status==0)
      {
        element.status="Reserved";
      }
    });

    let excludedColumns: string[] = this.columns
    .filter((column: ITdDataTableColumn) => {
      return ((column.filter === undefined && column.hidden === true) ||
              (column.filter !== undefined && column.filter === false));
    }).map((column: ITdDataTableColumn) => {
      return column.name;
    });
    newData = this._dataTableService.filterData(newData, this.searchTerm, true, excludedColumns);
    this.filteredTotal = newData.length;
    this.filteredData = newData;
  }

}
