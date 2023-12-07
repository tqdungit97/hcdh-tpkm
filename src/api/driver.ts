import { AxiosInstance } from ".";

export type PutToggleDriverOnlineStatusPayload = {
  lat: number;
  long: number;
  type: "ONLINE" | "OFFLINE";
};

export const toggleDriverOnlineStatus = (
  payload: PutToggleDriverOnlineStatusPayload
) => AxiosInstance.put("api/users/online", payload);
