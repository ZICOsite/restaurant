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

function formatDate(date, tableDetail) {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Месяцы идут с 0, поэтому добавляем 1
  const year = date.getFullYear();
  
  if (tableDetail == "table-detail") return `${year}-${month}-${day}`;
  else return `${day}.${month}.${year}`;
}

export { minDate, maxDate, formatDate };
