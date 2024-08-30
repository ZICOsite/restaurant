<script setup>
import { postApi } from "@/services/api";
import { useTableStore } from "@/stores/tableStore";
import { ref } from "vue";

const tableStore = useTableStore();

const sms = ref("");
const showSuccess = ref(true);

const postVerifyCode = async (code) => {
  try {
    if (code.length == 4) {
      const { status } = await postApi.postVerifyCode(
        "authentication/verify-confirmation-code/",
        code,
        tableStore.userPhoneNumber.replace(/\D/g, "")
      );
      console.log(res);
      if (status === 200) {
        showSuccess.value = false;
      }
    }
  } catch ({ response }) {
    showSuccess.value = true;
    console.error(response.data.error);
  }
};
</script>

<template>
  <Transition name="notification">
    <div class="notification">
      <div class="notification__content" v-if="sms.length !== 4">
        <h2 class="notification__content-title">Введите код из СМС</h2>
        <p class="notification__content-txt">
          Мы отправили СМС с кодом на номер
          <span>{{ tableStore.userPhoneNumber }}</span>
        </p>
        <InputOtp
          v-model="sms"
          integerOnly
          :length="4"
          class="notification__content-input"
          @change="postVerifyCode(sms)"
        />
      </div>
      <Transition name="notification">
        <div class="notification__success" v-if="sms.length === 4">
          <h4 class="notification__success-title">Вы успешно забронировали место!</h4>
          <RouterLink
            to="/?id=1"
            class="notification__success-link"
            @click="$emit('notification-close', false), (sms = 0)"
          >
            Вернуться на главную страницу
          </RouterLink>
        </div>
      </Transition>
    </div>
  </Transition>
</template>
