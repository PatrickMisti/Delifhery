import {Component, inject, Injectable, Injector} from '@angular/core';
import {Overlay, OverlayRef} from '@angular/cdk/overlay';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {ComponentPortal} from '@angular/cdk/portal';


@Injectable({
  providedIn: 'root'
})
export class LoadingWidget {
  private _overlayRef?: OverlayRef;
  private _overlay = inject(Overlay);
  private _injector = inject(Injector);

  private _isLoading = false;


  loading(): void {
    if (this._isLoading) return;

    this._isLoading = true;
    this._overlayRef = this._buildOverlayRef();
    const loadingPortal = new ComponentPortal(LoadingWidgetComponent, null, this._injector);
    this._overlayRef.attach(loadingPortal);
  }

  end(): void {
    if (!this._isLoading) return;

    this._isLoading = false;
    this._overlayRef?.detach();
    this._overlayRef?.dispose();
    this._overlayRef = undefined;
  }

  private _buildOverlayRef(): OverlayRef {
    return this._overlay.create({
      hasBackdrop: true,
      // backdropClass: 'overlay-backdrop',
      positionStrategy: this._overlay.position().global().centerVertically().centerHorizontally(),
      scrollStrategy: this._overlay.scrollStrategies.block()
    });
  }
}


@Component({
  selector: 'app-loading-widget',
  imports: [MatProgressSpinner],
  template: `
    <div>
      <mat-spinner></mat-spinner>
    </div>
  `,
  styles: [`
    .loading-widget {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100px;
      width: 100px;
    }
  `]
})
class LoadingWidgetComponent {}
