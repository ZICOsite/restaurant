<script setup>
import FirstFloorView from "@/views/firstFloor/FirstFloorView.vue";
import Modal from "@/components/modal/Modal.vue";
import Booking from "@/components/booking/Booking.vue";
import DatePicker from "primevue/datepicker";
import { minDate, maxDate, formatDate } from "@/helpers/currentDate";
import Notification from "@/components/notification/Notification.vue";
import { IconArrowLeft, IconArrowRight } from "@/helpers/icones";
import SecondFloorView from "@/views/secondFloor/SecondFloorView.vue";
import { getApi } from "@/services/api";
import { useTableStore } from "@/stores/tableStore";
import { onMounted, ref, watch, watchEffect } from "vue";
import { useRoute } from "vue-router";
import { useSwipeSceneStore } from "@/stores/swipeSceneStore";

const tableStore = useTableStore();
const route = useRoute();
const swipeSceneStore = useSwipeSceneStore();

const isModal = ref(false);
const isBooking = ref(false);
const isNotification = ref(false);
const selectedChair = ref(null);
const floor = ref(1);

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
  swipeSceneStore.setFloor(value);
};

const handleChangeSceneFront = () => swipeSceneStore.changeScene(1);
const handleChangeSceneBack = () => swipeSceneStore.changeScene(0);

const currentDate = new Date();

const getFormatDate = () => {
  tableStore.getDateFormat(formatDate(date.value ?? new Date()));
  restaurantDate.classList.remove("active");
};

const closeForm = () => restaurantDate.classList.remove("active");

watchEffect(async () => {
  try {
    let selectedDate = formatDate(date.value ?? currentDate, "table-detail");
    const { data } = await getApi.getTable(
      `table-detail/${route.query.id ?? 1}/?date=${selectedDate}`
    );
    tableStore.getTable(data);
  } catch (error) {
    console.error(error);
  }
});

watch(date, (newDate) => {
  tableStore.getDate(formatDate(newDate));
});

onMounted(() => closeForm());
</script>

<template>
  <section class="restaurant">
    <FirstFloorView
      v-if="floor === 1"
      @modal-open="modalOpen"
      :scene="swipeSceneStore.scene"
      :active="selectedChair"
    />
    <SecondFloorView
      v-if="floor === 2"
      @modal-open="modalOpen"
      :active="selectedChair"
      :selected-chair="selectedChair"
      :scene="swipeSceneStore.scene"
    />
    <Modal
      v-if="isModal"
      @modal-close="modalClose"
      @booking-open="bookingOpen"
    />
    <Booking
      v-show="isBooking"
      @booking-close="bookingClose"
      @notification-open="notificationOpen"
    />
    <Notification
      v-if="isNotification"
      @notification-close="notificationClose"
    />
    <ul class="restaurant__floors">
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
      <li
        class="restaurant__floors-glider"
        :class="{ active: floor === 2 }"
      ></li>
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
      id="restaurantDate"
    >
      <div class="restaurant__date-item">
        <label class="restaurant__date-label">
          Сегодня: {{ formatDate(currentDate) }}
        </label>
        <DatePicker
          inputClass="restaurant__date-date"
          v-model="date"
          showIcon
          fluid
          iconDisplay="input"
          :manualInput="false"
          placeholder="Выберите дату брони"
          :minDate="minDate"
          :maxDate="maxDate"
          dateFormat="dd.mm.yy"
        />
      </div>
      <button class="restaurant__date-btn">Просмотреть</button>
      <button class="restaurant__date-btn" type="reset" @click="closeForm">
        Закрыть
      </button>
    </form>
  </section>
</template>
