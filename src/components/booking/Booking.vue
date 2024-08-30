<script setup>
import { postApi } from "@/services/api";
import { useTableStore } from "@/stores/tableStore";
import { ref } from "vue";
import { useRoute } from "vue-router";
const emit = defineEmits(["booking-close", "notification-open"]);

const route = useRoute();
const tableStore = useTableStore();

const userName = ref("");
const userPhone = ref("");
const startTime = ref("");
const checked = ref(false);

const postBookTable = async (event) => {
  const formatedPhone = userPhone.value.replace(/\D/g, "");
  const bookInfo = {
    table_id: +route.query.id,
    name: event.target.userName.value,
    phone: formatedPhone,
    booking_datetime: `${tableStore.date || new Date().toLocaleDateString()}, ${
      event.target.userTime.value
    }:00`,
    special_event: checked.value ? "True" : "False",
    email: null,
    date_of_birth: null,
  };
  try {
    await postApi.postBookTable("book-table/", bookInfo);
    await postApi.postSMSNotification(
      "authentication/send-confirmation-code/",
      formatedPhone
    );
    tableStore.getUserPhoneNumber(userPhone.value);
  } catch (error) {
    console.log("Error", error);
  }
  userName.value = "";
  userPhone.value = "";
  startTime.value = "";
  checked.value = false;
  emit("booking-close", false);
  emit("notification-open", true);
};
</script>

<template>
  <Transition name="booking">
    <div class="booking" @click="$emit('booking-close', false)">
      <form class="booking__form" @click.stop @submit.prevent="postBookTable">
        <div class="booking__form-content">
          <p class="booking__form-date">
            Дата: {{ tableStore.date || new Date().toLocaleDateString() }}
          </p>
          <div class="booking__form-time">
            <label class="booking__form-label">
              Выберите время посещение
              <input
                type="time"
                class="booking__form-input"
                v-model="startTime"
                name="userTime"
                required
              />
            </label>
          </div>
          <div class="booking__form-name">
            <label for="booking__form-name">Имя</label>
            <InputText
              id="booking__form-name"
              v-model="userName"
              placeholder="Введите имя"
              name="userName"
              required
            />
          </div>
          <div class="booking__form-phone">
            <label for="booking__form-phone">Номер телефона</label>
            <InputMask
              id="booking__form-phone"
              v-model="userPhone"
              mask="+998(99)999-99-99"
              placeholder="+998 (xx) xxx-xx-xx"
            />
            {{ userPhone }}
          </div>
          <label class="booking__form-birth">
            <Checkbox v-model="checked" :binary="true" />
            Бронь в честь дня рождения
          </label>
          <!-- <p class="booking__form-bonus">
            Присоеденится к программе лояьности и получить 70 000 сум
          </p> -->
        </div>
        <button class="booking__form-btn" :disabled="userPhone == ''">Подтвердить</button>
      </form>
    </div>
  </Transition>
</template>
