export class CreateShipmentBillDto {
  public shipmentId: number;
  public trackingNumber: string;

  constructor(
    shipmentId: number,
    trackingNumber: string,
  ) {
    this.shipmentId = shipmentId;
    this.trackingNumber = trackingNumber;
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

export class GetPaymentUrlDto {
  public paymentUrl: string;

  constructor(
    paymentUrl: string
  ) {
    this.paymentUrl = paymentUrl;
  }
}
