import { MatDialog } from "@angular/material/dialog";
import { ConfirmComponent } from "../shared-components/confirm/confirm.component";
import { IBook } from "../interfaces/book";
import { AddBookComponent } from "../components/add-book/add-book.component";
import { BookDetailsComponent } from "../components/book-details/book-details.component";
import { Injectable } from "@angular/core";

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
  
    openProductCapture(product: any, isEdit: boolean) {
      this.isEditRequest = isEdit;
      return this.dialog.open(AddBookComponent, {
        width: '58%',
        disableClose: true,
        panelClass: 'custom-dialog-container',
        data: {
          product: product,
          isEdit: this.isEditRequest,
        },
      });
    }
}