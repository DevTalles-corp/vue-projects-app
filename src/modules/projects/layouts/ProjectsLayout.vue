<template>
  <div class="flex flex-col">
    <!-- Top Menu -->
    <top-menu />

    <main class="flex flex-row">
      <!-- Side Menu -->
      <side-menu />

      <!-- RouterView -->
      <router-view />
    </main>
  </div>
</template>

<script lang="ts" setup>
import TopMenu from '@/modules/common/components/TopMenu.vue';
import SideMenu from '../components/SideMenu.vue';
</script>
