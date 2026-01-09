import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import UserService from '../../../core/services/user.service';
import {MATERIAL_BASICS, MATERIAL_FORM} from '../../../material-import';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {User} from '../../../core/models/user';
import {Disposabled} from '../../../core/utilities/disposabled';
import {MatDialogRef} from '@angular/material/dialog';
import {Address} from '../../../core/models/address';
import {MatSnackBar} from '@angular/material/snack-bar';


type AddressForm = {
  street: FormControl<string | null>;
  household: FormControl<string | null>;
  city: FormControl<string | null>;
  state: FormControl<string | null>;
  zip: FormControl<string | null>;
};

type UserForm = {
  userName: FormControl<string | null>;
  email: FormControl<string | null>;
  telephone: FormControl<string | null>;
  address: FormGroup<AddressForm>;
};

@Component({
  selector: 'app-user-site',
  imports: [
    ...MATERIAL_FORM,
    ...MATERIAL_BASICS,
    ReactiveFormsModule
  ],
  templateUrl: './user-site.html',
})
export class UserSite extends Disposabled implements OnDestroy,OnInit {
  private _dialogRef = inject(MatDialogRef<UserSite>);
  private _snackBar = inject(MatSnackBar);

  private _userService = inject(UserService);
  protected userFormGroup: FormGroup<UserForm>;

  constructor() {
    super();
    this.userFormGroup = new FormGroup({
      userName: new FormControl({value: "", disabled: true}),
      email: new FormControl({value: "", disabled: true}),
      telephone: new FormControl(""),
      address: new FormGroup({
        street: new FormControl(""),
        household: new FormControl(""),
        city: new FormControl(""),
        state: new FormControl(""),
        zip: new FormControl("")
      })
    });
  }

  ngOnInit() {
    this.subSink = this._userService
      .isCurrentUser$()
      .subscribe(user => this.updateForm(user));

    if (this._userService.isCurrentUser$().value) {
      this.updateForm(this._userService.isCurrentUser$().value);
    }
  }

  updateForm(user: User | null): void {
    if (!user) {
      this._dialogRef.close();
      return;
    }

    this.userFormGroup.patchValue({
      userName: user.userName,
      email: user.email,
      telephone: user.phoneNumber,
      address: {
        street: user.address?.street,
        household: user.address?.houseNumber,
        city: user.address?.city,
        state: user.address?.country,
        zip: user.address?.postalCode
      }
    });
  }

  updateUser() {
    const currentUser = this._userService.isCurrentUser$().value;
    if (!currentUser) return;
    const formControl = this.userFormGroup.value;

    currentUser.phoneNumber = formControl.telephone || "";
    currentUser.address = new Address(
      currentUser.address.addressId,
      formControl.address?.street || "",
      formControl.address?.household || "",
      formControl.address?.zip?.toString() || "",
      formControl.address?.city || "",
      formControl.address?.state || "");

    this.subSink = this._userService.updateUser(currentUser).subscribe({
      next: () => this.notifyUiUpdate("User updated successfully."),
      error: (_) => this.notifyUiUpdate("User updated failed."),
    });
  }

  notifyUiUpdate(msg: string): void {
    this._snackBar.open(msg, 'Close');
    this._dialogRef.close();
  }

  cancel(): void {
    this._dialogRef.close();
  }

  ngOnDestroy(): void {
    this.dispose();
  }
}
