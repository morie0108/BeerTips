<template>
  <v-app>
    <headerComponent />
    <v-main>
      <nuxt />
    </v-main>
    <footerComponent />
  </v-app>
</template>

<script>
import headerComponent from '~/components/contents/headerComponent'
import footerComponent from '~/components/contents/footerComponent'

export default {
  name: 'default',
  components: {
    headerComponent,
    footerComponent
  }
}
</script>

<style lang="scss" scoped>
  .discription{
    padding: 10px 0px;
    width: 90%;
    margin: auto;
  }
</style>
