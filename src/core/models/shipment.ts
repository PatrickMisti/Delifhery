import {Address} from './address';
import {PaymentStatus, ShipmentStatus} from './enum-types';
import {ShipmentStatusEntry} from './shipment-status-entry';
import {DialogMessage} from '../../app/utilities/open-dialog.widget';

export class Shipment {
  constructor(
    public shipmentId: number,
    public trackingNumber: string,
    public senderName: string,
    public senderId: number,
    public receiverAddressId: number,
    public receiverAddress: Address,
    public receiverName: string,
    public widthCm: number,
    public lengthCm: number,
    public heightCm: number,
    public weightKg: number,
    public price: number,
    public paymentStatus: PaymentStatus,
    public currentStatus: ShipmentStatus,
    public notificationActive: boolean,
    public statusHistory: ShipmentStatusEntry[]
  ) {}

  static fromJson(json: any): Shipment {
    return new Shipment(
      json?.shipmentId ?? 0,
      json?.trackingNumber ?? "",
      json?.senderName ?? "",
      json?.senderId ?? 0,
      json?.receiverAddressId ?? 0,
      Address.fromJson(json?.receiverAddress),
      json?.receiverName ?? "",
      json?.widthCm ?? 0,
      json?.lengthCm ?? 0,
      json?.heightCm ?? 0,
      json?.weightKg ?? 0,
      json?.price ?? 0,
      (json?.paymentStatus as PaymentStatus) ?? PaymentStatus.Pending,
      (json?.currentStatus as ShipmentStatus) ?? ShipmentStatus.Registered,
      json?.notificationActive ?? false,
      Array.isArray(json?.statusHistory)
        ? json.statusHistory.map((x: any) => ShipmentStatusEntry.fromJson(x))
        : []
    );
  }
}
