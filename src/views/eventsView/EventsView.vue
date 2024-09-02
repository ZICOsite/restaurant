<script setup>
import { IconLocation } from "../../helpers/icones.js";
</script>

<template>
  <section class="events">
    <div class="container">
      <h2 class="events__title">Событие</h2>
      <div class="events__content">
        <div class="events__content-info">
          <p class="events__content-date">
            <span class="events__content-span">02</span>
            Ноября
          </p>
          <a
            href="https://www.google.com/maps/place/Bier+Regen+Pub/@41.3069923,69.3018235,17z/data=!3m1!4b1!4m6!3m5!1s0x38aef526a17cb15d:0x15fc30f964f00ac3!8m2!3d41.3069883!4d69.3043984!16s%2Fg%2F1tdgss8p?entry=ttu&g_ep=EgoyMDI0MDgyOC4wIKXMDSoASAFQAw%3D%3D"
            class="events__content-location"
            target="_blank"
            ><IconLocation />Bier Regen Pub</a
          >
          <p class="events__content-time">Время: 20:00</p>
          <div class="events__content-numbers">
            <span>Номер:</span>
            <a href="tel:+998991080808" class="events__content-number">
              +(998)99 108 08 08
            </a>
            <a href="+998712059808" class="events__content-number">+(998)71 205 98 08</a>
          </div>
          <p class="events__content-guest">Гость: <strong>Александр Панайотов</strong></p>
          <a href="https://t.me/BierRegenPub" target="_blank" class="events__content-btn"
            >Купить билеты</a
          >
        </div>
        <picture>
          <source media="(max-width: 1315px)" srcset="@/assets/images/events/1.png" />
          <img
            src="@/assets/images/events/big.png"
            alt=""
            class="events__content-banner"
            loading="lazy"
          />
        </picture>
      </div>
    </div>
  </section>
</template>
