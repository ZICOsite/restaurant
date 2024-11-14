<script setup>
import { onMounted, ref } from "vue";
import { eventApi } from "@/services/api.js";
import { IconLocation } from "@/helpers/icones.js";
import { useRoute } from "vue-router";

const route = useRoute();

const event = ref(null);
const getDateFormat = ref(null);
const notFound = ref("");

const getEvents = async () => {
  try {
    const { data } = await eventApi.getEvents(
      `authentication/events/${route.params.id}`
    );
    event.value = data;
    let options = {
      month: "long",
      day: "numeric",
    };
    getDateFormat.value = new Intl.DateTimeFormat("ru-RU", options).format(
      new Date(data.date)
    );
  } catch (error) {
    console.error("Error", error);
    notFound.value = error;
  }
};

onMounted(() => {
  getEvents();
});
</script>

<template>
  <section class="events">
    <div class="events__content" v-if="!notFound">
      <div class="events__content-info">
        <p class="events__content-date">{{ getDateFormat }}</p>
        <a
          :href="event?.location"
          class="events__content-location"
          target="_blank"
        >
          <IconLocation />Bier Regen Pub
        </a>
        <p class="events__content-time">
          Время: {{ event?.time.replace(/:00$/, "") }}
        </p>
        <div class="events__content-numbers">
          <span>Номер:</span>
          <a href="tel:+998712059808" class="events__content-number"
            >+998712059808</a
          >
        </div>
        <p class="events__content-guest">Гость: {{ event?.guest_name }}</p>
        <a
          href="https://t.me/BierRegenPub"
          target="_blank"
          class="events__content-btn"
          >Купить билеты
        </a>
      </div>
      <img
        :src="event?.image"
        :alt="event?.guest_name"
        class="events__content-banner"
        loading="lazy"
      />
    </div>
    <h2 v-else style="text-align: center; font-weight: 500; margin-top: 30px;">Событий нет</h2>
  </section>
</template>
