import { MatDialog } from "@angular/material/dialog";
import { ConfirmComponent } from "../shared-components/confirm/confirm.component";
import { IBook } from "../interfaces/book";
import { BookDetailsComponent } from "../components/book-details/book-details.component";
import { Injectable } from "@angular/core";
import { BookAddEditComponent } from "../components/book-add-edit/book-add-edit.component";

@Injectable({
    providedIn:'root'
})

export class DialogService {
    isEditRequest: boolean = false;
    constructor(
      public dialog: MatDialog,
    ) {}
  
    openConfirmDialog(dialogMessage: string) {
      return this.dialog.open(ConfirmComponent, {
        width: '450px',
        disableClose: true,
        panelClass: 'custom-dialog-container',
        position: { top: '170px' },
        data: {
          message: dialogMessage,
        },
      });
    }

    openBookDialog(): void {
        const dialogRef = this.dialog.open(BookAddEditComponent, {
          width: '700px'
        });
      
        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            console.log('The dialog was closed with the following data:', result);
          }
        });
      }
  
    openDetails(productDetails: IBook) {
      return this.dialog.open(BookDetailsComponent, {
        width: '56%',
        disableClose: true,
        panelClass: 'custom-dialog-container',
        data: {
          details: productDetails,
        },
      });
    }
}