import {Component, inject} from '@angular/core';
import {MATERIAL_BASICS, MATERIAL_FORM} from '../../material-import';
import {DataDialog, ShipmentDialog} from './open-dialog.widget';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {GeneralDialogWidget} from './general-dialog.widget';

@Component({
  selector: 'app-add-package-dialog',
  standalone: true,
  imports: [
    ...MATERIAL_BASICS,
    ...MATERIAL_FORM
  ],
  template: `
    <mat-card class="p-16">
      <mat-card-title>{{ data.title }}</mat-card-title>

      <mat-card-content>
        <div layout="column" layout-align="center start" class="gap-16">
          <span class="font-medium-small">{{ data.message }}</span>

          <div layout="row" layout-align="start start" class="gap-10">
            <img [src]="qrcodeSrc" alt="QR Code" class="qr-image" flex/>

            <table>
              <tr>
                <td>
                  <mat-label>Prize:</mat-label>
                </td>
                <td><span>{{ data.price }}€</span></td>
              </tr>
              <tr>
                <td>
                  <mat-label flex="30">Tracking:</mat-label>
                </td>
                <td><span>{{ data.trackingNumber }}</span></td>
              </tr>
            </table>
          </div>
        </div>
      </mat-card-content>
      <mat-card-actions layout-align="end center">
        <button mat-button (click)="closeCancel()">Zurück</button>
        <button mat-button color="primary" (click)="closeOk()">Zahlen</button>
      </mat-card-actions>
    </mat-card>
  `
})
export class AddPackageDialogWidget {
  protected data = inject<ShipmentDialog>(MAT_DIALOG_DATA);
  private dialogRef = inject(MatDialogRef<GeneralDialogWidget>);

  get qrcodeSrc(): string {
    return `data:image/png;base64,${this.data.qrCodeData}`;
  }
  closeCancel(): void {
    this.dialogRef.close(false);
  }

  closeOk(): void {
    this.dialogRef.close(true);
  }
}
