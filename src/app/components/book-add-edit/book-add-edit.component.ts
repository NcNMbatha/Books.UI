import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogActions } from '@angular/material/dialog';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { BookService } from '../../services/book.service';
import { MatButtonModule } from '@angular/material/button';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'app-book-add-edit',
  standalone: true,
  imports: [
            MatGridListModule, 
            ReactiveFormsModule, 
            FormsModule,
            MatLabel,
            MatError,
            MatFormField,
            MatButtonModule,
            MatInput
            ],
  templateUrl: './book-add-edit.component.html',
  styleUrl: './book-add-edit.component.scss'
})
export class BookAddEditComponent implements OnInit{
  bookForm: FormGroup;

  constructor(private bookService: BookService, private formBuilder: FormBuilder) {
       this.bookForm = this.formBuilder.group({
      id: ['', [Validators.required]],
      title: ['', [Validators.required]],
      author: ['', [Validators.required]],
      publicationDate: ['', [Validators.required]],
      isbn: ['', [Validators.required]],
      genre: ['', [Validators.required]],
      shortDescription: ['', [Validators.required]],
      price: ['', [Validators.required]]
    });
  }
 
  
  ngOnInit(): void {
  }

  onSubmit() {
    if (this.bookForm.valid) {
      console.log(this.bookForm.value);
    }
  }
  
}
