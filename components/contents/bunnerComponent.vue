<template>
  <v-row
  >
    <h2>クラフトビールを楽しむ Tips！</h2>
    <v-col  cols="12" sm="8" md="4">
      <v-card :width="width">
        <nuxt-link to="/posts/about-craftbeer">
          <v-img v-bind:src="require('@/assets/images/bunner_aboutBeer.png')"></v-img>
        </nuxt-link>
      </v-card>
    </v-col>
    <v-col  cols="12" sm="8" md="4">
      <v-card :width="width">
        <nuxt-link to="/tags/beerstyle">
          <v-img v-bind:src="require('@/assets/images/bunner_beerType.png')"></v-img>
        </nuxt-link>
      </v-card>
    </v-col>
    <v-col  cols="12" sm="8" md="4">
      <v-card :width="width">
        <nuxt-link to="/categories/beer">
          <v-img v-bind:src="require('@/assets/images/bunner_likeBeer.png')"></v-img>
        </nuxt-link>
      </v-card>
    </v-col>
  </v-row>

</template>

<script>

export default {
  // data () {
  //   return {

  //   }
  // },
  // computed: {
  //   width () {
  //     switch (this.$vuetify.breakpoint.name) {
  //       case 'xs':
  //         return 320
  //       case 'sm':
  //         return 500
  //       case 'md':
  //       case 'lg':
  //       case 'xl':
  //         return 280
  //     }
  //   },
  // }
}
</script>

<style lang="scss" scoped>
  // .v-toolbar__title{
  //   margin: auto;
  //   padding-right: 72px;
  // }
  h2 {
    width: 100%;
    font-size: large;
    text-align: center;
    margin: 16px;
  }

  .row {
      justify-content: center;
      margin: 0 auto;
  }

  .card {
      margin: auto;
  }


</style>

<style
