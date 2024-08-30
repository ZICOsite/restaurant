<script setup>
import { ref, onMounted } from "vue";

onMounted(() => {
  chartData.value = setChartData();
  chartOptions.value = setChartOptions();
});

const chartData = ref();
const chartOptions = ref();

const curr = new Date();
let date = new Date(curr.getFullYear(), curr.getMonth() + 1, 0);

const days = ref([]);

for (let i = 1; i <= date.getDate(); i++) {
  days.value.push(i);
}

const setChartData = () => {
  const documentStyle = getComputedStyle(document.documentElement);

  return {
    labels: days,
    datasets: [
      {
        label: "My First dataset",
        backgroundColor: documentStyle.getPropertyValue("--p-cyan-500"),
        borderColor: documentStyle.getPropertyValue("--p-cyan-500"),
        data: [65, 59, 80, 81, 56, 55, 40],
      },
      {
        label: "My Second dataset",
        backgroundColor: documentStyle.getPropertyValue("--p-gray-500"),
        borderColor: documentStyle.getPropertyValue("--p-gray-500"),
        data: [28, 48, 40, 19, 86, 27, 90],
      },
    ],
  };
};
const setChartOptions = () => {
  const documentStyle = getComputedStyle(document.documentElement);
  const textColor = documentStyle.getPropertyValue("--p-text-color");
  const textColorSecondary = documentStyle.getPropertyValue("--p-text-muted-color");
  const surfaceBorder = documentStyle.getPropertyValue("--p-content-border-color");

  return {
    maintainAspectRatio: false,
    aspectRatio: 0.8,
    plugins: {
      legend: {
        labels: {
          color: "#000",
          font: {
            weight: 500,
          },
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: textColorSecondary,
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
          color: "textColorSecondary",
        },
        grid: {
          color: surfaceBorder,
          drawBorder: false,
        },
      },
    },
  };
};
</script>

<template>
  <div class="admin">
    <div class="container">
      <h1>Admin{{ days }}</h1>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/admin/login">Login</RouterLink>
      <div class="card">
        <Chart
          type="bar"
          :data="chartData"
          :options="chartOptions"
          style="height: 80vh"
        />
      </div>
    </div>
    <RouterView />
  </div>
</template>
