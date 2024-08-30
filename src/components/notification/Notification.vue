<script setup>
import { postApi } from "@/services/api";
import { useBookInfoStore } from "@/stores/bookInfoStore";
import { useTableStore } from "@/stores/tableStore";
import { ref } from "vue";

const tableStore = useTableStore();
const bookInfoStore = useBookInfoStore();

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

// const postVerifyCode = async (code) => {
//   try {
//     if (code.length == 4) {
//       const { status } = await postApi.postVerifyCode(
//         "authentication/verify-confirmation-code/",
//         code,
//         "998" + tableStore.userPhoneNumber.replace(/\D/g, "")
//       );
//       console.log(res);
//       if (status === 200) {
//         showSuccess.value = false;
//       }
//     }
//   } catch ({ response }) {
//     showSuccess.value = true;
//     console.error(response.data.error);
//   }
// };
</script>

<template>
  <Transition name="notification">
    <div class="notification">
      <div class="notification__content" v-if="!showSuccess">
        <h2 class="notification__content-title">Введите код из СМС</h2>
        <p class="notification__content-txt">
          Мы отправили СМС с кодом на номер
          <span>{{ "998" + tableStore.userPhoneNumber }}</span>
        </p>
        <InputOtp
          v-model="sms"
          integerOnly
          :length="4"
          class="notification__content-input"
          @change="postVerifyCode(sms)"
        />
        <p class="notification__content-change" v-if="showError">
          Введён неправильный код
        </p>
        <p class="notification__content-change" v-if="bookInfoStore.manyRequest">
          Пожалуйста, подождите, прежде чем запросить другой код.
        </p>
      </div>
      <Transition name="notification">
        <div class="notification__success" v-if="showSuccess">
          <h4 class="notification__success-title">Вы успешно забронировали место!</h4>
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
