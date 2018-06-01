import { Component, OnInit } from "@angular/core";

//for covalent table imports
import { ITdDataTableColumn } from "@covalent/core/data-table";
import { TdDialogService } from "@covalent/core/dialogs";

import { Book } from "../book";
import { BookService } from "../book.service";

@Component({
  selector: "app-admin-section",
  templateUrl: "./admin-section.component.html",
  styleUrls: ["./admin-section.component.css"]
})
export class AdminSectionComponent implements OnInit {
  columns: ITdDataTableColumn[] = [
    { name: "book_id", label: "Book Id", width: 70 },
    { name: "book_name", label: "Book Name", width: 300 },
    { name: "description", label: "Description", width: 300 },
    { name: "author", label: "Author", width: 200 },
    { name: "publication", label: "Publication" },
    { name: "price", label: "Price" },
    { name: "status", label: "Status", width: 150 }
  ];

  books: Array<Book>;

  constructor(
    private _dialogService: TdDialogService,
    private _bookService: BookService
  ) {}

  openPrompt(row: any, name: string): void {
    this._dialogService
      .openPrompt({
        message: "Enter comment?",
        value: row[name]
      })
      .afterClosed()
      .subscribe((value: any) => {
        if (value !== undefined) {
          row[name] = value;
        }
      });
  }

  ngOnInit() {
    this._bookService.cast.subscribe(data => (this.books = data));
  }
}
