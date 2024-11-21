<script setup lang="ts">
import ReloadPrompt from '@/components/ReloadPrompt.vue'
import { useRegisterSW } from 'virtual:pwa-register/vue'

const intervalMS = 5000 //  配置为每 5秒 检查一次service worker，做测试

onMounted(() => {
  useRegisterSW({
    immediate: true,
    onRegisteredSW(url, registration) {
      console.log('onRegisteredSW url', url)
      console.log('onRegisteredSW registration', registration)
      registration &&
        setInterval(() => {
          registration.update()
        }, intervalMS)
    },
  })
})
</script>

<template>
  <UserComponent></UserComponent>
  <!-- 使用ReloadPrompt -->
  <ReloadPrompt></ReloadPrompt>

  <div>hello hello hello hello</div>
</template>
