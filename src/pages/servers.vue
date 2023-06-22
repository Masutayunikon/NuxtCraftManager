<template>
  <NuxtLayout name="panel">
    <div>
      <button @click="router.push('/new_server')">create</button>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">

const router = useRouter();

</script>

<style scoped lang="scss">

</style>
