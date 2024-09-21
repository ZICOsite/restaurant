<script setup>
import { postApi } from "@/services/api";
import { ref } from "vue";
import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "vue-router";
import { jwtDecode } from "jwt-decode";

const authStore = useAuthStore();
const router = useRouter();

const name = ref("");
const password = ref("");
const errorMessage = ref(false);

const userAuth = async () => {
  const userData = {
    username: name.value,
    password: password.value,
  };
  try {
    const { data } = await postApi.postToken("authentication/token/", userData);
    errorMessage.value = false;
    const decoded = jwtDecode(data.access);
    authStore.login(data.access, data.refresh);
    authStore.setUser(decoded.username);
    if (decoded.is_hostess) router.push("/?id=1");
    else router.push("/admin");
  } catch (error) {
    console.error(error);
    errorMessage.value = true;
  }
  name.value = "";
  password.value = "";
};
</script>

<template>
  <section class="login">
    <div class="login__content">
      <img src="@/assets/images/logo.svg" alt="" class="login__content-logo" />
      <form action="" class="login__form" @submit.prevent="userAuth">
        <h2 class="login__form-title">Войти в профиль</h2>
        <div class="login__form-content">
          <label class="login__form-label">
            Логин
            <InputText v-model="name" placeholder="Введите имя" required />
          </label>
          <label class="login__form-label">
            Пароль
            <Password
              v-model="password"
              :feedback="false"
              placeholder="Введите пароль"
              toggleMask
              autocomplete="current-password"
            />
          </label>
          <p class="errorMessage" v-if="errorMessage">Неверный логин или пароль</p>
        </div>
        <button class="login__form-btn">Подтвердить</button>
      </form>
    </div>
  </section>
</template>
