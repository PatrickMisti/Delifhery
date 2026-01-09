import {Component, inject} from '@angular/core';
import {MATERIAL_BASICS, MATERIAL_FORM} from '../../material-import';
import {DataDialog, ShowShipmentOrPayment} from './open-dialog.widget';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';


@Component({
  selector: 'app-general-dialog',
  standalone: true,
  imports: [
    ...MATERIAL_BASICS,
    ...MATERIAL_FORM
  ],
  template: `
    <mat-card class="p-16">
      <mat-card-title>{{data.title}}</mat-card-title>

      <mat-card-content>{{data.message}}</mat-card-content>
      <mat-card-actions>
        <button mat-button color="primary" (click)="closeDialog()">OK</button>
      </mat-card-actions>
    </mat-card>
  `
})
export class GeneralDialogWidget {
  protected data = inject<DataDialog>(MAT_DIALOG_DATA);
  private dialogRef = inject(MatDialogRef<GeneralDialogWidget>);

  closeDialog(): void {
    this.dialogRef.close();
  }
}


@Component({
  selector: 'app-ok-cancel-dialog',
  standalone: true,
  imports: [
    ...MATERIAL_BASICS,
    ...MATERIAL_FORM
  ],
  template: `
    <mat-card>
      <mat-card-header>{{data.title}}</mat-card-header>

      <mat-card-content>{{data.message}}</mat-card-content>
      <mat-card-actions>
        <button mat-button (click)="closeCancel()">Zurück</button>
        <button mat-button (click)="closeAndOpenInfo()">Info</button>
        <button mat-button color="primary" (click)="closeOk()">OK</button>
      </mat-card-actions>
    </mat-card>
  `
})
export class ResultDialogWidget {
  protected data = inject<DataDialog>(MAT_DIALOG_DATA);
  private dialogRef = inject(MatDialogRef<GeneralDialogWidget>);

  closeCancel(): void {
    this.dialogRef.close(ShowShipmentOrPayment.NOTHING);
  }

  closeAndOpenInfo(): void {
    this.dialogRef.close(ShowShipmentOrPayment.SHOW_SHIPMENT);
  }

  closeOk(): void {
    this.dialogRef.close(ShowShipmentOrPayment.SHOW_PAYMENT);
  }
}
