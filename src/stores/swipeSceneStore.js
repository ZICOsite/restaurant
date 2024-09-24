import { defineStore } from "pinia";

export const useSwipeSceneStore = defineStore("swipeScene", {
  state: () => ({
    scene: 1
  }),
  actions: {
    changeScene(scene) {
        // if (scene) this.scene = 1
        // else this.scene = 0
        this.scene = scene
    }
  },
});
