
export class ResponsePackageReceiveDto {
  constructor(
    public paymentUrl: string,
    public trackingId: string,
    public price: number,
    public qrCode: string
  ) {}
}
