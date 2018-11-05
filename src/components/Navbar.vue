<template>
  <b-navbar toggleable="md" type="light" variant="light">

  <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

  <b-navbar-brand href="#">
    <!-- img relative paths won't work until you do this 
    https://bootstrap-vue.js.org/docs/reference/images/ 
    or just use src="../assets/logo.png"  WHYYY? -->
    <img id="logo" src="../assets/logo.png" class="d-inline-block align-top" alt="dpd-group">
  </b-navbar-brand>

  <b-collapse is-nav id="nav_collapse">

    <b-navbar-nav>
      <b-nav-item href="#">Shipments List</b-nav-item>
      <b-nav-item href="#">Reports</b-nav-item>
      <b-nav-item href="#" disabled>Clients</b-nav-item>
    </b-navbar-nav>

    <!-- Right aligned nav items -->
    <b-navbar-nav class="ml-auto">
    
      <!-- Search bar and button on the Navbar
      <b-nav-form>
        <b-form-input size="sm" class="mr-sm-2" type="text" placeholder="Search"/>
        <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
      </b-nav-form>
      -->

      <!-- Language dropdown on the right 
      <b-nav-item-dropdown text="Lang" right>
        <b-dropdown-item href="#">EN</b-dropdown-item>
        <b-dropdown-item href="#">ES</b-dropdown-item>
        <b-dropdown-item href="#">RU</b-dropdown-item>
        <b-dropdown-item href="#">FA</b-dropdown-item>
      </b-nav-item-dropdown>
      -->

      <b-nav-item right href="#">Report Bug</b-nav-item>
      
      <b-nav-item-dropdown right>
        <!-- Using button-content slot -->
        <template slot="button-content">
          <em>Alberto Mora</em>
        </template>
        <b-dropdown-item href="#">Profile</b-dropdown-item>
        <b-dropdown-item href="#">Signout</b-dropdown-item>
        <li class="divider" role="separator"></li>
        <b-dropdown-item href="#">Signout</b-dropdown-item>

      </b-nav-item-dropdown>
    </b-navbar-nav>

  </b-collapse>
</b-navbar>

</template>

<script>
export default {
    name: "Navbar"

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#logo { 
    height: 35px;
}

.divider {
    height: 1px;
    margin: 9px 0;
    overflow: hidden;
    background-color: #e5e5e5;
}
.dropdown-item:focus, .dropdown-item:hover {
    color: #fff;
    text-decoration: none;
    background-color: #DC0032;
}
</style>
