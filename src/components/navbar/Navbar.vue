<script setup>
import { IconPhone, IconLogIn } from "@/helpers/icones";
</script>

<template>
  <div class="nav">
    <div class="container">
      <RouterLink to="/" class="nav__logo">
        <img src="/logo.svg" alt="" />
      </RouterLink>
      <ul class="nav__list">
        <li class="nav__item">
          <a href="tel:+998991080808" class="nav__link">+998 99-108-08-08</a>
        </li>
        <li class="nav__item nav__item_phone">
          <a href="tel:+998991080808" class="nav__icon">
            <IconPhone color="#fff" />
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>
