import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Shipment} from '../models/shipment';
import {catchError, map, Observable, of, switchMap} from "rxjs";
import {UpdateShipReceiverDto} from './dto/update-ship-receiver-dto';
import UserService from './user.service';
import {ShipmentCreateDto} from './dto/shipment-create-dto';
import {GetAllShipmentsDto} from './dto/get-all-shipments-dto';
import {
  CreatePaymentDto,
  CreateShipmentBillDto,
  GetPaymentUrlDto,
  GetShipmentBillDto
} from './dto/create-shipment-bill-dto';

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
    return this._http.post<Shipment>('/api/shipment', shipmentData)
      .pipe(
        catchError(err => {
          console.error('Error creating shipment:', err);
          return of(null);
        })
      );
  }

  createShipmentBill(bill: CreateShipmentBillDto){
    return this._http.put<GetShipmentBillDto>('/api/shipment/bill', bill).pipe(
      catchError(err => {
        console.error('Error creating shipment bill:', err);
        return of(null);
      }),
      map(response => {
        if (!response) {
          return null;
        }
        return {res: response, id: bill.shipmentId};
      })
    )
  }

  createShipmentBillResponse(shipmentData: ShipmentCreateDto) {
    return this.createShipment(shipmentData).pipe(
      switchMap(shipment => {
        if (!shipment) {
          return of(null);
        }

        const billDto = new CreateShipmentBillDto(
          shipment.shipmentId,
          shipment.trackingNumber,
          shipmentData.redirectUrl
        );

        return this.createShipmentBill(billDto);
      })
    );
  }

  createPayment(payment: CreatePaymentDto) : Observable<GetPaymentUrlDto | null> {
    return this._http.post<GetPaymentUrlDto>('/api/shipment/bill/pay', payment).pipe(
      catchError(err => {
        console.error('Error creating payment:', err);
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
