<script setup>
// import { ref, onMounted, watch } from "vue";
// import { useWebSocket } from "@vueuse/core";

// const tables = ref(null);

// const wsUrl = "ws://38.242.200.33:8855/ws/tables/?hall_number=1&floor=1"; // Replace with your WebSocket URL
// const { send, status, data, close } = useWebSocket(wsUrl, {
//   autoReconnect: true, // Optional: enable automatic reconnection
//   reconnectionDelay: 3000, // Optional: delay before trying to reconnect (in ms)
// });

// watch(data, (newData) => {
//   if (newData) {
//     try {
//       const parsedData = JSON.parse(newData);
//       tables.value = parsedData;
//     } catch (error) {
//       console.error("Error parsing JSON data:", error);
//     }
//   }
// });

// Function to send a message to the WebSocket server
// const sendMessage = () => {
//   send({
//     action: "filter",
//     booking_datetime: "2024-08-19T09:51:35.720",
//   });
//   console.log("asd");
// };

// Function to close the WebSocket connection
// const closeConnection = () => {
//   close();
// };

// import { ref, onMounted, onUnmounted } from "vue";

// const url = "ws://38.242.200.33:8855/ws/tables/?hall_number=1&floor=1"; // Replace with your WebSocket server URL
// const status = ref("Connecting...");
// const messages = ref([]);
// const inputMessage = ref("");
// let ws;

// const connectWebSocket = () => {
//   ws = new WebSocket(url);

//   ws.onopen = () => {
//     status.value = "Connected";
//   };

//   ws.onmessage = (event) => {
//     // messages.value.push(event.data);
//     console.log(typeof event.data);

//   };

//   ws.onclose = () => {
//     status.value = "Disconnected";
//   };

//   ws.onerror = (error) => {
//     console.error("WebSocket Error:", error);
//     status.value = "Error";
//   };
// };

// const sendMessage = () => {
//   if (ws && ws.readyState === WebSocket.OPEN) {
//     ws.send(inputMessage.value);
//     inputMessage.value = ""; // Clear the input field
//   } else {
//     status.value = "Connection is not open";
//   }
// };

// onMounted(() => {
//   connectWebSocket();
// });

// onUnmounted(() => {
//   if (ws) {
//     ws.close();
//   }
// });
</script>

<template>
  <div class="about">
    <h1>This is an about page</h1>
    <!-- <div>
      <p>Status: {{ status }}</p>
      <p>Message:<pre>{{ tables }}</pre></p>
    </div> -->
  </div>
</template>
