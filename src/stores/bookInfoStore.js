import { defineStore } from "pinia";

export const useBookInfoStore = defineStore("bookInfo", {
  state: () => ({
    bookInfo: null,
    smsCode: null,
    manyRequest: false
  }),
  actions: {
    getBookInfo(data) {
      this.bookInfo = data;
    },
    getSmsCode(code) {
        this.smsCode = code
    },
    getShowError(error) {
        this.manyRequest = error
    }
  },
});
