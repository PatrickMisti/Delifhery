import {Address} from './address';
import {Shipment} from './shipment';

export class User {
  constructor(
    public userId: number,
    public subject: string,
    public userName: string,
    public email: string,
    public phoneNumber: string,
    public createdAt: Date,
    public lastLogin: Date,
    public address: Address,
    public sendShipment: Shipment[],
    public receiveShipment: Shipment[]
  ) {}

  static fromJson(json: any): User {
    return new User(
      json?.userId ?? 0,
      json?.subject ?? "",
      json?.userName ?? "",
      json?.email ?? "",
      json?.phoneNumber ?? "",
      new Date(json?.createdAt ?? new Date().toISOString()),
      new Date(json?.lastLogin ?? new Date().toISOString()),
      Address.fromJson(json?.address),
      Array.isArray(json?.sendShipment)
        ? json.sendShipment.map((x: any) => Shipment.fromJson(x))
        : [],
      Array.isArray(json?.receiveShipment)
        ? json.receiveShipment.map((x: any) => Shipment.fromJson(x))
        : []
    );
  }
}

// Helper: parse the root array
export const parseUsers = (json: any): User[] =>
  Array.isArray(json) ? json.map(User.fromJson) : [];
