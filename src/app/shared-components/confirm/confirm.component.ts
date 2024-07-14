import { Component, OnInit, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogClose } from '@angular/material/dialog';


@Component({
  selector: 'app-confirm',
  standalone: true,
  imports: [MatDialogClose],
  templateUrl: './confirm.component.html',
  styleUrl: './confirm.component.scss'
})
export class ConfirmComponent implements OnInit{
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialoref: MatDialogRef<ConfirmComponent>) { }

  ngOnInit(): void {
  }

  closeConfirmDialog(){
    this.dialoref.close(false);
  }
}
