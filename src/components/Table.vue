<template>
    <div class="container-fluid">
        <p>{{info}}</p>
    </div>
</template>


<script>

export default {
  name: 'Table',
  data() {
    return {
      info: null
    }
  },
  mounted() {
    axios
      .get('https://duties.dpd.com.pl/?option=com_duties&task=api.getShipments')
      .then(response => (this.info = response))
      .catch(error => console.log(error)) // eslint-disable-line no-console
  }
}
</script>

<style>
</style>
