<script setup>
import { menuApi } from "@/services/api";
import Select from "primevue/select";
import { onMounted, ref, watch } from "vue";
import { useToast } from "primevue/usetoast";
import Toast from "primevue/toast";

const toast = useToast();
const menu = ref(null);
const create = ref(false);
const selectedLang = ref();
const loading = ref(false);
const isError = ref(false);

const lang = [
  { name: "UZ", code: "UZ" },
  { name: "RU", code: "RU" },
  { name: "EN", code: "EN" },
];

const menuData = ref({
  file: null,
});

const onFileSelect = (event) => {
  menuData.value.file = event.files[0];
};

const getMenu = async () => {
  try {
    const { data } = await menuApi.getMenu("authentication/menu/");

    menu.value = data;
  } catch (error) {
    console.error("Error", error);
  }
};

const createMenu = async () => {
  const dataMenu = {
    lang: selectedLang.value?.code,
    file: menuData.value.file,
  };
  loading.value = true;

  try {
    await menuApi.createMenu("authentication/menu-create/", dataMenu);
    toast.add({
      severity: "success",
      summary: "Success",
      detail: "File Uploaded",
      life: 3000,
    });
    getMenu();
    selectedLang.value = "";
    menuData.value.file = "";
    create.value = false;
    loading.value = false;
    error.value = false;
  } catch (error) {
    console.error("Error", error);
    loading.value = false;
    isError.value = true;
  }
};

onMounted(() => {
  getMenu();
});
</script>

<template>
  <section class="menu">
    <div class="menu__top">
      <h2 class="menu__title">PDF файлы меню</h2>
      <Button label="Создать" @click="create = true" />
    </div>
    <ul class="menu__list">
      <li class="menu__list-item" v-for="item in menu" :key="item.id">
        <a
          class="menu__list-link"
          :href="`https://api.bierregen.pub${item.file}`"
          target="_blank"
          >Меню на {{ item.lang }}
        </a>
      </li>
    </ul>
    <Dialog
      v-model:visible="create"
      modal
      header="Добавить/изменить меню"
      :style="{ width: '30rem' }"
      class="dialog dialog-create"
    >
      <form class="dialog__form menu__form" @submit.prevent="createMenu">
        <Select
          v-model="selectedLang"
          :options="lang"
          optionLabel="name"
          placeholder="Выберите язык"
        />
        <FileUpload
          ref="fileupload"
          mode="basic"
          customUpload
          :maxFileSize="100000000"
          @select="onFileSelect"
          class="menu__file"
        />
        <Button
          label="Добавить"
          severity="contrast"
          type="submit"
          :loading="loading"
          :disabled="menuData.lang == '' || menuData.file == null"
        />
        <h2 v-if="isError" style="font-weight: 500">
          Файл должен иметь расширение pdf
        </h2>
      </form>
    </Dialog>
    <Toast position="top-right" />
  </section>
</template>

<style lang="scss" scoped>
.menu {
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

  &__list {
    display: grid;
    gap: 8px;

    &-link {
      display: inline-block;
      background: orangered;
      color: #fff;
      padding: 8px 16px;
      border-radius: 6px;
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
