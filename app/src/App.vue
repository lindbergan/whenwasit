<template>
  <v-app>
    <v-content>
      <v-container fluid fill-height>
        <router-view/>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
// import Header from "./components/Header";
// import Footer from "./components/Footer";
export default {
  name: "App",
  components: {
    //  Header,
    // Footer
  },
  data() {
    return {
      //
    };
  }
};
</script>
<style>
#app {
  background-color: #956c5f;
}
</style>
