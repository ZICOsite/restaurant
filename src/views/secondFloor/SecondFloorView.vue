<script setup>
import { secondFloorDataSorted } from "@/helpers/svgPath";
import { useWebSocket } from "@vueuse/core";
import { onUnmounted, watchEffect } from "vue";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useTableStore } from "@/stores/tableStore";

const props = defineProps({
  active: Object,
  scene: Number,
});

const tableStore = useTableStore();
const router = useRouter();

const tables = ref(null);

const { send, status, data, close, open } = useWebSocket(
  `wss://${import.meta.env.VITE_API_SERVER_URL}/ws/tables/?hall_number=1&floor=2`,
  {
    autoReconnect: {
      retries: 3,
      delay: 1000,
      onFailed() {
        alert("Failed to connect WebSocket after 3 retries");
      },
    },
  }
);

watchEffect(() => {
  if (data.value) {
    try {
      const parsedData = JSON.parse(data.value);
      tables.value = parsedData.data;
    } catch (error) {
      console.error("Error parsing JSON data:", error);
    }
  }
  if (tableStore.dateISOFormat) {
    try {
      const filter = {
        action: "filter",
        booking_datetime: tableStore.dateISOFormat,
      };
      send(JSON.stringify(filter));
    } catch (error) {
      console.log("Error", error);
    }
  }
});

onUnmounted(() => {
  close();
});
</script>

<template>
  <div class="floor">
    <div class="floor__canvas">
      <div class="floor__canvas-visual">
        <svg viewBox="0 0 1920 953" preserveAspectRatio="xMidYMid slice" class="mask">
          <image
            v-if="scene === 1"
            x="0"
            y="0"
            width="100%"
            height="100%"
            xlink:href="@/assets/images/floor2/1.webp"
          ></image>
          <image
            v-else
            x="0"
            y="0"
            width="100%"
            height="100%"
            xlink:href="@/assets/images/floor2/back.webp"
          ></image>
          <rect
            width="100%"
            height="100%"
            fill-opacity="0"
            class="floor__canvas-overlay mask__overlay"
          ></rect>
          <path
            v-for="(item, index) in tables"
            :key="item.id"
            :d="
              scene
                ? secondFloorDataSorted[index].path
                : secondFloorDataSorted[index].path2
            "
            :id="secondFloorDataSorted[index].id"
            v-tooltip="{
              value: item.active_bookings_count
                ? `Кол-во броней: ${item.active_bookings_count} `
                : '',
              dt: {
                background: 'white',
                color: 'black',
                borderRadius: '20px',
              },
            }"
            fill="white"
            fill-opacity="0.5"
            @click="
              $emit('modal-open', true, item),
                router.push({
                  query: {
                    id: secondFloorDataSorted[index].id,
                    date: tableStore.date,
                  },
                })
            "
            :class="[
              {
                active: active?.table_id === item.table_id,
              },
              item.status,
            ]"
          />
          <rect
            v-for="(item, index) in tables"
            :key="item.table_id"
            :x="
              scene
                ? secondFloorDataSorted[index].rect.x
                : secondFloorDataSorted[index].rect.x2
            "
            :y="
              scene
                ? secondFloorDataSorted[index].rect.y
                : secondFloorDataSorted[index].rect.y2
            "
            :width="26"
            :height="26"
            :id="secondFloorDataSorted[index].id"
            :fill="secondFloorDataSorted[index][item.status]"
          />
          <defs>
            <pattern
              id="pattern0_284_4"
              patternContentUnits="objectBoundingBox"
              width="1"
              height="1"
            >
              <use xlink:href="#image0_284_4" transform="scale(0.00195312)" />
            </pattern>
            <pattern
              id="pattern1_284_4"
              patternContentUnits="objectBoundingBox"
              width="1"
              height="1"
            >
              <use xlink:href="#image1_284_4" transform="scale(0.00195312)" />
            </pattern>
            <pattern
              id="pattern2_284_4"
              patternContentUnits="objectBoundingBox"
              width="1"
              height="1"
            >
              <use xlink:href="#image2_284_4" transform="scale(0.00195312)" />
            </pattern>
            <image
              id="image0_284_4"
              width="512"
              height="512"
              xlink:href="@/assets/images/lock.svg"
            />
            <image
              id="image1_284_4"
              width="512"
              height="512"
              xlink:href="@/assets/images/hb.svg"
            />
            <image
              id="image2_284_4"
              width="512"
              height="512"
              xlink:href="@/assets/images/add.svg"
            />
          </defs>
        </svg>
      </div>
    </div>
  </div>
</template>
