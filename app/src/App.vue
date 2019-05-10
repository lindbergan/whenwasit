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
export default {
  name: "App"
};
</script>
<style>
#app {
  background-color: #956c5f;
}
</style>
