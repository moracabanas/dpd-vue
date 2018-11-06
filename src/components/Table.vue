<template>
  <b-table striped hover :items="shipments" :fields="fields"></b-table>
</template>


<script>

export default {
  name: 'Table',
  data() {
    return {
      fields: [
        {
          key: 'import_date',
          label: 'Date',
          sortable: true
        },
        {
          key: 'MASTER_PARCEL_ID',
          label: 'Shipment',
          sortable: false
        },
        {
          key: 'SHIPPER_COUNTRY',
          label: 'From',
          // Variant applies to the whole column, including the header and footer
          //variant: 'danger'
        },
        {
          key: 'CONSIGNEE_COUNTRY',
          label: 'To'
        },
        {
          key: 'ARTICLE_DESC',
          label: 'Description',
          sortable: true
        },
        {
          key: 'CONSIGNEE_SIRET',
          label: 'B2B',
          formatter: value => {return (value ? 'B2B' : '') }
        },
      ],
      shipments: [],
      errors: [],
    }
  },
  mounted() {
    axios
      .get('https://duties.dpd.com.pl/?option=com_duties&task=api.getShipments')
      .then(response => (this.shipments = response.data))
      .catch(error => {this.errors.push(error)})
      
    
      //disabled console log  .catch(error => console.log(error)) // eslint-disable-line no-console
  }
}
</script>

<style>
</style>
