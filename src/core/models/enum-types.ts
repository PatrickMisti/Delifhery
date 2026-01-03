export enum ShipmentStatus {
  Registered = "Registered",
  Received = "Received",
  InDistribution = "InDistribution",
  OutForDelivery = "OutForDelivery",
  Delivered = "Delivered",
}

export enum PaymentStatus {
  Pending = "Pending",
  Paid = "Paid",
  Failed = "Failed",
}


export const isShipmentStatus = (value: any): value is ShipmentStatus =>
  Object.values(ShipmentStatus).includes(value);

export const isPaymentStatus = (value: any): value is PaymentStatus =>
  Object.values(PaymentStatus).includes(value);

export const ShipmentStatusLabel: Record<ShipmentStatus, string> = {
  [ShipmentStatus.Registered]: "Registriert",
  [ShipmentStatus.Received]: "Eingegangen",
  [ShipmentStatus.InDistribution]: "Im Verteilzentrum",
  [ShipmentStatus.OutForDelivery]: "In Zustellung",
  [ShipmentStatus.Delivered]: "Zugestellt",
};


export enum IncludeShipment {
  None = 'None',
  Send = 'Send',
  Receive = 'Receive',
  Both = 'Both',
}
