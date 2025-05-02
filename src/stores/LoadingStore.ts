import { defineStore } from 'pinia'
import { Ref, ref } from 'vue'

export const useLoadingStore = defineStore('loading', () => {
    const isLoading : Ref<boolean> = ref(false)
    const startTime : Ref<number> = ref(0)

    const minDuration : Ref<number> = ref(500)
  
    function startLoading() {
        isLoading.value = true
        startTime.value = Date.now()
    }
  
    function endLoading() {
        const elapsed = Date.now() - startTime.value
        const remaining = minDuration.value - elapsed

        if (remaining > 0) {
            setTimeout(() => {
            isLoading.value = false
            }, remaining)

        } else {
            isLoading.value = false
        }
    }
  
    return {
      isLoading,
      startLoading,
      endLoading,
    }
})