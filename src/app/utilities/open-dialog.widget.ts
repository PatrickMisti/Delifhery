import {MatDialog} from '@angular/material/dialog';
import {inject, Injectable} from '@angular/core';
import {ComponentType} from '@angular/cdk/portal';
import {Observable} from 'rxjs';
import {GeneralDialogWidget} from './general-dialog.widget';


@Injectable({
  providedIn: 'root',
})
export class OpenDialogWidget {

  private readonly _dialog = inject(MatDialog);

  openDialog<T,D = DialogMessage, R = DialogMessageResponse>(type: ComponentType<T>, data?: D): Observable<R | undefined> {
    const dialogRef = this._dialog.open<T,D,R>(type,{
      data: data
    });

    return dialogRef.afterClosed();
  }

  openDefaultDialog<D = DialogMessage, R = DialogMessageResponse>(data?: D): Observable<R | undefined> {
    return this.openDialog(GeneralDialogWidget, data);
  }
}

export interface DialogMessage {}

export interface DialogMessageResponse {}

export class DataDialog implements DialogMessage  {
  public title: string;
  public message: string;

  constructor(title: string, message: string) {
    this.title = title;
    this.message = message;
  }
}
