<script setup>
import { getApi, postApi, patchApi, delApi } from "@/services/api";
import { onMounted, ref } from "vue";
import { useToast } from "primevue/usetoast";
import Toast from "primevue/toast";
import { useConfirm } from "primevue/useconfirm";
import ConfirmDialog from "primevue/confirmdialog";

const confirm = useConfirm();
const toast = useToast();

const hostessesList = ref(null);
const hostesInfo = ref(null);
const loading = ref(true);
const create = ref(false);
const edit = ref(false);

const createFormValues = ref({
  username: "",
  first_name: "",
  last_name: "",
  phone_number: null,
  password: "",
});

const geHostessesList = async () => {
  try {
    const { data } = await getApi.getHostessesList("authentication/hostesses/");
    hostessesList.value = data;
  } catch (error) {
    console.error("Error hostesses data", error);
  } finally {
    loading.value = false;
  }
};

const createHostesUser = async () => {
  try {
    await postApi.postHostesUser("authentication/hostesses/", createFormValues.value);
    toast.add({
      severity: "success",
      summary: "Успешно",
      detail: "Пользователь добавлен",
      life: 3000,
    });
    create.value = false;
    geHostessesList();
  } catch (error) {
    console.error("Error new user", error);
  }
};

const getHostesId = async (id) => {
  try {
    const { data } = await getApi.getHostesId(`authentication/hostesses/${id}/`);
    hostesInfo.value = data;
    edit.value = true;
  } catch (error) {
    console.error("Error hostes info", error);
  }
};

const editHostesUser = async (id) => {
  try {
    await patchApi.patchHostesUser(`/authentication/hostesses/${id}/`, hostesInfo.value);
    toast.add({
      severity: "success",
      summary: "Успешно",
      detail: "Пользователь изменён",
      life: 3000,
    });
    edit.value = false;
    geHostessesList();
  } catch (error) {
    console.error("Error edit user", error);
  }
};

const delHostesUser = (id) => {
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
        await delApi.deleteHostesUser(`authentication/hostesses/${id}/`);
        geHostessesList();
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
    console.error("Error delete hostes user", error);
  }
};

onMounted(() => {
  geHostessesList();
});
</script>

<template>
  <section class="admin-settings">
    <div class="admin-settings__content">
      <div class="admin-hostes">
        <div class="admin-hostes__top">
          <h2 class="admin-hostes__title">Пользователи хостеса</h2>
          <Button label="Создать" @click="create = true" />
        </div>
        <DataTable
          :value="hostessesList"
          tableStyle="min-width: 50rem"
          stripedRows
          :loading="loading"
        >
          <template #empty> Хостес не найден. </template>
          <template #loading> Загрузка данных. Пожалуйста, подождите. </template>
          <Column field="id" header="ID" style="width: 5%">
            <template #body="{ data }"> #{{ data.id }} </template>
          </Column>
          <Column field="username" header="Логин" style="width: 5%"></Column>
          <Column field="first_name" header="Имя" style="width: 5%"></Column>
          <Column field="last_name" header="Фамилия" style="width: 5%"></Column>
          <Column field="phone_number" header="Номер телефона" style="width: 5%"></Column>
          <Column header="Изменить" style="width: 5%">
            <template #body="{ data }">
              <Button
                @click="getHostesId(data.id)"
                icon="pi pi-user-edit"
                severity="info"
              />
            </template>
          </Column>
          <Column header="Удалить" style="width: 5%">
            <template #body="{ data }">
              <Button
                icon="pi pi-trash"
                severity="danger"
                @click="delHostesUser(data.id)"
              />
            </template>
          </Column>
        </DataTable>
      </div>
    </div>
    <Toast position="top-center" />
    <ConfirmDialog></ConfirmDialog>
    <Dialog
      v-model:visible="create"
      modal
      header="Cоздание хостеса"
      :style="{ width: '25rem' }"
      class="dialog dialog-create"
    >
      <form class="dialog__form" @submit.prevent="createHostesUser()">
        <div class="dialog__input">
          <label for="username">Логин</label>
          <InputText
            id="username"
            autocomplete="off"
            v-model.trim="createFormValues.username"
          />
        </div>
        <div class="dialog__input">
          <label for="first_name">Имя</label>
          <InputText
            id="first_name"
            autocomplete="off"
            v-model.trim="createFormValues.first_name"
          />
        </div>
        <div class="dialog__input">
          <label for="last_name">Фамилия</label>
          <InputText
            id="last_name"
            autocomplete="off"
            v-model.trim="createFormValues.last_name"
          />
        </div>
        <div class="dialog__input">
          <label for="phone_number">Номер телефона</label>
          <InputNumber
            id="phone_number"
            autocomplete="off"
            :useGrouping="false"
            v-model.trim="createFormValues.phone_number"
          />
        </div>
        <div class="dialog__input">
          <label for="password">Пароль</label>
          <InputText
            id="password"
            autocomplete="off"
            v-model.trim="createFormValues.password"
          />
        </div>
        <div class="dialog__btns">
          <Button
            type="reset"
            label="Назад"
            severity="secondary"
            @click="create = false"
          ></Button>
          <Button
            type="submit"
            label="Создать"
            :disabled="
              createFormValues.first_name == '' ||
              createFormValues.last_name == '' ||
              createFormValues.username == '' ||
              createFormValues.password == '' ||
              createFormValues.phone_number == ''
            "
          ></Button>
        </div>
      </form>
    </Dialog>
    <Dialog
      v-model:visible="edit"
      modal
      :style="{ width: '25rem' }"
      class="dialog dialog-edit"
    >
      <template #header>
        <div class="dialog__top">
          <Button
            icon="pi pi-user"
            severity="info"
            rounded
            outlined
            aria-label="User"
            style="flex-shrink: 0"
          />
          <span>{{ hostesInfo.username }}</span>
        </div>
      </template>
      <form
        action=""
        class="dialog__form"
        @submit.prevent="editHostesUser(hostesInfo?.id)"
      >
        <div class="dialog__input">
          <label for="edit_first_name">Имя</label>
          <InputText id="first_name" autocomplete="off" v-model="hostesInfo.first_name" />
        </div>
        <div class="dialog__input">
          <label for="edit_last_name">Фамилия</label>
          <InputText id="last_name" autocomplete="off" v-model="hostesInfo.last_name" />
        </div>
        <div class="dialog__input">
          <label for="edit_phone_number">Номер телефона</label>
          <InputText
            id="edit_phone_number"
            autocomplete="off"
            v-model="hostesInfo.phone_number"
          />
        </div>
        <div class="dialog__input">
          <label for="edit_password">Пароль</label>
          <InputText
            id="edit_password"
            autocomplete="off"
            v-model="hostesInfo.password"
            placeholder="Необязательное поле"
          />
        </div>
        <div class="dialog__btns">
          <Button
            type="reset"
            label="Назад"
            severity="secondary"
            @click="edit = false"
          ></Button>
          <Button type="submit" label="Изменить"></Button>
        </div>
      </form>
    </Dialog>
  </section>
</template>
