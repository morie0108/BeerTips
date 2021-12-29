<template>
  <v-footer
    dark
    padless
  >
    <v-card
      flat
      tile
      class="yellow lighten-2 black--text text-center footer-width"
    >
      <v-card-text>
        <v-btn
          v-for="icon in icons"
          :key="icon"
          class="mx-4 black--text"
          icon
        >
          <v-icon size="24px">
            {{ icon }}
          </v-icon>
        </v-btn>
      </v-card-text>

      <v-card-text class="black--text pt-0">
        This site provides information on craft beer. Please enjoy reading it!
      </v-card-text>

      <v-card-text class="black--text pt-0">
      Illustration by <a class="black--text" href="https://icons8.com/illustrations/author/603d1fd6123f9916a4db9ee6">  Irina Molchanova</a> from <a  class="black--text" href="https://icons8.com/illustrations">Ouch!</a>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-text class="black--text">
        {{ new Date().getFullYear() }} — <strong>BeerTips</strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
  export default {
    data: () => ({
      icons: [
        'mdi-facebook',
        'mdi-twitter',
        'mdi-instagram',
      ],
    }),
  }
</script>

<style lang="scss" scoped>
  a {
    color: black;
  }
  .footer-width{
    width:100%;
  }
</style>
