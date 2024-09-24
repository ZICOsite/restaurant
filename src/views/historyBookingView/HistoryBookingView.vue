<script setup>
import { getApi } from "@/services/api";
import { ref, watchEffect } from "vue";
import { watchDebounced } from "@vueuse/core";
import { useRoute } from "vue-router";
import Select from "primevue/select";

const route = useRoute();

const historyLimited = route.name == "history" ? 10 : 3;

const bookingHistory = ref(null);
const countHistory = ref(0);
const loading = ref(true);

const first = ref(0);
const customer = ref();
const selectedStatus = ref();
const statuses = [
  {
    name: "booked",
    translate: "забронировано"
  },
  {
    name: "cancelled",
    translate: "отменено"
  },
  {
    name: "completed",
    translate: "завершено"
  },
];

const actions = {
  booked: "забронировано",
  cancelled: "отменено",
  completed: "завершено",
}

const getSeverity = (status) => {
  switch (status) {
    case "cancelled":
      return "danger";

    case "completed":
      return "success";

    case "booked":
      return "contrast";
  }
};

const getBookingHistory = async (
  skip = 0,
  status = "",
  search = "",
) => {
  try {
    const { data } = await getApi.getBookingHistory(
      `booking-history/?limit=${historyLimited}&offset=${skip}&status=${status}&search=${search}`
    );
    bookingHistory.value = data.results;
    countHistory.value = data.count;
  } catch (error) {
    console.error("Error booking-history", error);
  } finally {
    loading.value = false;
  }
};

watchEffect(() => {
  getBookingHistory(first.value, selectedStatus.value?.name ?? "", customer.value);
});

watchDebounced(
  customer,
  () => {
    getBookingHistory(
      first.value,
      selectedStatus.value?.name ?? "",
      customer.value
    );
  },
  { debounce: 500 }
);

</script>
<template>
  <section class="history">
    <div class="history__top">
      <h3 class="history__title">История броней</h3>
      <InputText
        v-model="customer"
        placeholder="Поиск по клиентов"
        class="history__top-name"
      />
      <Select
        v-model="selectedStatus"
        :options="statuses"
        optionLabel="translate"
        placeholder="Выберите статус брони"
        class="history__top-select"
        showClear
      >
        <template #option="slotProps">
          <Tag
            :value="slotProps.option.translate"
            :severity="getSeverity(slotProps.option.name)"
          />
        </template>
      </Select>
      <Button icon="pi pi-refresh" severity="contrast" raised @click="getBookingHistory()" />
    </div>
    <div class="history__content">
      <DataTable
        :value="bookingHistory"
        tableStyle="min-width: 50rem"
        stripedRows
        :loading="loading"
      >
        <template #empty> Клиенты не найдены. </template>
        <template #loading>
          Загрузка данных бронирования. Пожалуйста, подождите.
        </template>
        <Column field="id" header="ID Брони" style="width: 5%">
          <template #body="{ data }"> #{{ data.id }} </template>
        </Column>
        <Column field="booking_date" header="Дата" style="width: 5%">
          <template #body="{ data }">
            {{ new Date(data.booking_date).toLocaleDateString() }}
          </template>
        </Column>
        <Column field="booking_time" header="Время" style="width: 5%"></Column>
        <Column field="floor" header="Этаж" style="width: 5%">
          <template #body="{ data }"> {{ data.floor }}-этаж </template>
        </Column>
        <Column field="table_number" header="Cтолик" style="width: 5%">
          <template #body="{ data }">
            Столик №{{ data.table_number }}
          </template>
        </Column>
        <Column field="table_type" header="Персоны" style="width: 5%">
          <template #body="{ data }"> {{ data.table_type }}-местный </template>
        </Column>
        <Column
          field="customer_name"
          header="На имя"
          style="width: 5%"
        ></Column>
        <Column
          field="phone_number"
          header="Номер телефона"
          style="width: 5%"
        ></Column>
        <Column field="" header="Статус" style="width: 5%">
          <template #body="{ data }">
            <Tag :value="actions[data.status]" :severity="getSeverity(data.status)" />
          </template>
        </Column>
      </DataTable>
      <Paginator
        v-if="historyLimited >= 10"
        v-model:first="first"
        :rows="10"
        :totalRecords="countHistory"
        class="history__paginate"
      ></Paginator>
    </div>
  </section>
</template>
