<script setup>
import { postApi } from "@/services/api";
import { useBookInfoStore } from "@/stores/bookInfoStore";
import { useTableStore } from "@/stores/tableStore";
import { onMounted, ref } from "vue";
import { IconClose } from "@/helpers/icones";
import { useAuthStore } from "@/stores/authStore";

const authStore = useAuthStore();
const tableStore = useTableStore();
const bookInfoStore = useBookInfoStore();
const showCode = ref(false);

const sms = ref("");
const showSuccess = ref(false);
const showError = ref(false);

const postVerifyCode = async (code) => {
  if (code == bookInfoStore.smsCode) {
    try {
      await postApi.postBookTable("book-table/", bookInfoStore.bookInfo);
      showSuccess.value = true;
    } catch (error) {
      console.error(error);
    }
  } else {
    if (code.length == 4) showError.value = true;
  }
};

onMounted(() => {
  setTimeout(() => {
    showCode.value = true;
  }, 1500);
});
</script>

<template>
  <Transition name="notification">
    <div class="notification">
      <div class="notification__content" v-if="!showSuccess">
        <span
          class="notification__content-close"
          @click="$emit('notification-close', false)"
        >
          <IconClose />
        </span>
        <h2 class="notification__content-title">Введите код из СМС</h2>
        <p class="notification__content-txt">
          Мы отправили СМС с кодом на номер
          <span>{{ tableStore.userPhoneNumber ? "998" + tableStore.userPhoneNumber : 'Подождите 2 минуты' }}</span>
        </p>
        <InputOtp
          v-model="sms"
          integerOnly
          :length="4"
          class="notification__content-input"
          @change="postVerifyCode(sms)"
        />
        <p class="notification__content-code" v-if="showCode && authStore.accessToken">
          Ваш код: {{ bookInfoStore.smsCode }}
        </p>
        <p class="notification__content-change" v-if="showError">
          Введён неправильный код
        </p>
        <p class="notification__content-change" v-if="bookInfoStore.manyRequest">
          Пожалуйста, подождите 2 минуты, прежде чем запросить другой код.
        </p>
      </div>
      <Transition name="notification">
        <div class="notification__success" v-if="showSuccess">
          <h4 class="notification__success-title">Вы успешно забронировали место!</h4>
          <!-- <img src="@/assets/images/prime-bonus.svg" alt="QR code" class="notification__success-qr" /> -->
          <RouterLink
            to="/?id=1"
            class="notification__success-link"
            @click="(showSuccess = false), $emit('notification-close', false), (sms = 0)"
          >
            Вернуться на главную страницу
          </RouterLink>
        </div>
      </Transition>
    </div>
  </Transition>
</template>
