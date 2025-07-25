<script setup>
import { firstFloorData } from "@/helpers/svgPath";
import { onMounted, ref, watchEffect } from "vue";
import { useWebSocket } from "@vueuse/core";
import { useRouter } from "vue-router";
import { useTableStore } from "@/stores/tableStore";
import { useAuthStore } from "@/stores/authStore";
import { useSwipeSceneStore } from "@/stores/swipeSceneStore";

const props = defineProps({
  active: Object,
  scene: Number,
});

const tableStore = useTableStore();
const authStore = useAuthStore();
const router = useRouter();
const swipeSceneStore = useSwipeSceneStore();

const tables = ref(null);

const { send, status, data, close, open } = useWebSocket(
  `wss://${import.meta.env.VITE_API_SERVER_URL}/ws/tables/`,
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
  // send(
  //   JSON.stringify({
  //     action: "set_location",
  //     hall_number: "1",
  //     floor: "1",
  //   })
  // );
  if (data.value) {
    try {
      const parsedData = JSON.parse(data.value);
      tables.value = parsedData.data;
    } catch (error) {
      console.error("Error parsing JSON data:", error);
    }
  }
  if (tableStore.dateFormat) {
    try {
      const filter = {
        action: "filter",
        booking_datetime: tableStore.dateFormat,
      };
      send(JSON.stringify(filter));
    } catch (error) {
      console.error("Error", error);
    }
  }
});

onMounted(() => {
  send(
    JSON.stringify({
      action: "set_location",
      hall_number: "1",
      floor: "1",
    })
  );
});
</script>

<template>
  <div class="floor">
    <div class="floor__canvas">
      <div class="floor__canvas-visual">
        <svg
          viewBox="0 0 1920 953"
          preserveAspectRatio="xMidYMid slice"
          class="mask"
        >
          <image
            v-if="props.scene === 1"
            x="0"
            y="0"
            width="100%"
            height="100%"
            xlink:href="@/assets/images/floor1/First-Floor-Front.png"
          ></image>
          <image
            v-else
            x="0"
            y="0"
            width="100%"
            height="100%"
            xlink:href="@/assets/images/floor1/First-Floor-Back.png"
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
            v-tooltip="{
              value: authStore.accessToken
                ? `${item.customer_name ?? ''} ${item.customer_phone ?? ''}`
                : null,
              dt: {
                background: 'white',
                color: 'black',
                borderRadius: '15px',
              },
              class: 'custom-tooltip',
            }"
            :d="
              props.scene
                ? firstFloorData[index].path
                : firstFloorData[index].path2
            "
            :id="item.table_id"
            fill="white"
            fill-opacity="0.5"
            @click="
              $emit('modal-open', true, item),
                router.push({
                  query: {
                    id: item.table_id,
                    date: tableStore.date,
                  },
                })
            "
            :class="[
              {
                active: active?.table_id === item.table_id,
                disabled: !swipeSceneStore.blocked.firstFloor,
              },
              item.status,
            ]"
          />
          <rect
            v-for="(item, index) in tables"
            :key="item.table_id"
            :x="
              scene
                ? firstFloorData[index]?.rect.x
                : firstFloorData[index]?.rect.x2
            "
            :y="
              scene
                ? firstFloorData[index]?.rect.y
                : firstFloorData[index]?.rect.y2
            "
            :width="25"
            :height="25"
            :id="item.table_id"
            :fill="
              firstFloorData[index]?.[
                authStore.accessToken
                  ? [item.special_event ? 'special_event' : item.status]
                  : [item.status]
              ]
            "
          />
          <text
            v-for="(item, index) in tables"
            text-anchor="middle"
            :x="
              scene
                ? firstFloorData[index]?.rect.x
                : firstFloorData[index]?.rect.x2
            "
            :y="
              scene
                ? firstFloorData[index]?.rect.y
                : firstFloorData[index]?.rect.y2
            "
            font-size="16"
            fill="transparent"
            pointer-events="none"
          >
            <tspan style="text-transform: capitalize">
              {{ item.customer_name }}
            </tspan>
            <tspan
              :x="
                scene
                  ? firstFloorData[index]?.rect.x
                  : firstFloorData[index]?.rect.x2
              "
              dy="1rem"
            >
              {{ item.customer_phone }}
            </tspan>
          </text>
          <circle
            v-for="(item, index) in tables"
            :cx="
              scene
                ? firstFloorData[index]?.rect.x + 16
                : firstFloorData[index]?.rect.x2 + 16
            "
            :cy="
              scene
                ? firstFloorData[index]?.rect.y + 16
                : firstFloorData[index]?.rect.y2 + 16
            "
            r="18"
            fill="transparent"
            pointer-events="none"
            :class="item.status"
          />
          <text
            v-for="(item, index) in tables"
            text-anchor="middle"
            :x="
              scene
                ? firstFloorData[index]?.rect.x + 16
                : firstFloorData[index]?.rect.x2 + 16
            "
            :y="
              scene
                ? firstFloorData[index]?.rect.y + 23
                : firstFloorData[index]?.rect.y2 + 23
            "
            font-size="18"
            pointer-events="none"
            fill="transparent"
            class="number_chair"
          >
            {{ item.table_number }}
          </text>
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
    <Message
      v-if="!swipeSceneStore.blocked.firstFloor"
      class="floor__block-booking"
      severity="contrast"
      icon="pi pi-info-circle"
    >
      Бронирование отключено
    </Message>
  </div>
</template>
