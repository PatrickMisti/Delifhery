
export class UpdateShipReceiverDto {
  constructor(
    public receiverId: number,
    public trackingNumber: string
  ) {}
}
