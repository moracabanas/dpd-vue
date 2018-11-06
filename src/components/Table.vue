<template>
  <b-table striped hover :items="deliveries"></b-table>
</template>


<script>

export default {
  name: 'Table',
  data() {
    return {
      deliveries: [],
      errors: [],
      items: [
      ]
    }
  },
  mounted() {
    axios
      .get('https://duties.dpd.com.pl/?option=com_duties&task=api.getShipments')
      .then(response => (this.deliveries = response.data))
      .catch(error => {this.errors.push(error)})
      
    
      //disabled console log  .catch(error => console.log(error)) // eslint-disable-line no-console
  }
}
</script>

<style>
</style>
