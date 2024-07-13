import { Component } from '@angular/core';
import { BookComponent } from '../book/book.component';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [BookComponent],
  templateUrl: './books.component.html',
  styleUrl: './books.component.scss'
})
export class BooksComponent {

}
