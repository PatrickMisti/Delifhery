export class CreateShipmentBillDto {
  public shipmentId: number;
  public trackingNumber: string;
  public redirectUrl: string;

  constructor(
    shipmentId: number,
    trackingNumber: string,
    redirectUrl: string
  ) {
    this.shipmentId = shipmentId;
    this.trackingNumber = trackingNumber;
    this.redirectUrl = redirectUrl;
  }
}

export class GetShipmentBillDto {
  public trackingId: string;
  public price: number;
  public qrCode: string;

  constructor(
    trackingId: string,
    price: number,
    qrCode: string
  ) {
    this.trackingId = trackingId;
    this.price = price;
    this.qrCode = qrCode;
  }
}

export class CreatePaymentDto {
  public shipmentId: number;
  public redirectUrl: string;

  constructor(
    shipmentId: number,
    redirectUrl: string
  ) {
    this.shipmentId = shipmentId;
    this.redirectUrl = redirectUrl;
  }
}
