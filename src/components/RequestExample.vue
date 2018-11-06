<template>
      <ul>
        <li v-for="cosa of cosas">
          <p><strong>{{cosa.id}}</strong></p>
          <p>{{cosa.ARTICLE_DESC}}</p>
        </li>
      </ul>
</template>


<script>

export default {
  name: 'RequestExmaple',
  data() {
    return {
      cosas: [],
      errors: []
    }
  },
  mounted() {
    axios
      .get('https://duties.dpd.com.pl/?option=com_duties&task=api.getShipments')
      .then(response => (this.cosas = response.data))
      .catch(error => {this.errors.push(error)})
    
      //disabled console log  .catch(error => console.log(error)) // eslint-disable-line no-console
  }
}
</script>

<style>
</style>
