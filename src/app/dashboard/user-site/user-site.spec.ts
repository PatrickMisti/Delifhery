import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSite } from './user-site';

describe('UserSite', () => {
  let component: UserSite;
  let fixture: ComponentFixture<UserSite>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserSite]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserSite);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
