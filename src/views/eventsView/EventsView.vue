<script setup>
import { onMounted, ref } from "vue";
import { eventApi } from "@/services/api.js";

const events = ref(null);

const getEvents = async () => {
  try {
    const { data } = await eventApi.getEvents("authentication/events/");
    events.value = data;
  } catch (error) {
    console.error("Error", error);
  }
};

onMounted(() => {
  getEvents();
});
</script>

<template>
  <section class="events">
    <div class="container">
      <h2 class="events__title">Событие</h2>
      <div class="events__cards">
        <Card v-for="item in events" :key="item.id" style="overflow: hidden">
          <template #header>
            <img
              :alt="item.guest_name"
              :src="item.image"
              width="100%"
              height="200"
              style="object-fit: cover; vertical-align: bottom"
            />
          </template>
          <template #title>{{ item.guest_name }}</template>
          <template #subtitle>
            <span style="margin-right: 16px">
              <i class="pi pi-calendar"></i>
              {{ item.date }}
            </span>
            <span>
              <i class="pi pi-clock"></i>
              {{ item.time.replace(/:00$/, "") }}
            </span>
          </template>
          <template #footer>
            <div class="events__btns">
              <Button
                label="Подробнее"
                severity="contrast"
                class="events__btn"
                as="router-link"
                :to="`events/${item.id}`"
              />
              <Button
                label="Купить билеты"
                severity="success"
                class="events__btn"
                as="a"
                href="https://t.me/BierRegenPub"
              />
            </div>
          </template>
        </Card>
      </div>
    </div>
  </section>
</template>
