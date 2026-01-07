import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Shipment} from '../models/shipment';
import {catchError, Observable, of, switchMap} from "rxjs";
import {UpdateShipReceiverDto} from './dto/update-ship-receiver-dto';
import UserService from './user.service';
import {ShipmentCreateDto} from './dto/shipment-create-dto';
import {ResponsePackageReceiveDto} from './dto/response-package-receive-dto';
import {GetAllShipmentsDto} from './dto/get-all-shipments-dto';

@Injectable({
  providedIn: 'root',
})
export class ShipmentService {
  private _http = inject(HttpClient);
  private _userService = inject(UserService);

  checkTrackingNumber(trackingNumber: string) :  Observable<boolean> {
    return this._http.get(`/api/shipment/track/${trackingNumber}`, {observe: 'response'}).pipe(
      switchMap(response => of(response.status <= 400)),
      catchError((err: HttpErrorResponse) => {
        if (err.status <= 400) {
          return of(true);
        } else {
          console.error('Error fetching shipment:', err);
          return of(false);
        }
      })
    );
  }

  addTrackingNumberToReceiver(trackingNumber: string) : Observable<boolean> {
    const currentUser = this._userService.isCurrentUser$()?.value;
    if (!currentUser) return of(false);

    const updateDto: UpdateShipReceiverDto = {
      receiverId: currentUser.userId,
      trackingNumber: trackingNumber
    };

    return this._http.put('/api/shipment/receiver', updateDto, {observe: 'response'}).pipe(
      switchMap(response => of(response.status >= 200 && response.status < 300)),
      catchError(err => {
        console.error('Error updating shipment receiver:', err);
        return of(false);
      })
    );
  }

  createShipment(shipmentData: ShipmentCreateDto) {
    return this._http.post<ResponsePackageReceiveDto>('/api/shipment/external', shipmentData)
      .pipe(
        catchError(err => {
          console.error('Error creating shipment:', err);
          return of(null);
        })
      );
  }

  getAllShipments(userId: number) {
    return this._http.get<GetAllShipmentsDto>(`/api/shipment/user/${userId}`)
      .pipe(
        catchError(err => {
          console.error('Error fetching shipments:', err);
          return of(new GetAllShipmentsDto([],[]));
        })
      )
  }
}
