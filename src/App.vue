<template>
  <div id="app">
    <div class="container-fluid">
      <MobileDetails/>
      <div class="row-fluid"></div>
    </div>
  </div>
</template>

<script>
import MobileDetails from "./components/MobileDetails.vue";

export default {
  name: "app",
  components: {
    MobileDetails
  }
};
</script>

<style>
</style>
