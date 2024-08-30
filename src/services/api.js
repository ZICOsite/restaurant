import { axiosInstance } from "@/services/axios";

const getApi = {
  getTable(url) {
    return axiosInstance.get(url);
  },
};

const postApi = {
  postBookTable(url, data) {
    return axiosInstance.post(url, {
      table_id: data.table_id,
      name: data.name,
      phone: data.phone,
      booking_datetime: data.booking_datetime,
      special_event: data.special_event,
      email: data.email,
      date_of_birth: data.date_of_birth,
    });
  },
  postSMSNotification(url, number) {
    return axiosInstance.post(url, {
      phone_number: number,
    });
  },
  postToken(url, data) {
    return axiosInstance.post(url, {
      username: data.username,
      password: data.password,
    });
  },
  postDeleteBooking(url) {
    return axiosInstance.delete(url);
  }
};

export { getApi, postApi };
