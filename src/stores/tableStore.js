import { defineStore } from "pinia";

export const useTableStore = defineStore("table", {
  state: () => ({
    table: null,
    dateFormat: null,
    date: null,
    userPhoneNumber: null,
  }),
  actions: {
    getTable(data) {
      this.table = data;
    },
    getDateFormat(date) {
      this.dateFormat = `${date}, 12:00:00`;
    },
    getDate(date) {
      this.date = date;
    },
    getUserPhoneNumber(number) {
      this.userPhoneNumber = number;
    },
  },
});
