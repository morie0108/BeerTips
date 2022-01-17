<template>
  <v-breadcrumbs :items="breadcrumbs">
  <div class="l-breadcrumb">
    <div class="l-breadcrumb__inner">
      <ul class="l-breadcrumb__items">
        <li class="l-breadcrumb__item" v-for="breadcrumb in breadcrumbs.data" :key="breadcrumb.name">
        <v-icon class="l-breadcrumb__icon" v-if="breadcrumb.icon">
          {{ breadcrumb.icon }}
        </v-icon>
          <a v-if="breadcrumb.path" :href="breadcrumb.path" class="l-breadcrumb__text">{{ breadcrumb.name }}</a>
          <span v-else class="l-breadcrumb__text">{{ breadcrumb.name }}</span>
          <v-icon v-if="breadcrumb.path">mdi-chevron-right</v-icon>
        </li>
      </ul>
    </div>
  </div>
  </v-breadcrumbs>
</template>

<script>
export default {
  props: {
    breadcrumbs: Object
  }
}
</script>

<style lang="scss" scoped>
a {
  color: black;
  text-decoration: none;
}
li {
  margin: 0 6px;
  .l-breadcrumb__text{
    color: black;
  }
  .l-breadcrumb__icon{
      margin: 0 6px;
  }
}

</style>
