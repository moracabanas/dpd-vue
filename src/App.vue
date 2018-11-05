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
import Skills from './components/Skills.vue';
import Navbar from './components/Navbar.vue';
import Table from './components/Table.vue';

export default {
  name: 'app',
  components: {
    Skills,
    Navbar,
    Table
  }
}
</script>

<style>
</style>
