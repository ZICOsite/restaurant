<script setup>
import { onMounted, ref } from "vue";
import { eventApi } from "@/services/api.js";
import DatePicker from "primevue/datepicker";
import { useToast } from "primevue/usetoast";
import Toast from "primevue/toast";
import { formatDate } from "@/helpers/currentDate";
import { useConfirm } from "primevue/useconfirm";
import ConfirmDialog from "primevue/confirmdialog";

const toast = useToast();
const confirm = useConfirm();
const events = ref(null);
const create = ref(false);
const edit = ref(false);
const fileupload = ref();
const eventSingle = ref(null);

const createEvent = ref({
  date: "",
  location: "",
  phone_number: null,
  guest_name: "",
  image: null,
});

const onFileSelect = (event) => {
  // Сохраняем выбранный файл в createEvent.
  createEvent.value.image = event.files[0];
};

const setEvent = async () => {
  const getFormatTime = `${new Date(
    createEvent.value.date
  ).getHours()}:${String(
    new Date(createEvent.value.date).getMinutes()
  ).padStart(2, "0")}:00`;

  const eventData = {
    date: formatDate(createEvent.value.date, "table-detail"),
    time: getFormatTime,
    location: createEvent.value.location,
    phone_number: createEvent.value.phone_number,
    guest_name: createEvent.value.guest_name,
    image: createEvent.value.image,
  };

  try {
    await eventApi.createEvent("authentication/events/", eventData);
    toast.add({
      severity: "success",
      summary: "Success",
      detail: "File Uploaded",
      life: 3000,
    });
    getEvents();
    createEvent.value.date = "";
    createEvent.value.location = "";
    createEvent.value.phone_number = "";
    createEvent.value.guest_name = "";
    createEvent.value.image = "";
    create.value = false;
  } catch (error) {
    console.error("Error", error);
  }
};

const getEvents = async () => {
  try {
    const { data } = await eventApi.getEvents("authentication/events/");
    events.value = data;
  } catch (error) {
    console.error("Error", error);
  }
};

const getSingleEvent = async (id) => {
  try {
    const { data } = await eventApi.getSingleEvent(
      `/authentication/events/${id}/`
    );
    eventSingle.value = data;
    edit.value = true;
  } catch (error) {
    console.error("Error", error);
  }
};

const editEvent = async (id) => {
  const getFormatTime = `${new Date(
    eventSingle.value.date
  ).getHours()}:${String(
    new Date(eventSingle.value.date).getMinutes()
  ).padStart(2, "0")}:00`;

  const eventData = {
    date: formatDate(new Date(eventSingle.value.date), "table-detail"),
    time: getFormatTime,
    location: eventSingle.value.location,
    phone_number: eventSingle.value.phone_number,
    guest_name: eventSingle.value.guest_name,
    image: createEvent.value.image
  };
  
  try {
    await eventApi.editEvent(`authentication/events/${id}/`, eventData);
    edit.value = false;
    toast.add({
      severity: "success",
      summary: "Успешно",
      detail: "Событие изменено",
      life: 3000,
    });
    getEvents();
  } catch (error) {
    console.error("Error", error);
  }
};

const deleteEvent = async (id) => {
  try {
    confirm.require({
      message: "Вы хотите удалить эту запись?",
      header: "Вы уверены?",
      icon: "pi pi-info-circle",
      rejectLabel: "Назад",
      rejectProps: {
        label: "Назад",
        severity: "secondary",
        outlined: true,
      },
      acceptProps: {
        label: "Удалить",
        severity: "danger",
      },
      accept: async () => {
        await eventApi.deleteEvent(`authentication/events/${id}/`);
        getEvents();
        toast.add({
          severity: "info",
          summary: "Подтверждено",
          detail: "Запись удалена",
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
  } catch (error) {
    console.error("Error", error);
  }
};

onMounted(() => {
  getEvents();
});
</script>

<template>
  <section class="event">
    <div class="event__top">
      <h2 class="event__title">Мероприятия</h2>
      <Button label="Создать" @click="create = true" />
    </div>
    <div class="event__cards">
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
          <div class="event__btns">
            <Button
              label="Изменить"
              severity="contrast"
              @click="getSingleEvent(item.id)"
              class="event__btn"
            />
            <Button
              label="Удалить"
              severity="danger"
              class="event__btn"
              @click="deleteEvent(item.id)"
            />
          </div>
        </template>
      </Card>
    </div>
    <Dialog
      v-model:visible="create"
      modal
      header="Создание события"
      :style="{ width: '30rem' }"
      class="dialog dialog-create"
    >
      <form class="dialog__form event__form" @submit.prevent="setEvent">
        <DatePicker
          v-model="createEvent.date"
          showIcon
          iconDisplay="input"
          showTime
          hourFormat="24"
        >
          <template #inputicon="slotProps">
            <i class="pi pi-calendar-clock" @click="slotProps.clickCallback" />
          </template>
        </DatePicker>
        <InputText
          v-model.trim="createEvent.location"
          placeholder="Локация (ссылка)"
        />
        <InputText
          v-model="createEvent.phone_number"
          placeholder="Номер телефона"
        />
        <InputText
          v-model.trim="createEvent.guest_name"
          placeholder="Имя гостя"
        />
        <FileUpload
          ref="fileupload"
          mode="basic"
          accept="image/*"
          customUpload
          :maxFileSize="1000000"
          @select="onFileSelect"
          class="event__file"
        />
        <Button
          label="Добавить"
          severity="contrast"
          type="submit"
          :disabled="
            createEvent.date == '' ||
            createEvent.location == '' ||
            createEvent.guest_name == ''
          "
        />
      </form>
    </Dialog>
    <Dialog
      v-model:visible="edit"
      modal
      header="Редактировать события"
      :style="{ width: '30rem' }"
      class="dialog dialog-create"
    >
      <form
        class="dialog__form event__form"
        @submit.prevent="editEvent(eventSingle?.id)"
      >
        <DatePicker
          v-model="eventSingle.date"
          showIcon
          iconDisplay="input"
          showTime
          hourFormat="24"
        >
          <template #inputicon="slotProps">
            <i class="pi pi-calendar-clock" @click="slotProps.clickCallback" />
          </template>
        </DatePicker>
        <InputText
          v-model.trim="eventSingle.location"
          placeholder="Локация (ссылка)"
        />
        <InputText
          v-model="eventSingle.phone_number"
          placeholder="Номер телефона"
        />
        <InputText
          v-model.trim="eventSingle.guest_name"
          placeholder="Имя гостя"
        />
        <FileUpload
          ref="fileupload"
          mode="basic"
          accept="image/*"
          customUpload
          :maxFileSize="1000000"
          @select="onFileSelect"
          class="event__file"
        />
        <Button label="Изменить" severity="contrast" type="submit" />
      </form>
    </Dialog>
    <Toast position="top-right" />
    <ConfirmDialog></ConfirmDialog>
  </section>
</template>

<style lang="scss" scoped>
.event {
  &__title {
    color: #000;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 30px;
    margin-bottom: 30px;
  }

  &__cards {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 30px;
  }

  &__btns {
    display: flex;
    gap: 12px;

    button {
      width: 100%;
    }
  }

  &__form {
    display: grid;
    gap: 16px;

    .p-fileupload {
      justify-content: flex-start;
    }
  }
}
</style>
