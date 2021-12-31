<template>
  <header>
    <v-app-bar
      app
    >
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
      <v-toolbar-title>BeerTips</v-toolbar-title>
    </v-app-bar>
    <v-navigation-drawer
    v-model="drawer"
    fixed
    temporary
    >
      <v-list
        nav
        dense
      >
        <v-list-item-group>
          <v-list-item
            v-for="(menuItem, index) in menuItems"
            :key="index"
            :to="menuItem.url"
          >
            <v-list-item-title>{{ menuItem.name }}</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </header>
</template>

<script>
import { mapGetters } from 'vuex'
import constants from '~/common/constants'

export default {
  data () {
    return {
      drawer: false,
      menuItems: constants.menuItems
    }
  },
  computed: {
    ...mapGetters(['linkTo']),
  }
}
</script>

<style lang="scss" scoped>
  .v-toolbar__title{
    margin: auto;
    padding-right: 72px;
  }
</style>

<style
