<template>
  <b-table
    v-if="tableIsReady"
    :items="shipments"
    :fields="fields"
    :per-page="recordsPerPage"
    responsive
    flex
    fixed
    small
    striped
    hover
    @row-clicked="expandAdditionalInfo"
  >
    <!-- Row details -->
    <template slot="row-details" slot-scope="row">
      <!-- https://stackoverflow.com/questions/52327549/bootstrap-vue-table-show-details-when-row-clicked -->
      <b-row>
        <b-col sm="8">
          <b-tabs pills>
            <b-tab title="Consignee" active>
              <b-card id="consignee-card">
                <b-row class="mb-2">
                  <b-col sm="3" class="text-sm">
                    <b>Consignee name:</b>
                  </b-col>
                  <b-col>{{ row.item.CONSIGNEE_NAME_1 }}</b-col>
                </b-row>

                <b-row class="mb-2">
                  <b-col sm="3" class="text-sm">
                    <b>Consignee address:</b>
                  </b-col>
                  <b-col>{{ row.item.CONSIGNEE_ADDRESS_1 }}</b-col>
                </b-row>

                <b-row class="mb-2">
                  <b-col sm="3" class="text-sm">
                    <b>Consignee city:</b>
                  </b-col>
                  <b-col>{{ row.item.CONSIGNEE_CITY }}</b-col>
                </b-row>

                <b-row class="mb-2">
                  <b-col sm="3" class="text-sm">
                    <b>Consignee country:</b>
                  </b-col>
                  <b-col>{{ row.item.CONSIGNEE_COUNTRY }}</b-col>
                </b-row>

                <b-row class="mb-2">
                  <b-col sm="3" class="text-sm">
                    <b>Consignee postcode:</b>
                  </b-col>
                  <b-col>{{ row.item.CONSIGNEE_ZIP }}</b-col>
                </b-row>

                <b-row class="mb-2">
                  <b-col sm="3" class="text-sm">
                    <b>Consignee contact:</b>
                  </b-col>
                  <b-col>{{ row.item.CONSIGNEE_CONTACT }}</b-col>
                </b-row>

                <b-row class="mb-2">
                  <b-col sm="3" class="text-sm">
                    <b>Consignee contract:</b>
                  </b-col>
                  <b-col>{{ row.item.CONSIGNEE_CONTRACT }}</b-col>
                </b-row>

                <b-row class="mb-2">
                  <b-col sm="3" class="text-sm">
                    <b>Consignee phone:</b>
                  </b-col>
                  <b-col>{{ row.item.CONSIGNEE_PHONE }}</b-col>
                </b-row>

                <b-row class="mb-2">
                  <b-col sm="3" class="text-sm">
                    <b>Consignee E-Mail:</b>
                  </b-col>
                  <b-col>
                    <a
                      :href="`mailto:${row.item.CONSIGNEE_EMAIL}?subject=ACP Global Forwarding`"
                    >{{ row.item.CONSIGNEE_EMAIL }}</a>
                  </b-col>
                </b-row>

                <b-row class="mb-2">
                  <b-col sm="3" class="text-sm">
                    <b>Consignee SIRET:</b>
                  </b-col>
                  <b-col>{{ row.item.CONSIGNEE_SIRET }}</b-col>
                </b-row>

                <b-button size="sm" @click="row.toggleDetails">Hide Details</b-button>
              </b-card>
            </b-tab>

            <b-tab title="Sender">
              <br>I'm the second tab content
            </b-tab>

            <b-tab title="Details">
              <br>tab!
            </b-tab>

            <b-tab title="Log">
              <br>tab!
            </b-tab>

            <b-tab title="Admin Tasks">
              <br>tab!
            </b-tab>
          </b-tabs>
        </b-col>

        <b-col sm="4">
          <b-card id="colis-info" class="mb-2">
            <b-button class="card-btn-top" href="#" variant="warning">Release parcel</b-button>

            <table class="table" table-striped show-empty flex hover>
              <tbody>
                <tr>
                  <td>Product</td>
                  <td>{{ row.item.PRODUCT }}</td>
                </tr>
                <tr>
                  <td>Number of pieces</td>
                  <td>{{ row.item.pieces }}</td>
                </tr>
                <tr>
                  <td>Article number</td>
                  <td>{{ row.item.ARTICLE_NUMBER }}</td>
                </tr>
                <tr>
                  <td>Description</td>
                  <td>{{ row.item.ARTICLE_DESC }}</td>
                </tr>
                <tr>
                  <td>Weight</td>
                  <td>{{ row.item.ARTICLE_WEIGHT}}</td>
                </tr>
                <tr>
                  <td>Customs Value</td>
                  <td>{{ row.item.ARTICLE_CUSTOMS_VALUE }}</td>
                </tr>
                <tr>
                  <td>Currency</td>
                  <td>{{ row.item.ARTICLE_CUSTOMS_CURRENCY }}</td>
                </tr>
                <tr>
                  <td>Tax Amount</td>
                  <td>NO SALE ESTE DATO</td>
                </tr>
              </tbody>
            </table>
          </b-card>
        </b-col>
      </b-row>
    </template>
    <!-- Row details end -->
  </b-table>
