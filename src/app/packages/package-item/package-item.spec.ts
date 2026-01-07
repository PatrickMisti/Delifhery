import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackageItem } from './package-item';

describe('PackageItem', () => {
  let component: PackageItem;
  let fixture: ComponentFixture<PackageItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PackageItem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PackageItem);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
