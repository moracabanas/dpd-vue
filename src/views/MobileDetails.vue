<template>
  <div class="container-fluid">
    <br>
    <h3 id="name">Hello {{shipment.CONSIGNEE_NAME_1 | formatName}}</h3>

    <b-card
      id="parcel"
      text-variant="black"
      title="Parcel Number"
      class="text-center"
      @click="gotosite(urlById)"
    >
      <h4>{{shipment.MASTER_PARCEL_ID}}</h4>
    </b-card>

    <br>

    <b-card
      bg-variant="danger"
      text-variant="white"
      class="text-center"
      v-b-toggle.collapse1
      id="btnDetails"
    >
      <h5>Details information of the order / parcel (description / sender)</h5>
    </b-card>
    <b-collapse
      id="collapse1"
      class="mt-2"
      v-on:hidden="scrollTo('btnDetails')"
      v-on:shown="scrollTo('deliveryDetails')"
    >
      <b-tabs id="tabs">
        <b-tab title="Consignee" active>
          <br>
          <table class="table" table-striped show-empty flex hover>
            <tbody id="deliveryDetails">
              <tr>
                <strong>
                  <td>Name</td>
                </strong>
                <td>{{ shipment.CONSIGNEE_NAME_1 }}</td>
              </tr>

              <tr>
                <strong>
                  <td>Consignee address</td>
                </strong>
                <td>{{ shipment.CONSIGNEE_ADDRESS_1 }}</td>
              </tr>

              <tr>
                <strong>
                  <td>Consignee city</td>
                </strong>
                <td>{{ shipment.CONSIGNEE_CITY }}</td>
              </tr>

              <tr>
                <strong>
                  <td>Consignee country</td>
                </strong>
                <td>{{ shipment.CONSIGNEE_COUNTRY }}</td>
              </tr>

              <tr>
                <strong>
                  <td>Consignee postcode</td>
                </strong>
                <td>{{ shipment.CONSIGNEE_ZIP }}</td>
              </tr>

              <tr>
                <strong>
                  <td>Consignee contact</td>
                </strong>
                <td>{{ shipment.CONSIGNEE_CONTACT }}</td>
              </tr>

              <tr>
                <strong>
                  <td>Consignee phone</td>
                </strong>
                <td>{{ shipment.CONSIGNEE_PHONE }}</td>
              </tr>

              <tr>
                <strong>
                  <td>Consignee email</td>
                </strong>
                <td>{{ shipment.CONSIGNEE_EMAIL }}</td>
              </tr>

              <tr>
                <strong>
                  <td>Consignee SIRET</td>
                </strong>
                <td>{{ shipment.CONSIGNEE_SIRET }}</td>
              </tr>
            </tbody>
          </table>
        </b-tab>

        <b-tab title="Sender">
          <br>
          <table class="table" table-striped show-empty flex hover>
            <tbody>
              <tr>
                <strong>
                  <td>Name</td>
                </strong>
                <td>{{ shipment.SHIPPER_NAME_1 }}</td>
              </tr>

              <tr>
                <strong>
                  <td>Consignee address</td>
                </strong>
                <td>{{ shipment.SHIPPER_ADDRESS_1 }}</td>
              </tr>

              <tr>
                <strong>
                  <td>Consignee city</td>
                </strong>
                <td>{{ shipment.SHIPPER_CITY }}</td>
              </tr>

              <tr>
                <strong>
                  <td>Consignee country</td>
                </strong>
                <td>{{ shipment.SHIPPER_COUNTRY }}</td>
              </tr>

              <tr>
                <strong>
                  <td>Consignee postcode</td>
                </strong>
                <td>{{ shipment.SHIPPER_ZIP }}</td>
              </tr>

              <tr>
                <strong>
                  <td>Consignee contact</td>
                </strong>
                <td>{{ shipment.SHIPPER_CONTACT }}</td>
              </tr>

              <tr>
                <strong>
                  <td>Consignee phone</td>
                </strong>
                <td>{{ shipment.SHIPPER_PHONE }}</td>
              </tr>

              <tr>
                <strong>
                  <td>Consignee email</td>
                </strong>
                <td>{{ shipment.SHIPPER_EMAIL }}</td>
              </tr>

              <tr>
                <strong>
                  <td>Consignee SIRET</td>
                </strong>
                <td>{{ shipment.SHIPPER_SIRET }}</td>
              </tr>
            </tbody>
          </table>
        </b-tab>

        <b-tab title="disabled" disabled>
          <br>Disabled tab!
        </b-tab>
      </b-tabs>
    </b-collapse>
    <br>
    <b-card id="instructions" text-variant="white" title class="text-center">
      <h5>Instructions to get your parcel from UK</h5>
    </b-card>
    <br>
    <b-card bg-variant="secondary" text-variant="white" title class="text-center">
      <h5>Regulations link for the parcel from UK</h5>
    </b-card>
  </div>
</template>


<script>
export default {
  name: "mobiledetails",
  props: ["id"],
  data() {
    return {
      shipment: [],
      errors: []
    };
  },
  methods: {
    gotosite(url) {
      // window.location.href = url; -- deprecated
      window.open(url, "_blank");
    },

    scrollTo: function(element) {
      console.log(element);
      document
        .getElementById(element)
        .scrollIntoView({ behavior: "smooth", block: "nearest" });
    }

    /*
    formatName(name) {
      return "<span style='text-transform: capitalize'>" + name + "</span>";

      
      var splittedName = lowerName.split(" "),
        firstName = splittedName[0],
        lastName = splittedName[splittedName.length - 1];
      console.log(lowerName);
      console.log(splittedName);
      console.log(firstName);
      console.log(lastName);
      var upperName = splittedName.toUpperCase().join(" ");
      console.log(upperName);
      }*/
  },
  computed: {
    urlById() {
      return (
        "https://tracking.dpd.de/parcelstatus?query=" +
        this.id +
        "&locale=en_D2"
      );
    }
  },
  filters: {
    formatName: function titleCase(str) {
      if (!str) return "";
      var words = str.toLowerCase().split(" ");
      for (var i = 0; i < words.length; i++) {
        var j = words[i].charAt(0).toUpperCase();
        words[i] = j + words[i].substr(1);
      }
      return words.join(" ");
    },
    capitalize: function(name) {
      if (!name) return "";
      name = name.toString();
      name = name.toLowerCase();
      return name.charAt(0).toUpperCase() + name.slice(1);
    }
  },
  mounted() {
    axios
      .get(
        "https://duties.dpd.com.pl/?option=com_duties&task=api.getShipment&shipment_id=" +
          this.id
      )
      .then(response => {
        console.log(response.data);
        this.shipment = response.data;
        //console.log(this.$route.query.id);
      })
      .catch(error => {
        this.errors.push(error);
      });

    //disabled console log  .catch(error => console.log(error)) // eslint-disable-line no-console
  }
};
</script>

<style scoped>
#parcel {
  background-color: rgb(179, 179, 179);
}

#instructions {
  background-color: rgb(129, 24, 46);
}

#name {
  text-align: center;
}
</style>
