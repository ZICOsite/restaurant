<script setup>
import { firstFloorDataSorted } from "@/helpers/svgPath";
import { ref, onUnmounted, watchEffect, watch } from "vue";
import { useWebSocket } from "@vueuse/core";
import { useRouter } from "vue-router";
import { useTableStore } from "@/stores/tableStore";
import { useAuthStore } from "@/stores/authStore";

const props = defineProps({
  active: Object,
  scene: Number,
});

const tableStore = useTableStore();
const authStore = useAuthStore();
const router = useRouter();

const tables = ref(null);

const { send, status, data, close, open } = useWebSocket(
  `wss://${import.meta.env.VITE_API_SERVER_URL}/ws/tables/?hall_number=1&floor=1`,
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
    console.log(tableStore.dateISOFormat);

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
            xlink:href="@/assets/images/floor1/1.webp"
          ></image>
          <image
            v-else
            x="0"
            y="0"
            width="100%"
            height="100%"
            xlink:href="@/assets/images/floor1/back.webp"
          ></image>
          <rect
            width="100%"
            height="100%"
            fill-opacity="0"
            class="floor__canvas-overlay mask__overlay"
          ></rect>
          <path
            v-for="(item, index) in tables"
            :key="item.table_id"
            :d="
              scene ? firstFloorDataSorted[index].path : firstFloorDataSorted[index].path2
            "
            :id="firstFloorDataSorted[index].id"
            fill="white"
            fill-opacity="0.5"
            @click="
              $emit('modal-open', true, item),
                router.push({
                  query: {
                    id: firstFloorDataSorted[index].id,
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
                ? firstFloorDataSorted[index]?.rect.x
                : firstFloorDataSorted[index]?.rect.x2
            "
            :y="
              scene
                ? firstFloorDataSorted[index]?.rect.y
                : firstFloorDataSorted[index]?.rect.y2
            "
            :width="26"
            :height="26"
            :id="firstFloorDataSorted[index].id"
            :fill="
              firstFloorDataSorted[index]?.[
                authStore.accessToken
                  ? [item.special_event ? 'special_event' : item.status]
                  : [item.status]
              ]
            "
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
