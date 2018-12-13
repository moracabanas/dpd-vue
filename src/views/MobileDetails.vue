<template>
  <div class="container-fluid">
    <br>
    <!-- dropdown-item-buttons.vue -->
    <b-col id="ddown" md="12" class="text-center">
      <b-dropdown id="ddown-buttons" text="Language" class @click="getLanguages()">
        <!-- v-for="(location, languages) in languages" -->
        <b-dropdown-item-button
          v-for="(location, languages) in languages"
          :key="languages"
          @click="setLocation(languages)"
        >{{location}}</b-dropdown-item-button>
      </b-dropdown>
    </b-col>
    <br>
    <!--Hello-->
    <h3 id="name">{{ language.EMAIL_GREETING }} {{shipment.CONSIGNEE_NAME_1 | formatName}}</h3>

    <!--Parcel Number-->
    <b-card
      id="parcel"
      text-variant="black"
      :title="language.SHIPMENT"
      class="text-center"
      @click="gotosite(urlById)"
    >
      <h4>{{shipment.MASTER_PARCEL_ID}}</h4>
    </b-card>

    <br>

    <b-card
      id="btnDetails"
      bg-variant="danger"
      text-variant="white"
      class="text-center"
      v-b-toggle.collapse1
    >
      <!--Details information of the order / parcel (description / sender)-->
      <h5>{{ language.SHIPMENT_SUMMARY }}</h5>
    </b-card>
    <b-collapse
      id="collapse1"
      class="mt-2"
      v-on:hidden="scrollTo('btnDetails')"
      v-on:shown="scrollTo('tabs')"
    >
      <b-tabs id="tabs">
        <b-tab :title="language.CONSIGNEE" active>
          <br>
          <table class="table" table-striped show-empty flex hover>
            <tbody id="deliveryDetails">
              <tr>
                <strong>
                  <!--Consignee Name-->
                  <td>{{ language.CONSIGNEE + (" ") + language.NAME }}</td>
                </strong>
                <td>{{ shipment.CONSIGNEE_NAME_1 }}</td>
              </tr>

              <tr>
                <strong>
                  <!--Consignee address-->
                  <td>{{ language.ADDRESS }}</td>
                </strong>
                <td>{{ shipment.CONSIGNEE_ADDRESS_1 }}</td>
              </tr>

              <tr>
                <strong>
                  <!--Consignee city-->
                  <td>{{ language.CITY }}</td>
                </strong>
                <td>{{ shipment.CONSIGNEE_CITY }}</td>
              </tr>

              <tr>
                <strong>
                  <!--Consignee country-->
                  <td>{{language.COUNTRY}}</td>
                </strong>
                <td>{{ shipment.CONSIGNEE_COUNTRY }}</td>
              </tr>

              <tr>
                <strong>
                  <!--Consignee postcode-->
                  <td>{{ language.ZIP }}</td>
                </strong>
                <td>{{ shipment.CONSIGNEE_ZIP }}</td>
              </tr>

              <tr>
                <strong>
                  <!--Consignee contact-->
                  <td class="red">CONSIGNEE CONTACT</td>
                </strong>
                <td>{{ shipment.CONSIGNEE_CONTACT }}</td>
              </tr>

              <tr>
                <strong>
                  <!--Consignee phone-->
                  <td class="red">Consignee phone</td>
                </strong>
                <td>{{ shipment.CONSIGNEE_PHONE }}</td>
              </tr>

              <tr>
                <strong>
                  <!--Consignee email-->
                  <td class="red">Consignee email</td>
                </strong>
                <td>{{ shipment.CONSIGNEE_EMAIL }}</td>
              </tr>

              <tr>
                <strong>
                  <!--Consignee SIRET-->
                  <td class="red">Consignee SIRET</td>
                </strong>
                <td>{{ shipment.CONSIGNEE_SIRET }}</td>
              </tr>
            </tbody>
          </table>
        </b-tab>

        <b-tab title="Sender">
          <br>
          <table class="table" flex hover>
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
      <!--Instructions to get your parcel from UK-->
      <h5>{{ language.OGONE_ONLINE_PAYMENT_PROCESS }}</h5>
    </b-card>
    <br>
    <b-card
      bg-variant="secondary"
      text-variant="white"
      title
      class="text-center"
      @click="gotosite(language.EU_LEGAL_URL)"
    >
      <h5>Regulations link for the parcel from UK</h5>
    </b-card>
    <br>
  </div>
</template>


<script>
export default {
  name: "mobiledetails",
  props: ["hash", "lang"],
  data() {
    return {
      shipment: [],
      language: [],
      languages: [],
      errors: [],
      loading: false
    };
  },
  methods: {
    getShipment: function(location) {
      this.loading = true;
      axios
        .get("https://duties.dpd.com.pl/", {
          params: {
            option: "com_duties",
            task: "api.getShipment",
            shipment_id: this.hash,
            lang: location
          }
        })
        .then(response => {
          this.loading = false;
          //console.log(response.data);
          this.shipment = response.data;
          this.language = response.data["language"];
          console.log(response.data["language"]);
        })
        .catch(error => {
          this.loading = false;
          this.errors.push(error);
        });

      //disabled console log  .catch(error => console.log(error)) // eslint-disable-line no-console
    },

    getLanguages() {
      this.loading = true;
      axios
        .get("https://duties.dpd.com.pl/", {
          params: {
            option: "com_duties",
            task: "api.getLanguages"
          }
        })
        .then(response => {
          this.loading = false;
          console.log(response.data);
          this.languages = response.data;
        })
        .catch(error => {
          this.loading = false;
          this.errors.push(error);
        });
    },

    setLocation(location) {
      this.getShipment(location);
      console.log(location);
    },

    gotosite(url) {
      // window.location.href = url; -- deprecated
      window.open(url, "_blank");
    },

    scrollTo: function(element) {
      //console.log(element);
      document.getElementById(element).scrollIntoView({ behavior: "smooth" });
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
      if (!this.shipment.MASTER_PARCEL_ID) return "";
      return (
        "https://tracking.dpd.de/parcelstatus?query=" +
        this.shipment.MASTER_PARCEL_ID +
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
    this.getShipment(this.lang);
    this.getLanguages();
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

.red {
  color: red;
}
</style>
