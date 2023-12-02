import { PostBookingResponse } from "../../api/booking";
import { BookingStatus, VehicleType } from "../../types/booking";

export const postBookingResponse: PostBookingResponse = {
  driver: {
    id: 1,
    userId: 3,
    level: "NORMAL",
    licenseType: "A",
    licenseExpiry: "2027-11-30 13:12:52",
    vehicleType: VehicleType.FOUR_SEAT,
    thoi_gian_tao: "2023-11-30T13:12:52.000Z",
    thoi_gian_cap_nhat: "2023-11-30T13:12:52.000Z",
    ma_nguoi_dung: 3,
    vehicle: {
      id: 1,
      driverId: 1,
      brand: "Toyata",
      model: "Innova",
      licensePlate: "59F-24821",
      image: null,
      thoi_gian_tao: "2023-11-30T13:12:52.000Z",
      thoi_gian_cap_nhat: "2023-11-30T13:12:52.000Z",
      ma_tai_xe: 1,
    },
  },
  minDistance: 5.557583907104463,
  pricing: 55575.839071044626,
  status: BookingStatus.DRIVER_FOUND,
  booking: {
    id: 57,
    customerId: 14,
    code: "BOOK_1701532127585",
    status: BookingStatus.WAITING_FOR_DRIVER,
    startTime: new Date("2023-12-02T15:48:47.477Z"),
    bookingDetail: {
      id: 51,
      vehicleType: VehicleType.FOUR_SEAT,
      pickUplongitude: 106.726303,
      pickUplatitude: 10.75474,
      dropOfflongitude: 106.682586,
      dropOfflatitude: 10.762679,
      pickUpPoint:
        "164 Huỳnh Tấn Phát, Phường Tân Thuận Tây, Ho Chi Minh City 72910, Vietnam",
      dropOffPoint:
        "227 Nguyễn Văn Cừ, Ward 4, Ho Chi Minh City 72711, Vietnam",
      ma_dat_xe: 57,
      thoi_gian_cap_nhat: new Date("2023-12-02T15:48:47.634Z"),
      thoi_gian_tao: new Date("2023-12-02T15:48:47.634Z"),
      bookingId: 57,
    },
    thoi_gian_cap_nhat: new Date("2023-12-02T15:48:47.588Z"),
    thoi_gian_tao: new Date("2023-12-02T15:48:47.588Z"),
  },
};
