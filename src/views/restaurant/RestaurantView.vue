<script setup>
import FirstFloorView from "@/views/firstFloor/FirstFloorView.vue";
import Modal from "@/components/modal/Modal.vue";
import Booking from "@/components/booking/Booking.vue";
import DatePicker from "primevue/datepicker";
import { minDate, maxDate } from "@/helpers/currentDate";
import Notification from "@/components/notification/Notification.vue";
import { IconArrowLeft, IconArrowRight, IconSettings } from "@/helpers/icones";
import SecondFloorView from "@/views/secondFloor/SecondFloorView.vue";
import { getApi } from "@/services/api";
import { useTableStore } from "@/stores/tableStore";
import { ref, watch, watchEffect } from "vue";
import { useRoute } from "vue-router";

const tableStore = useTableStore();
const route = useRoute();

const isModal = ref(false);
const isBooking = ref(false);
const isNotification = ref(false);
const selectedChair = ref(null);
const scene = ref(1);
const floor = ref(1);
const isActive = ref(false);

const date = ref();

const modalOpen = (boolean, item) => {
  isModal.value = boolean;
  selectedChair.value = item;
};

const modalClose = (boolean) => {
  isModal.value = boolean;
  selectedChair.value = null;
};

const bookingOpen = (boolean) => {
  isBooking.value = boolean;
};

const bookingClose = (boolean) => {
  isBooking.value = boolean;
};

const notificationOpen = (boolean) => {
  isNotification.value = boolean;
};

const notificationClose = (boolean) => {
  isNotification.value = boolean;
};

const handleFloorChange = (value) => {
  floor.value = value;
};

const handleChangeSceneFront = () => (scene.value = 1);
const handleChangeSceneBack = () => (scene.value = 0);

const getFormatDate = () => {
  tableStore.getDateISOFormat(
    `${
      date.value ? date.value.toLocaleDateString() : new Date().toLocaleDateString()
    }, 12:00:00`
  );
  // const [day, month, year] = date.value.toLocaleDateString().split(".");
  // tableStore.getDateISOFormat(new Date(`${year}-${month}-${day}T12:00`).toISOString());
};

watchEffect(async () => {
  try {
    let selectedDate = route.query.date || new Date().toLocaleDateString();
    const [day, month, year] = selectedDate.split(".");
    const formatedDate = `${year}-${month}-${day}`;
    const { data } = await getApi.getTable(
      `table-detail/${route.query.id ?? 1}/?date=${formatedDate}`
    );
    tableStore.getTable(data);
  } catch (error) {
    console.error(error);
  }
});

watch(date, (newDate) => {
  tableStore.getDate(newDate.toLocaleDateString());
});
</script>

<template>
  <section class="restaurant">
    <FirstFloorView
      v-if="floor === 1"
      @modal-open="modalOpen"
      :scene="scene"
      :active="selectedChair"
    />
    <SecondFloorView
      v-if="floor === 2"
      @modal-open="modalOpen"
      :active="selectedChair"
      :selected-chair="selectedChair"
      :scene="scene"
    />
    <Modal v-if="isModal" @modal-close="modalClose" @booking-open="bookingOpen" />
    <Booking
      v-show="isBooking"
      @booking-close="bookingClose"
      @notification-open="notificationOpen"
    />
    <Notification v-if="isNotification" @notification-close="notificationClose" />
    <ul class="restaurant__floors" :class="{ active: isActive }">
      <li
        :class="['restaurant__floors-item', { active: floor === 1 }]"
        @click="handleFloorChange(1)"
      >
        1 Этаж
      </li>
      <li
        :class="['restaurant__floors-item', { active: floor === 2 }]"
        @click="handleFloorChange(2)"
      >
        2 Этаж
      </li>
    </ul>
    <div class="restaurant__slide">
      <span class="restaurant__slide-item" @click="handleChangeSceneFront">
        <IconArrowLeft />
      </span>
      <span class="restaurant__slide-item">Свайп</span>
      <span class="restaurant__slide-item" @click="handleChangeSceneBack">
        <IconArrowRight />
      </span>
    </div>
    <form
      class="restaurant__date"
      @submit.prevent="getFormatDate"
      :class="{ active: isActive }"
    >
      <div class="restaurant__date-item">
        <label class="restaurant__date-label"
          >Дата {{ tableStore.date || new Date().toLocaleDateString() }}
        </label>
        <DatePicker
          inputClass="restaurant__date-date"
          v-model="date"
          showIcon
          fluid
          iconDisplay="input"
          :manualInput="false"
          placeholder="Выберите дату"
          :minDate="minDate"
          :maxDate="maxDate"
          dateFormat="dd.mm.yy"
        />
      </div>
      <button class="restaurant__date-btn">Просмотр</button>
      <button class="restaurant__date-btn" type="reset" @click="isActive = false">
        Закрыть
      </button>
    </form>
    <span class="settings" @click="isActive = true" :class="{ active: isActive }">
      <IconSettings />
    </span>
  </section>
</template>
