import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [MatCardModule, 
            MatButtonModule],
  templateUrl: './book.component.html',
  styleUrl: './book.component.scss'
})
export class BookComponent {

}
