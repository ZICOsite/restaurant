import { axiosInstance } from "@/services/axios";

const getApi = {
  getTable(url) {
    return axiosInstance.get(url);
  },
  getBookingHistory(url) {
    return axiosInstance.get(url);
  },
  getDashboard(url) {
    return axiosInstance.get(url);
  },
  getHostessesList(url) {
    return axiosInstance.get(url);
  },
  getHostesId(url) {
    return axiosInstance.get(url);
  },
  getSocketStatus(url) {
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
      customer_comment: data.customer_comment,
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
  postHostesUser(url, data) {
    return axiosInstance.post(url, {
      username: data.username,
      first_name: data.first_name,
      phone_number: data.phone_number,
      password: data.password,
      last_name: data.last_name,
    });
  },
  postRefreshToken(url, refresh) {
    return axiosInstance.post(url, {
      refresh: refresh,
    });
  },
};

const putApi = {
  putBooking(url, status) {
    return axiosInstance.put(url, {
      status: status,
    });
  },
};

const patchApi = {
  patchHostesUser(url, data) {
    return axiosInstance.patch(url, {
      first_name: data.first_name,
      password: data.password,
      phone_number: data.phone_number,
      last_name: data.last_name,
    });
  },
  patchPladgeComment(url, data) {
    return axiosInstance.patch(url, {
      pledge_comment: data,
    });
  },
  patchSocketPatch(url, firstFloor, secondFloor) {
    return axiosInstance.patch(url, {
      first_floor: firstFloor,
      second_floor: secondFloor,
    });
  },
};

const delApi = {
  deleteHostesUser(url) {
    return axiosInstance.delete(url);
  },
};

const eventApi = {
  getEvents(url) {
    return axiosInstance.get(url);
  },
  getSingleEvent(url) {
    return axiosInstance.get(url);
  },
  createEvent(url, data) {
    return axiosInstance.post(
      url,
      {
        date: data.date,
        time: data.time,
        location: data.location,
        phone_number: data.phone_number,
        guest_name: data.guest_name,
        image: data.image,
      },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
  },
  editEvent(url, data) {
    return axiosInstance.patch(
      url,
      {
        date: data.date,
        time: data.time,
        location: data.location,
        phone_number: data.phone_number,
        guest_name: data.guest_name,
        image: data.image,
      },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
  },
  deleteEvent(url) {
    return axiosInstance.delete(url);
  },
};

export { getApi, postApi, putApi, patchApi, delApi, eventApi };
