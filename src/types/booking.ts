export enum VehicleType {
  FOUR_SEAT = "FOUR_SEAT",
  FIVE_SEAT = "FIVE_SEAT",
  SEVEN_SEAT = "SEVEN_SEAT",
  VIP = "VIP",
}

export enum BookingStatus {
  BOOKED = "BOOKED",
  DRIVER_FOUND = "DRIVER_FOUND",
  DRIVER_NOT_FOUND = "DRIVER_NOT_FOUND",
  WAITING_FOR_DRIVER = "WAITING_FOR_DRIVER",
}

export type BookingDetail = {
  id: number;
  ma_dat_xe: number;
  thoi_gian_cap_nhat: Date;
  thoi_gian_tao: Date;
  bookingId: number;
} & BaseBookingDetail;

export type BaseBookingDetail = {
  vehicleType: VehicleType;
  pickUplongitude: number;
  pickUplatitude: number;
  dropOfflongitude: number;
  dropOfflatitude: number;
  pickUpPoint: string;
  dropOffPoint: string;
};

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
  vehicle: {
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
};

// export type Booking =
