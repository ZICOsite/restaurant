<script setup>
import { postApi } from "@/services/api";
import { useAuthStore } from "@/stores/authStore";
import { useTableStore } from "@/stores/tableStore";

const emit = defineEmits(["modal-close", "booking-open", "modal-close"]);
const tableStore = useTableStore();
const authStore = useAuthStore();

const modals = () => {
  emit("booking-open", true);
  emit("modal-close", false);
};

const delBooking = async (id) => {
  try {
    await postApi.postDeleteBooking(`delete-booking/${id}/`);
  } catch (error) {
    console.error(error);
  }
};
</script>

<template>
  <Transition name="modal">
    <div class="modal" @click="$emit('modal-close', false)">
      <div class="modal__content container">
        <div class="modal__form" @click.stop>
          <div class="modal__form-item">
            <p class="modal__form-txt">
              Зал №{{ tableStore.table?.hall_number }} | Стол
              {{ tableStore.table?.table_number }}
            </p>
            <span class="modal__form-span"
              >на {{ tableStore.table?.table_type }} персон(ы)
            </span>
            <p class="modal__form-info" v-if="tableStore.table?.table_info.length">
              Забронирован на
              {{
                new Date(
                  tableStore.table?.table_info[0].booking_datetime
                ).toLocaleString()
              }}
            </p>
            <p
              class="modal__form-customer"
              v-if="tableStore.table?.table_info[0]?.customer"
            >
              <span v-if="tableStore.table?.table_info[0].special_event">🥳</span>
              Имя: {{ tableStore.table?.table_info[0]?.customer.name }} <br />
              Номер: +{{ tableStore.table?.table_info[0]?.customer.phone_number }}
            </p>
          </div>
          <button
            v-if="!tableStore.table?.table_info.length"
            :disabled="tableStore.table?.table_info.length"
            class="modal__form-btn"
            @click="modals"
          >
            Забронировать
          </button>
          <button
            v-if="authStore.accessToken && tableStore.table?.table_info.length"
            class="modal__form-btn _del"
            @click="delBooking(tableStore.table?.table_info[0]?.id)"
          >
            Убрать бронь
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>
