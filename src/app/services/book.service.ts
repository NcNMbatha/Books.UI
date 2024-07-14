import { HttpClient } from "@angular/common/http";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Observable, catchError, map, throwError } from "rxjs";
import { IBook } from "../interfaces/book";
import { environment } from "../../environments/environment";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn:'root'
    })
    
export class BookService { 
    bookForm: FormGroup = new FormGroup({});

    private getAllBooks = '';
    private deleteBookUrl = '';
    private addBookUrl = '';
    private updateBookUrl = '';
    private getBookByIdUrl = '';

    constructor(private httpClient: HttpClient) {}

    getBooks(): Observable<IBook[]> {
        return this.httpClient.get<IBook[]>(`${environment.apiBaseUrl}/${this.getAllBooks}`).pipe(
          map((response: IBook[]) => {
            return response;
          }),
          catchError(error => {
            console.error('Error fetching books:', error);
            return throwError(error);
          })
        );
      }
    
      deleteBook(Id: number): Observable<any> {
        return this.httpClient.delete(`${environment.apiBaseUrl}/${this.deleteBookUrl}${Id}`).pipe(
          map(response => {
            return response;
          }),
          catchError(error => {
            console.error('Error deleting book:', error);
            return throwError(error);
          })
        );
      }
    
      updateProduct(book: IBook): Observable<IBook> {
        return this.httpClient.put<IBook>(`${environment.apiBaseUrl}/${this.updateBookUrl}`, book).pipe(
          map(response => {
            return response;
          }),
          catchError(error => {
            console.error('Error updating book:', error);
            return throwError(error);
          })
        );
      }
    
      addBook(book: IBook): Observable<any> {
        return this.httpClient.post<any>(`${environment.apiBaseUrl}/${this.addBookUrl}`, book).pipe(
          map(response => {
            return response;
          }),
          catchError(error => {
            console.error('Error adding book:', error);
            return throwError(error);
          })
        );
      }
    
      getBookById(Id: number): Observable<IBook> {
        return this.httpClient.get<IBook>(`${environment.apiBaseUrl}/${this.getBookByIdUrl}/${Id}`).pipe(
          map(response => {
            return response;
          }),
          catchError(error => {
            console.error('Error fetching book by ID:', error);
            return throwError(error);
          })
        );
      }

    clearForm() {
    this.bookForm.setValue({
        Title: '',
        Author: '',
        PublicationDate: '',
        ISBN: '',
        Genre: '',
        ShortDescription: '',
        Price: '',
    });
    }

    resetProductForm() {
    this.bookForm.reset();
    }

    productFormInitialize(): FormGroup {
    this.bookForm = new FormGroup({
        Title: new FormControl('', Validators.required),
        Author: new FormControl('', Validators.required),
        PublicationDate: new FormControl('', Validators.required),
        ISBN: new FormControl(''),
        Genre: new FormControl('', Validators.required),
        ShortDescription: new FormControl('', Validators.required),
        Price: new FormControl('', Validators.required),
    });

    return this.bookForm;
    }
    }