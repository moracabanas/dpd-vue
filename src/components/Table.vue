<template>
  <b-table 

  v-if="tableIsReady"

  :items="shipments" 
  :fields="fields"
  :per-page="recordsPerPage"

  responsive flex striped hover

  @row-clicked="expandAdditionalInfo"
  

  >

  <template slot="row-details" slot-scope="row"> <!-- https://stackoverflow.com/questions/52327549/bootstrap-vue-table-show-details-when-row-clicked -->
    <b-card>
      <h1>hello</h1>
    </b-card>
  </template>
  
  </b-table>
</template>


<script>

export default {
  name: 'Table',
  data() {
    return {
      tableIsReady: true,
      recordsPerPage: 10,
      shipments: [],
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
      errors: [],
    }
  },
  methods: {
    expandAdditionalInfo(row) 
    {
      row._showDetails = !row._showDetails;
      console.log(row);
    }
  },
  mounted() {
    axios
      .get('https://duties.dpd.com.pl/?option=com_duties&task=api.getShipments')
      .then(response => {
        response.data.forEach(element => {
          element._showDetails = false;
        });
        console.log(response.data);
        this.shipments = response.data;

      })
      .catch(error => {this.errors.push(error)})
      
    
      //disabled console log  .catch(error => console.log(error)) // eslint-disable-line no-console
  }
}
</script>

<style>
</style>
