import {defineStore} from "pinia";
import {ref} from "vue";

export const useUiStore = defineStore("ui", () => {
    const routeMap: { [key: string]: number } = {
        "cv-view": 0,
        "home": 1,
        "game-galaxy-view": 2
    }
    const currentTransition = ref("")
    const updateMainViewTransition = (oldRoute: string, newRoute: string) => {
        if (routeMap[newRoute] > routeMap[oldRoute]) {
            currentTransition.value = "list-carousel-left"
        } else {
            currentTransition.value = "list-carousel-right"
        }
    }
    return {currentTransition, updateMainViewTransition}
})
