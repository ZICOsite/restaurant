<script setup>
import { formatDate } from "@/helpers/currentDate";
import { postApi } from "@/services/api";
import { useBookInfoStore } from "@/stores/bookInfoStore";
import { useTableStore } from "@/stores/tableStore";
import { ref } from "vue";
import { useRoute } from "vue-router";

const emit = defineEmits(["booking-close", "notification-open"]);

const route = useRoute();
const tableStore = useTableStore();
const bookInfoStore = useBookInfoStore();

const userName = ref("");
const userPhone = ref("");
const userComment = ref("");
const startTime = ref(new Date().toLocaleTimeString().slice(0, -3));
const checked = ref(false);
const personalData = ref(true);

const currentDate = new Date();

const postBookTable = async () => {
  const formatedPhone = "998" + userPhone.value.replace(/\D/g, "");
  const bookInfo = {
    table_id: +route.query.id,
    name: userName.value,
    phone: formatedPhone,
    booking_datetime: `${tableStore.date || formatDate(currentDate)}, ${
      startTime.value
    }:00`,
    special_event: checked.value ? "True" : "False",
    customer_comment: userComment.value,
  };
  bookInfoStore.getBookInfo(bookInfo);
  try {
    const { data } = await postApi.postSMSNotification(
      "authentication/send-confirmation-code/",
      formatedPhone
    );
    bookInfoStore.getSmsCode(data.confirmation_code);
    tableStore.getUserPhoneNumber(userPhone.value);
  } catch (error) {
    console.error("Error", error);
    bookInfoStore.getShowError(error);
  }
  userName.value = "";
  userPhone.value = "";
  userComment.value = "";
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
            <i class="pi pi-calendar"></i>
          </p>
          <div class="booking__form-time">
            <label class="booking__form-label">
              Выберите время посещения
              <input
                type="time"
                class="booking__form-input"
                v-model="startTime"
                name="userTime"
                required
                :class="{
                  'valid-time': startTime >= '12:00' && startTime < '23:00',
                }"
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
              mask="(99)999-99-99"
              placeholder="(99) 999-99-99"
            />
          </div>
          <div class="booking__form-comment">
            <label for="booking__form-comment">Комментария</label>
            <Textarea
              v-model="userComment"
              rows="4"
              cols="30"
              placeholder="Комментария"
            />
          </div>
          <label class="booking__form-birth">
            <Checkbox v-model="checked" :binary="true" />
            Бронь в честь дня рождения
          </label>
          <label class="booking__form-personal">
            <Checkbox v-model="personalData" :binary="true" />
            <span>
              Я даю согласие на обработку моих <br />
              <a href="/Consent_to_the_processing_of_personal_data.pdf" target="_blank" style="color: red; text-decoration: underline;">персональных данных</a>
            </span>
          </label>
        </div>
        <button
          class="booking__form-btn"
          :disabled="
            userPhone == '' || startTime < '12:00' || startTime > '23:30'
          "
        >
          Подтвердить
        </button>
      </form>
    </div>
  </Transition>
</template>
