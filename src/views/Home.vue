<template>
  <div class="home">
    <div class="container-fluid">
      <MobileDetails/>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import MobileDetails from "@/components/MobileDetails.vue";

export default {
  name: "home",
  components: {
    MobileDetails
  }
};
</script>
