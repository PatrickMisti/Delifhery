import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CalcPricePackageDto} from './dto/calc-price-package-dto';


@Injectable({
  providedIn: 'root',
})
export class PackageService {
  private _http = inject(HttpClient);

  calculatePackageCost(item: CalcPricePackageDto) {
    return this._http.post<number>('/api/price', item);
  }
}
