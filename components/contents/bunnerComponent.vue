<template>
  <fade-in-component>
    <v-row>
        <h2>クラフトビールを楽しむ Tips！</h2>
            <v-col  cols="12" sm="8" md="4" style="margin:auto;">
              <v-card :width="width">
                <nuxt-link to="/posts/about-craftbeer">
                  <v-img v-bind:src="require('@/assets/images/bunner_aboutBeer.png')"></v-img>
                </nuxt-link>
              </v-card>
            </v-col>

            <v-col  cols="12" sm="8" md="4" style="margin:auto;">
              <v-card :width="width">
                <nuxt-link to="/tags/beerstyle">
                  <v-img v-bind:src="require('@/assets/images/bunner_beerType.png')"></v-img>
                </nuxt-link>
              </v-card>
            </v-col>
            <v-col  cols="12" sm="8" md="4" style="margin:auto;">
              <v-card :width="width">
                <nuxt-link to="/categories/beer">
                  <v-img v-bind:src="require('@/assets/images/bunner_likeBeer.png')"></v-img>
                </nuxt-link>
              </v-card>
            </v-col>

        <!-- </div>
    </div> -->
    </v-row>
  </fade-in-component>
</template>

<script>
import fadeInComponent from '~/components/ui/fadeInComponent'


export default {
  components:{
    fadeInComponent
  },
  computed: {
    width () {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
          return 320
        case 'sm':
          return 500
        case 'md':
        case 'lg':
        case 'xl':
          return 600
      }
    },
  }
}
</script>

<style lang="scss" scoped>

  h2 {
    width: 100%;
    font-size: large;
    text-align: center;
    margin: 16px;
  }

  .row {
    justify-content: center;
    margin: 0 auto;
    height: 460px;
    @media only screen and (min-width:600px) {
      height: 640px;
    }
    @media only screen and (min-width:960px) {
      height: 220px;
    }
    @media only screen and (min-width:1500px) {
      height: 320px;
    }
  }

  .v-card ::v-deep {
      margin: auto;
  }

</style>
