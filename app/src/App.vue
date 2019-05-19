<template>
  <v-app>
    <v-content style="padding: 15px;">
      <v-container fluid fill-height>
        <router-view/>
        <v-layout
          column
          wrap
          justify-end
          align-center
          style="position: fixed; bottom: 30px; padding: 0px; margin-left: -15px; margin-right: 15px;"
        ></v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "App"
};
</script>
<style>
#app {
  background-color: #222646;
}
</style>
