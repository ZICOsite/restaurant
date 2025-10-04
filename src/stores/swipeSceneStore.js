import { defineStore } from "pinia";

export const useSwipeSceneStore = defineStore("swipeScene", {
  state: () => ({
    scene: 1,
    blocked: {
      firstFloor: true,
      secondFloor: true,
    },
    floor: 1,
    seasonal: true,
  }),
  actions: {
    changeScene(scene) {
      this.scene = scene;
    },
    setBlocked(floor, boolean) {
      this.blocked[floor] = boolean;
    },
    switchBooking(floor) {
      this.blocked[floor] = !this.blocked[floor];
    },
    setFloor(floor) {
      this.floor = floor;
    },
    setSeasonal() {
      this.seasonal = !this.seasonal;
    },
  },
});
