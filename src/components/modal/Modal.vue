<script setup>
import { putApi, patchApi } from "@/services/api";
import { useAuthStore } from "@/stores/authStore";
import { useTableStore } from "@/stores/tableStore";
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";
import ConfirmDialog from "primevue/confirmdialog";
import Toast from "primevue/toast";
import { IconCake } from "@/helpers/icones";
import { ref } from "vue";

const emit = defineEmits(["modal-close", "booking-open"]);

const authStore = useAuthStore();
const confirm = useConfirm();
const toast = useToast();

const tableStore = useTableStore();

const pledge_comment = ref(false);
const pledge_comment_value = ref("");

const modals = () => {
  emit("booking-open", true);
  emit("modal-close", false);
};

const pladgeComment = async () => {
  try {
    await patchApi.patchPladgeComment(
      `add-pledge-comment/${tableStore.table?.table_info[0]?.id}/`,
      pledge_comment_value.value
    );
    toast.add({
      severity: "success",
      summary: "Подтверждено",
      detail: "Залог добавлен",
      life: 3000,
    });
    pledge_comment.value = false;
    pledge_comment_value.value = "";
  } catch (error) {
    console.error("Error:", error);
  }
};

const statusBooking = (id, status) => {
  try {
    if (status == "completed") {
      confirm.require({
        message: "Вы хотите завершить бронь?",
        header: "Вы уверены?",
        icon: "pi pi-info-circle",
        rejectLabel: "Назад",
        rejectProps: {
          label: "Назад",
          severity: "secondary",
          outlined: true,
        },
        acceptProps: {
          label: "Завершить",
          severity: "success",
        },
        accept: async () => {
          await putApi.putBooking(`update-booking/${id}/`, status);
          emit("modal-close", false);
          toast.add({
            severity: "success",
            summary: "Подтверждено",
            detail: "Запись завершен",
            life: 3000,
          });
        },
        reject: () => {
          toast.add({
            severity: "error",
            summary: "Отклонено",
            detail: "Вы отклонили",
            life: 3000,
          });
        },
      });
    } else {
      confirm.require({
        message: "Вы хотите убрать бронь?",
        header: "Вы уверены?",
        icon: "pi pi-info-circle",
        rejectLabel: "Назад",
        rejectProps: {
          label: "Назад",
          severity: "secondary",
          outlined: true,
        },
        acceptProps: {
          label: "Убрать",
          severity: "danger",
        },
        accept: async () => {
          await putApi.putBooking(`update-booking/${id}/`, status);
          emit("modal-close", false);
          toast.add({
            severity: "info",
            summary: "Подтверждено",
            detail: "Запись удалён",
            life: 3000,
          });
        },
        reject: () => {
          toast.add({
            severity: "error",
            summary: "Отклонено",
            detail: "Вы отклонили",
            life: 3000,
          });
        },
      });
    }
  } catch (error) {
    console.error(error);
  }
};
</script>

<template>
  <Transition name="modal">
    <div class="modal" @click="$emit('modal-close', false)">
      <div class="modal__content">
        <div class="modal__form" @click.stop>
          <div class="modal__form-item">
            <p class="modal__form-txt">
              Зал №{{ tableStore.table?.hall_number }} | Стол
              {{ tableStore.table?.table_number }}
            </p>
            <span class="modal__form-span">
              на {{ tableStore.table?.table_type }} персон(ы)
            </span>
            <p
              class="modal__form-info"
              v-if="tableStore.table?.table_info.length"
            >
              Забронирован на
              {{
                authStore.accessToken
                  ? new Date(
                      tableStore.table?.table_info[0].booking_datetime
                    ).toLocaleString()
                  : new Date(
                      tableStore.table?.table_info[0].booking_datetime
                    ).toLocaleDateString()
              }}
            </p>
            <p
              class="modal__form-customer"
              v-if="authStore.accessToken && tableStore.table?.table_info[0]"
            >
              <span v-if="tableStore.table?.table_info[0].special_event">
                <IconCake />
              </span>
              Имя: {{ tableStore.table?.table_info[0]?.name }} <br />
              Номер: +{{ tableStore.table?.table_info[0]?.phone_number }} <br />
              Комментария:
              {{ tableStore.table?.table_info[0]?.customer_comment ?? "Пусто" }}
              <br />
              Залог:
              {{ tableStore.table?.table_info[0]?.pledge_comment ?? "Пусто" }}
            </p>
          </div>
          <button
            v-if="!tableStore.table?.table_info.length"
            class="modal__form-btn"
            @click="modals"
          >
            Забронировать
          </button>
          <button
            v-if="authStore.accessToken && tableStore.table?.table_info.length"
            class="modal__form-btn"
            @click="
              statusBooking(tableStore.table?.table_info[0]?.id, 'completed')
            "
          >
            Завершить бронь
          </button>
          <button
            v-if="authStore.accessToken && tableStore.table?.table_info.length"
            class="modal__form-btn _del"
            @click="
              statusBooking(tableStore.table?.table_info[0]?.id, 'cancelled')
            "
          >
            Отменить бронь
          </button>
          <button
            v-if="authStore.accessToken && tableStore.table?.table_info.length"
            class="modal__form-btn _pledge"
            @click="pledge_comment = true"
          >
            Указать залог
          </button>
        </div>
      </div>
    </div>
  </Transition>
  <Toast position="top-center" />
  <ConfirmDialog></ConfirmDialog>
  <Dialog
    v-model:visible="pledge_comment"
    modal
    header="Указать залог"
    :style="{ width: '25rem' }"
  >
    <InputText
      autocomplete="off"
      v-model="pledge_comment_value"
      class="pledge_comment_value"
    />
    <div class="pledge_btns">
      <Button
        type="button"
        label="Cancel"
        severity="secondary"
        @click="pledge_comment = false"
      ></Button>
      <Button type="button" label="Save" @click="pladgeComment"></Button>
    </div>
  </Dialog>
</template>
