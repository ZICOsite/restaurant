<script setup>
import { IconLogIn, IconPersonSearch, IconMenu } from "@/helpers/icones";
import { useAuthStore } from "@/stores/authStore";
import { useToast } from "primevue/usetoast";
import Toast from "primevue/toast";
import { onMounted, ref } from "vue";
import { useSwipeSceneStore } from "@/stores/swipeSceneStore";
import { getApi, patchApi } from "@/services/api";

const authStore = useAuthStore();
const swipeSceneStore = useSwipeSceneStore();
const toast = useToast();

const scene = ref(false);

const toggleDisableBooking = async () => {
  try {
    swipeSceneStore.switchBooking(
      swipeSceneStore.floor == 1 ? "firstFloor" : "secondFloor"
    );
    await patchApi.patchSocketPatch(
      "socket-status/update/1/",
      swipeSceneStore.blocked.firstFloor,
      swipeSceneStore.blocked.secondFloor
    );
  } catch (error) {
    console.error(error);
  }
};

const show = () => {
  toast.add({
    severity: "secondary",
    summary: "Поиск",
    detail: "Нажмите комбинацию CTRL + F",
    life: 3000,
  });
};

const changeScene = () => {
  scene.value = !scene.value;
  swipeSceneStore.changeScene(scene.value ? 1 : 0);
};

const getSocketStatus = async () => {
  try {
    const { data } = await getApi.getSocketStatus("socket-status/1/");
    // console.log(data);
    swipeSceneStore.setBlocked("firstFloor", data.first_floor);
    swipeSceneStore.setBlocked("secondFloor", data.second_floor);
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  getSocketStatus();
  calendar.addEventListener("click", () =>
    restaurantDate.classList.toggle("active")
  );
});
</script>

<template>
  <nav class="nav">
    <div class="nav__container">
      <RouterLink to="/" class="nav__logo">
        <img src="@/assets/images/logo.svg" alt="Bier Regen logo" width="80" />
      </RouterLink>
      <ul class="nav__list">
        <li class="nav__item">
          <Button
            v-if="!authStore.accessToken"
            as="a"
            label="Меню"
            href="/bierregen-menu.pdf"
            rel="noopener"
            class="nav__list-menu"
            target="_blank"
          >
            Меню <IconMenu />
          </Button>
          <Button
            v-else
            @click="toggleDisableBooking"
            :icon="
              swipeSceneStore.floor == 1
                ? swipeSceneStore.blocked.firstFloor
                  ? 'pi pi-lock-open'
                  : 'pi pi-lock'
                : swipeSceneStore.blocked.secondFloor
                ? 'pi pi-lock-open'
                : 'pi pi-lock'
            "
            aria-label="Filter"
            severity="contrast"
            v-tooltip.bottom="{
              value: swipeSceneStore.blocked.secondFloor
                ? `Отключить бронь на ${swipeSceneStore.floor} этаже`
                : `Включить бронь на ${swipeSceneStore.floor} этаже`,
              class: 'nav-tooltip',
            }"
          />
        </li>
        <li class="nav__item">
          <a href="tel:+998991080808" class="nav__link">+998 99-108-08-08</a>
        </li>
        <li
          class="nav__item nav__item_search"
          v-if="authStore.accessToken"
          @click="show()"
        >
          <IconPersonSearch color="#fff" />
        </li>
        <li
          class="nav__item nav__item_logout"
          v-if="authStore.accessToken"
          @click="authStore.logout()"
        >
          <IconLogIn color="#fff" />
        </li>
      </ul>
    </div>
    <Toast position="top-center" />
  </nav>
  <nav class="nav-mobile">
    <ul class="nav-mobile__list">
      <li class="nav-mobile__item" id="calendar">
        <i style="color: #000; font-size: 1.3rem" class="pi pi-calendar"></i>
      </li>
      <li class="nav-mobile__item" @click="changeScene">
        <i
          style="color: #000; font-size: 1.3rem"
          class="pi pi-arrow-right-arrow-left"
        ></i>
      </li>
      <li class="nav-mobile__logo">
        <img src="@/assets/images/logo.svg" alt="" width="90" />
      </li>
      <li class="nav-mobile__item">
        <a
          href="/bierregen-menu.pdf"
          target="_blank"
          v-if="!authStore.accessToken"
        >
          <i
            style="color: #000; font-size: 1.3rem"
            class="pi pi-list-check"
          ></i>
        </a>
        <Button
          v-else
          @click="toggleDisableBooking"
          :icon="
            swipeSceneStore.floor == 1
              ? swipeSceneStore.blocked.firstFloor
                ? 'pi pi-lock-open'
                : 'pi pi-lock'
              : swipeSceneStore.blocked.secondFloor
              ? 'pi pi-lock-open'
              : 'pi pi-lock'
          "
          aria-label="Filter"
          severity="contrast"
        />
      </li>
      <li class="nav-mobile__item">
        <a href="tel:+998991080808">
          <i style="color: #000; font-size: 1.3rem" class="pi pi-phone"></i>
        </a>
      </li>
    </ul>
  </nav>
</template>
