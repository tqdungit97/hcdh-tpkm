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
  pickUpLongitude: number;
  pickUpLatitude: number;
  dropOffLongitude: number;
  dropOffLatitude: number;
  pickUpPoint: string;
  dropOffPoint: string;
};

export type BookingDetail = {
  id: number;
  ma_dat_xe: number;
  thoi_gian_cap_nhat: Date;
  thoi_gian_tao: Date;
  bookingId: number;
} & BaseBookingDetail;

export type Vehicle = {
  id: number;
  driverId: number;
  brand: string;
  model: string;
  licensePlate: string;
  image: string | null;
  thoi_gian_tao: string;
  thoi_gian_cap_nhat: string;
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
  thoi_gian_tao: string;
  thoi_gian_cap_nhat: string;
  ma_nguoi_dung: number;
  vehicle: Vehicle;
  driverLoginSession?: {
    id: number;
    driverId: number;
    currentLat: number;
    currentLong: number;
    status: DriverOnlineStatus;
    ma_tai_xe: number;
  };
};

export type Booking = {
  bookingDetail: BookingDetail;
  code: string;
  customerId: number;
  id: number;
  startTime: Date;
  status: BookingStatus;
  thoi_gian_cap_nhat: Date;
  thoi_gian_tao: Date;
  driver?: DriverInfo;
  minDistance?: number;
  amount?: number;
  user?: unknown;
};
