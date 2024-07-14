import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import {MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ListingComponent } from '../../shared-components/listing/listing.component';
import { BookService } from '../../services/book.service';
import { DialogService } from '../../services/dialog.service';
import { MatPaginator } from '@angular/material/paginator';
import { IBook } from '../../interfaces/book';
import { MatTableDataSource } from '@angular/material/table';
import { NotificationService } from '../../services/notification.service';
import { SpinerService } from '../../services/spiner.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule, 
            MatToolbarModule,
            MatIconModule,
            ListingComponent,
            MatProgressSpinnerModule],
  providers:[BookService,
             DialogService,
             NotificationService,
             SpinerService,
             HttpClient
  ],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.scss'
})
export class BookListComponent implements OnInit{

  books: IBook[] = [];
  bookDataSource: MatTableDataSource<any> = new MatTableDataSource([] as IBook[]);
  displayedColumns: any;
  searchState: boolean = false;
  spinner$ = this.spinerService.spinning$;
  spinerVisible: boolean = true;
  columns = [
    {
      columnDef: 'Id',
      header: 'ID',
      cell: (element: IBook) => `${element.Id}`,
    },
    {
      columnDef: 'Title',
      header: 'Title',
      cell: (element: IBook) => `${element.Title}`,
    },
    {
      columnDef: 'Author',
      header: 'Author',
      cell: (element: IBook) => `${element.Author}`,
    },
    {
      columnDef: 'Genre',
      header: 'Genre',
      cell: (element: IBook) => `${element.Genre}`,
    },
    {
      columnDef: 'ISBN',
      header: 'ISBN',
      cell: (element: IBook) => `${element.ISBN}`,
    },
    {
      columnDef: 'Price',
      header: 'Price',
      cell: (element: IBook) => `${element.Price}`,
    },
    {
      columnDef: 'PublicationDate',
      header: 'Publication Date',
      cell: (element: IBook) => `${element.PublicationDate}`,
    },
    {
      columnDef: 'ShortDescription',
      header: 'Short Description',
      cell: (element: IBook) => `${element.ShortDescription}`,
    },
    {
      columnDef: 'Actions',
      header: 'Actions',
      cell: (element: IBook) => '',
    },
  ];

  @ViewChild('paginator')paginator!: MatPaginator;

  productActions: string[] = ['details', 'edit', 'delete'];
  totalRows: number = 0;
  pageSize: number = 10;
  currentPage: number = 1;
  pageSizeOptions: number[] = [5, 10, 25, 100];

constructor(private bookService: BookService, 
            private dialogService: DialogService,
            private notificationService: NotificationService,
            private spinerService: SpinerService) {}

ngOnInit(): void {}

    addBook(): void {
    var book = null;
    const dialogRef = this.dialogService.openProductCapture(book, false);
    dialogRef.afterClosed().subscribe((response) => {
      if (response) {
        this.loadBooks();
      }
    });
  }

  
  ngAfterViewInit(): void {
    this.paging();
  }

  loadBooks(pageClick = false) {
    this.bookService
      .getBooks().subscribe((result) => {
        this.displayedColumns = this.columns.map((c) => c.columnDef);
        this.books = result;
        this.bookDataSource = new MatTableDataSource(result);
        if (!pageClick) {
          this.paging();
        }
      });
  }

  paging() {
    this.bookDataSource.paginator = this.paginator;
  }

  deleteBook(book: IBook) {
    const deleteMessage = `Are you sure you want to delete product : \n ${book.Title}`;
    const dialogRef = this.dialogService.openConfirmDialog(deleteMessage);

    dialogRef.afterClosed().subscribe((response) => {
      if (response) {
        let deletedResult = this.bookService.deleteBook(book.Id);
        deletedResult.subscribe((deleted) => {
          if (deleted) {
            this.loadBooks();
            this.notificationService.warn(
              `${book.Title}: has been deleted!`
            );
          } else {
            this.notificationService.warn(
              `${book.Title}: Delele operation failed!`
            );
          }
        });
      }
    });
  }

  updateBook(product: IBook) {
    const dialogRef = this.dialogService.openProductCapture(product, true);
    dialogRef.afterClosed().subscribe((response) => {
      if (response) {
        this.loadBooks(true);
      }
    });
  }

  bookDetails(product: IBook) {
    this.dialogService.openDetails(product);
  }
}
