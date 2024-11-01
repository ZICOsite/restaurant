<script setup>
import { onMounted, ref } from "vue";
import { IconLocation } from "@/helpers/icones.js";
import { eventApi } from "@/services/api.js";

const events = ref(null);

const getDateFormat = (date) => {
  let options = {
    month: "long",
    day: "numeric",
  };
  return new Intl.DateTimeFormat("ru-RU", options).format(new Date(date));
};

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
    <h2 class="events__title">Событие</h2>
    <div class="events__content" v-for="item in events" :key="item.id">
      <div class="events__content-info">
        <p class="events__content-date">{{ getDateFormat(item.date) }}</p>
        <a
          :href="item.location"
          class="events__content-location"
          target="_blank"
        >
          <IconLocation />Bier Regen Pub
        </a>
        <p class="events__content-time">
          Время: {{ item.time.replace(/:00$/, "") }}
        </p>
        <div class="events__content-numbers">
          <span>Номер:</span>
          <a href="tel:+998712059808" class="events__content-number"
            >+998712059808</a
          >
        </div>
        <p class="events__content-guest">Гость: {{ item.guest_name }}</p>
        <a
          href="https://t.me/BierRegenPub"
          target="_blank"
          class="events__content-btn"
          >Купить билеты
        </a>
      </div>
      <img
        :src="item.image"
        :alt="item.guest_name"
        class="events__content-banner"
        loading="lazy"
      />
    </div>
  </section>
</template>
