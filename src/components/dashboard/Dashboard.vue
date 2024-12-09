<script setup>
import { ref, onMounted, watch } from "vue";
import DatePicker from "primevue/datepicker";
import { getApi } from "@/services/api";

const dateDashboard = ref(null);

const chartData = ref();
const chartOptions = ref();
const curr = new Date();

// maxDate DatePicker
const maxDate = ref(new Date());
maxDate.value.setMonth(curr.getMonth());

// Dashboard дни
const days = ref([]);

const chooseDate = ref({
  month: String(curr.getMonth() + 1).padStart(2, "0"),
  year: curr.getFullYear(),
});

function getCurrentDayOrDaysInMonth(year, month) {
  if (curr.getFullYear() === year && curr.getMonth() + 1 === month) return curr.getDate()
  else return new Date(year, month, 0).getDate()
}

function getStatistics(year, month) {
  days.value.length = 0
  for (let i = 1; i <= getCurrentDayOrDaysInMonth(year, month); i++) {
    days.value.push(i);
  }
}

const setChartOptions = () => {
  const scalesXText = "#222";
  const scalesYText = "#222";
  const surfaceBorder = "#ccc";
  const legendText = "#000";

  return {
    maintainAspectRatio: false,
    aspectRatio: 0.8,
    plugins: {
      legend: {
        labels: {
          color: legendText,
          font: {
            weight: 500,
          },
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: scalesXText,
          font: {
            weight: 500,
          },
        },
        grid: {
          display: false,
          drawBorder: false,
        },
      },
      y: {
        ticks: {
          color: scalesYText,
        },
        grid: {
          color: surfaceBorder,
          drawBorder: false,
        },
      },
    },
  };
};

const getDashboard = async (
  month = chooseDate.value.month,
  year = chooseDate.value.year
) => {
  try {
    const { data } = await getApi.getDashboard(
      `monthly-booking-stats/?month=${month}&year=${year}`
    );
    chartData.value = {
      labels: days,
      datasets: [
        {
          label: "Успешные",
          backgroundColor: "#0B63F8",
          borderColor: "#fff",
          data: data.completed,
        },
        {
          label: "Отказы",
          backgroundColor: "red",
          borderColor: "#fff",
          data: data.cancelled,
        },
      ],
    };
  } catch (error) {
    console.error("Error statistics " + error);
  }
};

onMounted(() => {
  getDashboard();
  chartOptions.value = setChartOptions();
  getStatistics(curr.getFullYear(), curr.getMonth() + 1)
});

// Обновляем данные графика при изменении dateDashboard
watch(dateDashboard, (newDate) => {
  getDashboard(
    String(newDate.getMonth() + 1).padStart(2, "0"),
    newDate.getFullYear()
  );
  getStatistics(newDate.getFullYear(), newDate.getMonth() + 1)
});
</script>

<template>
  <div class="dashboard">
    <h2 class="dashboard__title">
      Дашборд
      <Button
        icon="pi pi-refresh"
        severity="contrast"
        raised
        @click="getDashboard(), (dateDashboard = new Date())"
      />
    </h2>
    <div class="dashboard__content">
      <div class="dashboard__content-info">
        <h3 class="dashboard__content-title">Статистика по бронированию</h3>
        <div class="dashboard__content-item">
          <label class="dashboard__content-label"
            >Дата
            {{
              dateDashboard?.toLocaleDateString() ??
              new Date().toLocaleDateString()
            }}
          </label>
          <DatePicker
            iconDisplay="input"
            :manualInput="false"
            showIcon
            inputClass="dashboard__content-date"
            placeholder="Выберите месяц"
            v-model="dateDashboard"
            view="month"
            dateFormat="mm/yy"
            :maxDate="maxDate"
          />
        </div>
      </div>
      <Chart
        type="bar"
        :data="chartData"
        :options="chartOptions"
        style="height: 400px"
      />
    </div>
  </div>
</template>
