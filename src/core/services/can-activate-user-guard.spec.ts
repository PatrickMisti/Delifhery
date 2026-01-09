import { TestBed } from '@angular/core/testing';

import { authGuard } from './can-activate-user-guard.service';
import {CanActivateFn} from '@angular/router';

describe('CanActivateUserGuard', () => {
  let service: CanActivateFn;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(authGuard);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
