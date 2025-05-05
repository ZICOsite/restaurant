<script setup>
import { IconClose } from "@/helpers/icones";
import { eventApi, menuApi } from "@/services/api";
import { useAuthStore } from "@/stores/authStore";
import RestaurantView from "@/views/restaurant/RestaurantView.vue";
import Button from "primevue/button";
import { onMounted, ref } from "vue";

const board = ref(true);
const menu = ref(null);
const visible = ref(false);

const getMenu = async () => {
  try {
    const { data } = await menuApi.getMenu("authentication/menu/");

    menu.value = data;
  } catch (error) {
    console.error("Error", error);
  }
};

// const authStore = useAuthStore();
// const showEvent = ref(false);
// const events = ref(null);

// const getEvents = async () => {
//   try {
//     const { data } = await eventApi.getEvents("authentication/events/");
//     events.value = data;
//     console.log(data);
//   } catch (error) {
//     console.error("Error", error);
//   }
// };

onMounted(() => {
  getMenu();
  // setTimeout(() => {
  //   showEvent.value = true;
  //   getEvents();
  // }, 10000);
});
</script>

<template>
  <main>
    <RestaurantView />
    <div class="board" v-if="board">
      <div>
        <img src="@/assets/images/floor1/First-Floor-Front.webp" alt="" />
        <Button
          as="router-link"
          to="/"
          label="Бронирование"
          severity="contrast"
          @click="board = false"
        />
      </div>
      <div>
        <img src="@/assets/images/1.jpg" alt="" />
        <Button
          as="router-link"
          label="Мероприятия"
          to="/events"
          severity="contrast"
          @click="board = false"
        />
      </div>
      <div>
        <img src="@/assets/images/menu.jpg" alt="" />
        <Button label="Меню" severity="contrast" @click="visible = true" />
      </div>
    </div>
    <Dialog
      v-model:visible="visible"
      modal
      header="Выберите язык меню"
      :style="{ width: '25rem' }"
    >
      <ul style="display: flex; gap: 8px">
        <li v-for="item in menu" :key="item.id">
          <Button
            as="a"
            :label="item.lang"
            :href="`https://api.bierregen.pub${item.file}`"
            severity="contrast"
            target="_blank"
          />
        </li>
      </ul>
    </Dialog>
    <!-- <div
      class="_event"
      @click="showEvent = false"
      v-show="showEvent && !authStore.accessToken"
    >
      <div class="_event__content" @click.stop>
        <span class="_event__content-close" @click="showEvent = false">
          <IconClose />
        </span>
        <img :src="events?.[0].image" alt="event" class="_event__content-img" />
        <a
          href="https://t.me/BierRegenPub"
          class="_event__content-btn"
          target="_blank"
        >
          Купить билеты
        </a>
      </div>
    </div> -->
  </main>
</template>
