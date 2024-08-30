import { defineStore } from "pinia";

export const useTableStore = defineStore("table", {
  state: () => ({
    table: null,
    dateISOFormat: null,
    date: null,
    userPhoneNumber: null,
  }),
  actions: {
    getTable(data) {
      this.table = data;
    },
    getDateISOFormat(date) {
      this.dateISOFormat = date;
    },
    getDate(date) {
      this.date = date;
    },
    getUserPhoneNumber(number) {
      this.userPhoneNumber = number;
    },
  },
});
