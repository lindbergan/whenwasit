<template>
  <v-container fluid fill-height>
    <v-layout column wrap white--text align-center fill-height justify-center>
      <div style="display: flex; flex-direction: column; align-items: center;">
        <img src="img/icons/icon.png" width="75px" style="margin-bottom: 25px;">
        <img
          width="100%"
          style="max-width: 350px; margin-bottom: 25px; align-self: center"
          src="img/icons/name.png"
        >
        <v-btn style="font-family: Open Sans; width: 100%;" round large to="/teamsettings">Spela</v-btn>
      </div>
      <div id="snackbar">
        A new version is available.
        <strong>
          <a id="reload">REFRESH</a>
        </strong>
      </div>
    </v-layout>
  </v-container>
</template>
<script>
</script>
<style scoped>
h1 {
  color: #fcfcfc;
  font-family: "Lilita One";
  font-size: 4.5em;
  text-align: center;
}
#snackbar {
  visibility: show;
  width: 90%;
  max-width: 400px;
  background-color: #333;
  color: #fff;
  text-align: center;
  font-family: Open Sans;
  border-radius: 15px;
  padding: 16px;
  position: fixed;
  bottom: 30px;
  margin: 0;
  border: 0.5px solid #444;
}
#snackbar a {
  color: #70b1f1;
  font-family: Open Sans;
  margin-left: 10px;
}
#snackbar.show {
  visibility: visible;
  -webkit-animation: fadein 0.5s;
  animation: fadein 0.5s;
}
@-webkit-keyframes fadein {
  from {
    bottom: 0;
    opacity: 0;
  }
  to {
    bottom: 30px;
    opacity: 1;
  }
}
@keyframes fadein {
  from {
    bottom: 0;
    opacity: 0;
  }
  to {
    bottom: 30px;
    opacity: 1;
  }
}
</style>

