import {Component, inject, OnDestroy} from '@angular/core';
import {MATERIAL_BASICS, MATERIAL_FORM} from '../../material-import';
import {LoadingWidget} from '../utilities/loading.widget';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatSuffix} from '@angular/material/input';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ShipmentService} from '../../core/services/shipment.service';
import {Disposabled} from '../../core/utilities/disposabled';
import {DataDialog, OpenDialogWidget, ShipmentDialog} from '../utilities/open-dialog.widget';
import {MatDivider} from '@angular/material/list';
import {ShipmentCreateDto} from '../../core/services/dto/shipment-create-dto';
import UserService from '../../core/services/user.service';
import {GetShipmentBillDto} from '../../core/services/dto/create-shipment-bill-dto';

type AddressForm = {
  street: FormControl<string | null>;
  household: FormControl<string | null>;
  city: FormControl<string | null>;
  state: FormControl<string | null>;
  zip: FormControl<string | null>;
};

type PackageForm = {
  width: FormControl<number | null>;
  height: FormControl<number | null>;
  length: FormControl<number | null>;
  weight: FormControl<number | null>;
}

type ShipmentForm = {
  notification: FormControl<boolean | null>;
  receiverAddress: FormGroup<AddressForm>;
  receiverName: FormControl<string | null>;
  packageForm: FormGroup<PackageForm>;
};

@Component({
  selector: 'app-add-package',
  imports: [
    ...MATERIAL_FORM,
    ...MATERIAL_BASICS,
    ReactiveFormsModule,
    MatSuffix,
    MatDivider
  ],
  templateUrl: './add-package.html',
  styles: ``,
})
export class AddPackage extends Disposabled implements OnDestroy {
  private _loading = inject(LoadingWidget);
  private _snackbar = inject(MatSnackBar);
  private _dialog = inject(OpenDialogWidget)

  findByTrackingNumber: FormControl = new FormControl<string>('');
  form: FormGroup<ShipmentForm>;

  private _shipmentService = inject(ShipmentService);
  private _userService = inject(UserService);
  protected isLoggedIn = false;


  constructor(private fb: FormBuilder) {
    super();

    this.form = new FormGroup<ShipmentForm>({
      notification: new FormControl<boolean>(false),
      receiverName: this.fb.control('', [Validators.required]),
      receiverAddress: new FormGroup<AddressForm>({
        street: this.fb.control('', [Validators.required]),
        household: this.fb.control('', [Validators.required]),
        city: this.fb.control('', [Validators.required]),
        state: this.fb.control('', [Validators.required]),
        zip: this.fb.control('', [Validators.required]),
      }),
      packageForm: new FormGroup<PackageForm>({
        width: this.fb.control(null, [Validators.required, Validators.min(0), Validators.max(100)]),
        height: this.fb.control(null, [Validators.required, Validators.min(0), Validators.max(100)]),
        length: this.fb.control(null, [Validators.required, Validators.min(0), Validators.max(100)]),
        weight: this.fb.control(null, [Validators.required, Validators.min(0), Validators.max(30)])
      })
    });

    this.subSink = this._userService.isCurrentUser$()
      .subscribe(user => this.isLoggedIn = !!user);

    if (this._userService.isCurrentUser$().value) {
      this.isLoggedIn = true;
    }
  }


  protected addPackageByTrackingNumber() {
    const trackingNumber = this.findByTrackingNumber.value?.trim();
    if (!trackingNumber) {
      this._snackbar.open('Please enter a valid tracking number.', 'Close', {duration: 3000});
      return;
    }

    this._loading.loading();
    this.subSink = this._shipmentService
      .checkTrackingNumber(trackingNumber)
      .subscribe(isAdded => {
        this._loading.end();
        if (!isAdded) {
          this._snackbar.open("No package found with the provided tracking number.", 'Close', {duration: 3000});
          return;
        }

        //todo open dialog with shipment detials if not logged in
        if(!this.isLoggedIn) {
          return;
        }
        this._dialog.openResultDialog<DataDialog, boolean>({
          title: 'Paket gefunden',
          message: 'Möchten Sie dieses Paket zu Ihrem Konto hinzufügen?'
        }).subscribe(result => this._updateShipmentToReceiver(trackingNumber, result!));
      });
  }

  private _updateShipmentToReceiver(trackingNumber: string, result: boolean | undefined) {
    if (result === false || !this.isLoggedIn) {
      return;
    }

    this._loading.loading();
    this.subSink = this._shipmentService
      .addTrackingNumberToReceiver(trackingNumber)
      .subscribe(isSuccess => {
        this._loading.end();
        if (isSuccess) {
          this._snackbar.open('Paket erfolgreich zu Ihrem Konto hinzugefügt.', 'Close', {duration: 3000});
          this.findByTrackingNumber.reset();
        } else {
          this._snackbar.open('Fehler beim Hinzufügen des Pakets zu Ihrem Konto.', 'Close', {duration: 3000});
        }
      });
  }


  reset() {
    this.form.reset();
    this.form.markAsPristine();
  }

  addPackage() {
    if (!this.isLoggedIn) return;

    this._loading.loading();
    const currentForm = this.form.value;
    console.log('Add package with data:', currentForm);
    const recAddress = currentForm.receiverAddress;
    const packageRes = currentForm.packageForm;
    const notify = currentForm.notification;
    const receiverName = currentForm.receiverName;

    if (!recAddress || !packageRes || !receiverName) {
      this._snackbar.open('Please fill in all required fields.', 'Close', {duration: 3000});
      this._loading.end();
      return;
    }

    const shipmentData: ShipmentCreateDto = {
      receiverName: currentForm.receiverName || '',
      receiverAddress: {
        addressId: 0,
        street: recAddress.street || '',
        houseNumber: recAddress.household || '',
        city: recAddress.city || '',
        country: recAddress.state || '',
        postalCode: recAddress.zip?.toString() || '',
      },
      lengthCm: packageRes.length || 0,
      weightKg: packageRes.weight || 0,
      widthCm: packageRes.width || 0,
      heightCm: packageRes.height || 0,
      senderId: this._userService.isCurrentUser$().value!.userId,
      redirectUrl: window.location.origin + window.location.pathname,
      notification: notify || false,
    };

    this._loading.loading();
    this.subSink = this._shipmentService
      .createShipmentBillResponse(shipmentData).subscribe(value => {
        this._loading.end();
        if (!value) {
          this._snackbar.open('Error creating shipment. Please try again.', 'Close', {duration: 3000});
          return;
        }
        this._createBill(value.res, value.id);
        this.reset();
      });
  }

  private _createBill(bill: GetShipmentBillDto, shipmentId: number) {
    this._dialog.openShipmentDialog<ShipmentDialog, boolean>({
      title: 'Paket bezahlen',
      message: "Das Paket wurde erfolgreich erstellt.",
      shipmentId: shipmentId,
      qrCodeData: bill.qrCode,
      price: bill.price,
      trackingNumber: bill.trackingId
    })
      .subscribe(pay => {
        if (!pay) return;

        this._shipmentService.createPayment({
          shipmentId: shipmentId,
          redirectUrl: window.location.origin + window.location.pathname,
        }).subscribe(result => {
          if (!result) {
            this._snackbar.open('Fehler beim Erstellen der Zahlung. Bitte versuchen Sie es erneut.', 'Close', {duration: 3000});
            return;
          }

          window.location.href = result.paymentUrl;
        })
      })
  }

  ngOnDestroy(): void {
    this._loading.end();
    this.dispose();
  }
}
