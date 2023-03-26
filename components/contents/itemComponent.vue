<template>
  <v-container
    fluid
  >
    <h2>コラム</h2>
    <v-row
      justify="center"
    >
      <v-col
        cols="12"
        sm="11"
        md="10"
        xl="8"
      >
        <v-row v-if="post.length">
          <v-carousel
            :height="height"
            style="width: 360px; margin-bottom: 40px;"
          >
            <v-carousel-item
              v-for="post in displayLists"
              :key="post.index"
              reverse-transition="fade-transition"
              transition="fade-transition"
            >
              <v-card style="width: auto; height: 340px;">
                <v-card-title class="align-end font-weight-bold" style="font-size:1rem">
                  {{ post.title }}
                </v-card-title>
                <nuxt-link
                  :to="linkTo('posts',post)"
                >
                  <v-img
                  :src="post.image.url"
                  :alt="post.image.title"
                  class="white--text"
                  >
                  </v-img>
                </nuxt-link>
                <v-list-item three-line style="min-height: unset;">
                  <v-list-item-subtitle>
                  {{ post.discription }}
                  </v-list-item-subtitle>
                </v-list-item>

              </v-card>
            </v-carousel-item>
          </v-carousel>
          <nuxt-link
           class="text-center"
            style="color:black;"
            to="/article"
          >
          記事一覧
          </nuxt-link>
        </v-row>

        <div v-else class="text-center">
          投稿された記事はありません。
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  data(){
    return{
      page: 1,
      length:0,
      itemLists:[],
      displayLists: [],
      pageSize: 5,
    }
  },
  computed: {
    ...mapState(['posts']),
    ...mapGetters(['linkTo']),
    post() {
    const blog = this.$store.getters.getPosts
    return blog
    },
    categoryColor () {
      return (category) => {
        switch (category.name) {
          case 'Beer': return '#FFEE58'
          default: return '#424242'
        }
      }
    },
    height () {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
        case 'sm':
        case 'md':
        case 'lg':
        case 'xl':
          return 400
      }
    },
  },
  mounted (){
    this.getItemLists();
    this.displayLists =this.itemLists.slice(this.pageSize*(this.page -1), this.pageSize*(this.page));
  },
  methods: {
    getItemLists(){
      for (let [key, value] of Object.entries(this.posts)) {
        const categories = 'beer'
        if(value.category.id === categories) {
          this.itemLists.push(value);
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .container{
    padding: 0px;

    h2 {
      font-size: large;
      text-align: center;
      padding-top: 20px;
    }

    .row{
      margin: 10px;
      display: grid;
    }

    // .row ::v-deep .v-carousel__controls {
    //   padding-top: 20px;
    // }

    .v-card__subtitle, .v-card__text, .v-card__title {
        display: block;
        padding: 8px 12px;
    }
    .v-list-item__subtitle {
        padding-top: 10px;
    }
    .v-image {
      height: auto;
      aspect-ratio: 16 / 9;
    }
    .title {
      justify-content: center;
    }
    .v-window {
      margin: auto;
    }
  }

</style>
