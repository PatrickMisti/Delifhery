import {MatDialog} from '@angular/material/dialog';
import {inject, Injectable} from '@angular/core';
import {ComponentType} from '@angular/cdk/portal';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class OpenDialogWidget {

  readonly _dialog = inject(MatDialog);

  openDialog<T,D = DialogMessage, R = DialogMessageResponse>(type: ComponentType<T>, data?: D): Observable<R | undefined> {
    const dialogRef = this._dialog.open<T,D,R>(type,{
      data: data
    });

    return dialogRef.afterClosed();
  }
}

export interface DialogMessage {}

export interface DialogMessageResponse {}