</template>


<script>
export default {
  name: "Table",
  data() {
    return {
      tableIsReady: true,
      recordsPerPage: null,
      shipments: [],
      fields: [
        {
          key: "import_date",
          label: "Date",
          sortable: true
        },
        {
          key: "MASTER_PARCEL_ID",
          label: "Shipment",
          sortable: false
        },
        {
          key: "SHIPPER_COUNTRY",
          label: "From"
          // Variant applies to the whole column, including the header and footer
          //variant: 'danger'
        },
        {
          key: "CONSIGNEE_COUNTRY",
          label: "To"
        },
        {
          key: "ARTICLE_DESC",
          label: "Description",
          sortable: true
        },
        {
          key: "payid",
          label: "Paid",
          sortable: false
        },
        {
          key: "CONSIGNEE_SIRET",
          label: "B2B",
          formatter: value => {
            return value ? "B2B" : "";
          }
        }
        /*
        {
          key: 'change this',
          label: 'Admin fee'
        },
        {
          key: 'change this',
          label: 'DD'
        },
        {
          key: 'ARTICLE_TAX_AMOUNT',
          label: 'VAT'
        },
        {
          key: 'change this',
          label: 'Total'
        },
        {
          kay:'change this',
          label: 'last'
        }*/
      ],
      errors: []
    };
  },
  methods: {
    expandAdditionalInfo(row) {
      row._showDetails = !row._showDetails;
    }
  },
  mounted() {
    axios
      .get("https://duties.dpd.com.pl/?option=com_duties&task=api.getShipments")
      .then(response => {
        response.data.forEach(element => {
          element._showDetails = false;
          //element.isActive = false;
        });
        console.log(response.data);
        this.shipments = response.data;
        this.recordsPerPage = shipments.length;
      })
      .catch(error => {
        this.errors.push(error);
      });

    //disabled console log  .catch(error => console.log(error)) // eslint-disable-line no-console
  }
};
</script>

<style>
.nav-pills .nav-link.active,
.nav-pills .show > .nav-link {
  color: #fff;
  background-color: #343a40;
}

.nav-pills .nav-link {
  color: #343a40;
}

a {
  color: #dc3545;
}

body {
  font-size: 0.9rem;
  font-weight: 300;
  line-height: 1.5;
  border-collapse: collapse;
}

#consignee-card {
  margin-top: 0.3rem;
}

#colis-info {
  margin-top: 2.65rem;
}

.card-btn-top {
  width: 100%;
  border-top-left-radius: calc(0.25rem - 1px);
  border-top-right-radius: calc(0.25rem - 1px);
}

.table {
  margin-bottom: 0;
}
</style>
