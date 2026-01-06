import {Component, inject, OnDestroy, ViewChild} from '@angular/core';
import {MATERIAL_BASICS, MATERIAL_FORM, MATERIAL_STEPPER} from '../../material-import';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {UserService} from '../../core/services/user.service';
import {Disposabled} from '../../core/utilities/disposabled';
import {User} from '../../core/models/user';
import {MatSuffix} from '@angular/material/input';
import {MatStepper} from '@angular/material/stepper';

type AddressForm = {
  street: FormControl<string | null>;
  household: FormControl<string | null>;
  city: FormControl<string | null>;
  state: FormControl<string | null>;
  zip: FormControl<string | null>;
};

type OriginAddressForm = {
  useUserAddressOrigin: FormControl<boolean | null>;
  address: FormGroup<AddressForm>;
}

type PackageForm = {
  width: FormControl<number | null>;
  height: FormControl<number | null>;
  length: FormControl<number | null>;
  weight: FormControl<number | null>;
}

type CalcFrom = {
  addressDestination: FormGroup<AddressForm>;
  addressOrigin: FormGroup<OriginAddressForm>;
  package: FormGroup<PackageForm>;
}

@Component({
  selector: 'app-calculator',
  standalone: true,
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {displayDefaultIndicatorType: false}
    }
  ],
  imports: [
    ...MATERIAL_STEPPER,
    ...MATERIAL_BASICS,
    ...MATERIAL_FORM,
    ReactiveFormsModule,
    MatSuffix
  ],
  templateUrl: './calculator.html',
})
export class Calculator extends Disposabled implements OnDestroy {
  private _snackBar = inject(MatSnackBar);
  @ViewChild('stepper') stepper!: MatStepper;

  form: FormGroup<CalcFrom>;
  useOwnAddressOrigin: FormControl<boolean | null>;
  ownAddressOrigin: FormGroup<AddressForm>;
  addressDest: FormGroup<AddressForm>;
  packageForm: FormGroup<PackageForm>;

  private _userService = inject(UserService);

  constructor(private fb: FormBuilder) {
    super();

    this.useOwnAddressOrigin = new FormControl({value: false, disabled: true});
    this.ownAddressOrigin = this.fb.group({
      street: ['', Validators.required],
      household: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zip: ['', Validators.required],
    });

    this.addressDest = this.fb.group({
      street: ['', Validators.required],
      household: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zip: ['', Validators.required],
    });

    this.packageForm = this.fb.group({
      width: this.fb.control<number | null>(null, {validators: [Validators.required, Validators.min(0)]}),
      height: this.fb.control<number | null>(null, {validators: [Validators.required, Validators.min(0)]}),
      length: this.fb.control<number | null>(null, {validators: [Validators.required, Validators.min(0)]}),
      weight: this.fb.control<number | null>(null, {validators: [Validators.required, Validators.min(0)]}),
    })


    this.form = this.fb.group({
      addressDestination: this.addressDest,
      addressOrigin: this.fb.group({
        useUserAddressOrigin: this.useOwnAddressOrigin,
        address: this.ownAddressOrigin,
      }),
      package: this.packageForm,
    });

    this.subSink = this._userService.isCurrentUser$()
      .subscribe(value => {
        this.checkUserAddressOrigin(value);
      });
  }

  checkUserAddressOrigin(user: User | null) {
    if (!user) {
      this.useOwnAddressOrigin.disable();
      return;
    }
    const userAddress = user.address;
    if (userAddress.street && userAddress.country && userAddress.city &&
      userAddress.houseNumber && userAddress.postalCode) {
      this.useOwnAddressOrigin.enable();
    }
  }

  useOwnAddress() {
    if (this.useOwnAddressOrigin.enabled && this.useOwnAddressOrigin.value) {
      this.ownAddressOrigin.disable();
      return;
    }
    this.ownAddressOrigin.enable();
  }

  calculatePrice() {
    if (this.form.invalid) {
      this._snackBar.open("Error some fields not set correctly", "Close");
      return;
    }

    this.resetForm();
  }

  resetForm() {
    this.form.reset();
    this.form.markAsPristine();
    this.stepper.reset();
  }

  ngOnDestroy(): void {
    this.resetForm();
    this.dispose();
  }
}
