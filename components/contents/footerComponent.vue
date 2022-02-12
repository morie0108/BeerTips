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
          :href="icon.url"
          class="mx-4 black--text"
          icon
        >
          <v-icon size="24px">
            {{ icon.name }}
          </v-icon>
        </v-btn>
      </v-card-text>

      <v-card-text class="black--text pt-0">
        This site provides information on craft beer. Please enjoy reading it!
      </v-card-text>

      <v-card-text class="black--text pt-0">
        Illustration by <a class="black--text" href="https://icons8.com/illustrations/author/5c07e68d82bcbc0092519bb6">Icons 8</a> from <a class="black--text" href="https://icons8.com/illustrations">Ouch!</a>
        <br>
        Reference books by <a class="black--text" href="https://www.kadokawa.co.jp/product/321804000001/">恋するクラフトビール</a>
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
        // {
        //   name:'mdi-facebook',
        //   url:'#',
        // },
        {
          name:'mdi-twitter',
          url:'https://twitter.com/BeerTips_2022',
        },
        {
          name:'mdi-instagram',
          url:'https://www.instagram.com/beer_tips.2022/',
        },
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
