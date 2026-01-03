import {ShipmentStatus} from './enum-types';

export class ShipmentStatusEntry {
  constructor(
    public statusId: number,
    public shipmentId: number,
    public timestamp: Date,
    public status: ShipmentStatus,
    public additionalInfo: string
  ) {}

  static fromJson(json: any): ShipmentStatusEntry {
    return new ShipmentStatusEntry(
      json?.statusId ?? 0,
      json?.shipmentId ?? 0,
      new Date(json?.timestamp ?? new Date().toISOString()),
      (json?.status as ShipmentStatus) ?? ShipmentStatus.Registered,
      json?.additionalInfo ?? ""
    );
  }
}
