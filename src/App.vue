<template>
  <div id="app">
    <Navbar/>
    <div class="container-fluid">
      <div class="row-fluid">
        <Table/>
      </div>
    </div>

  </div>
</template>

<script>
import Navbar from './components/Navbar.vue';
import Table from './components/Table.vue';

export default {
  name: 'app',
  components: {
    Navbar,
    Table
  }
}
</script>

<style>
</style>
