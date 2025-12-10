import { Component } from '@angular/core';
import {MATERIAL_BASICS, MATERIAL_FORM, MATERIAL_STEPPER} from '../../material-import';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'app-calculator',
  standalone: true,
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false }
    }
  ],
  imports: [
    ...MATERIAL_STEPPER,
    ...MATERIAL_BASICS,
    ...MATERIAL_FORM,
    ReactiveFormsModule
  ],
  templateUrl: './calculator.html',
})
export class Calculator {

  addressForm: FormGroup;
  packageForm: FormGroup;
  confirmForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.addressForm = this.fb.group({
      senderAddress: ['', Validators.required],
      receiverAddress: ['', Validators.required]
    });

    this.packageForm = this.fb.group({
      width: ['', Validators.required],
      height: ['', Validators.required],
      length: ['', Validators.required],
      weight: ['', Validators.required],
    });

    this.confirmForm = this.fb.group({
      accept: [false, Validators.requiredTrue]
    });
  }
}
