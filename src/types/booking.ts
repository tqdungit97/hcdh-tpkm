export enum VehicleType {
  FOUR_SEAT = "FOUR_SEAT",
  FIVE_SEAT = "FIVE_SEAT",
  SEVEN_SEAT = "SEVEN_SEAT",
  VIP = "VIP",
}

export enum BookingStatus {
  BOOKED = "BOOKED",
  ONBOARDING = "ONBOARDING",
  ARRIVED = "ARRIVED",
  CANCELLED = "CANCELLED",
  PAID = "PAID",
  DRIVER_FOUND = "DRIVER_FOUND",
  DRIVER_CONFIRMED = "DRIVER_CONFIRMED",
  DRIVER_COME = "DRIVER_COME",
  DRIVER_NOT_FOUND = "DRIVER_NOT_FOUND",
  WAITING_FOR_DRIVER = "WAITING_FOR_DRIVER",

  USER_CANCELLED = "USER_CANCELLED",
  CONFIRMED = "CONFIRMED",
}

export type BaseBookingDetail = {
  vehicleType: VehicleType;
  pickupLongitude: number;
  pickupLatitude: number;
  returnLongitude: number;
  returnLatitude: number;
  pickupLocation: string;
  returnLocation: string;
};

export type BookingDetail = {
  id: number;
  ma_dat_xe: number;
  updatedAt: Date;
  createdAt: Date;
  orderId: number;
} & BaseBookingDetail;

export type Vehicle = {
  id: number;
  driverId: number;
  brand: string;
  model: string;
  licensePlate: string;
  image: string | null;
  createdAt: string;
  updatedAt: string;
  ma_tai_xe: number;
};

export type DriverOnlineStatus = "ONLINE" | "OFFLINE";

export type DriverInfo = {
  id: number;
  userId: number;
  level: string;
  licenseType: string;
  licenseExpiry: string;
  vehicleType: VehicleType;
  createdAt: string;
  updatedAt: string;
  ma_nguoi_dung: number;
  vehicle: Vehicle;
  onlineSession?: {
    id: number;
    driverId: number;
    currentLat: number;
    currentLong: number;
    onlineStatus: DriverOnlineStatus;
  };
};

export type Booking = {
  orderDetail: BookingDetail;
  code: string;
  customerId: number;
  id: number;
  startTime: Date;
  status: BookingStatus;
  updatedAt: Date;
  createdAt: Date;
  driver?: DriverInfo;
  minDistance?: number;
  amount?: number;
  user?: unknown;
};
