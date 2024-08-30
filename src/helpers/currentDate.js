import { ref } from "vue";

let today = new Date();
let month = today.getMonth();
let year = today.getFullYear();
let prevMonth = month === 0 ? 11 : month;
let prevYear = prevMonth === 11 ? year - 1 : year;
let nextMonth = month === 11 ? 0 : month + 3;
let nextYear = nextMonth === 0 ? year + 1 : year;

const minDate = ref(new Date());
const maxDate = ref(new Date());

minDate.value.setMonth(prevMonth);
minDate.value.setFullYear(prevYear);
maxDate.value.setMonth(nextMonth);
maxDate.value.setFullYear(nextYear);

export { minDate, maxDate };
