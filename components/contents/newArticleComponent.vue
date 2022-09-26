<template>
  <v-container
    fluid
  >
    <h2>最新記事</h2>
    <v-row
      justify="center"
      style="margin:30px auto;"
    >
      <v-col
        cols="12"
        sm="11"
        md="10"
        xl="8"
      >
        <v-row v-if="post.length">
          <v-slide-group multiple show-arrows>
            <v-slide-item
              v-for="post in displayLists"
              :key="post.index"
              reverse-transition="fade-transition"
              transition="fade-transition"
              style="width: 240px;"
            >
              <v-card style="width: auto; height: 400px; margin:0px 10px;">
                <v-card-title class="align-end font-weight-bold"  style="font-size:1rem">
                  {{ post.title }}
                </v-card-title>
                  <v-img
                  :src="post.image.url"
                  :alt="post.image.title"
                  class="white--text"
                  >
                    <v-card-text>
                      <v-chip
                        small
                        light
                        :color="categoryColor(post.category)"
                        :to="linkTo('categories', post.category)"
                        class="font-weight-bold"
                      >
                        {{ post.category.name }}
                      </v-chip>
                    </v-card-text>
                  </v-img>
                <v-card-text>
                  {{ post.updatedAt.substr( 0, 10 ) }} 更新
                </v-card-text>
                <v-list-item three-line style="min-height: unset;">
                  <v-list-item-subtitle>
                   {{ post.discription }}
                  </v-list-item-subtitle>
                </v-list-item>

                <v-card-actions>
                  <v-spacer />
                  <v-btn
                    text
                    color="black"
                    :to="linkTo('posts',post)"
                  >
                    この記事をみる
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-slide-item>
          </v-slide-group>
          <nuxt-link
            style="color:black;"
            to="/article"
          >
          記事一覧
          </nuxt-link>
        </v-row>

        <!-- <v-row v-if="post.length">
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
              <v-card style="width: auto; height: 360px;">
                <v-card-title class="align-end font-weight-bold title">
                  {{ post.title }}
                </v-card-title>
                  <v-img
                  :src="post.image.url"
                  :alt="post.image.title"
                  class="white--text"
                  >
                    <v-card-text>
                      <v-chip
                        small
                        light
                        :color="categoryColor(post.category)"
                        :to="linkTo('categories', post.category)"
                        class="font-weight-bold"
                      >
                        {{ post.category.name }}
                      </v-chip>
                    </v-card-text>
                  </v-img>
                <v-card-text>
                  {{ post.updatedAt.substr( 0, 10 ) }} 更新
                </v-card-text>
                <v-list-item three-line style="min-height: unset;">
                  <v-list-item-subtitle>
                   {{ post.discription }}
                  </v-list-item-subtitle>
                </v-list-item>

                <v-card-actions>
                  <v-spacer />
                  <v-btn
                    text
                    color="black"
                    :to="linkTo('posts',post)"
                  >
                    この記事をみる
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-carousel-item>
          </v-carousel>
        </v-row> -->

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
          case 'Brewery': return '#A7FFEB'
          case 'Shop・Service': return '#B39DDB'
          case 'Tips': return '#FFB74D'
          default: return '#424242'
        }
      }
    },
    // height () {
    //   switch (this.$vuetify.breakpoint.name) {
    //     case 'xs':
    //     case 'sm':
    //     case 'md':
    //     case 'lg':
    //     case 'xl':
    //       return 400
    //   }
    // },
  },
  mounted (){
    this.posts
    this.displayLists = this.posts.slice(this.pageSize*(this.page -1), this.pageSize*(this.page));
  },
  methods: {
    // getItemLists(){
    //   // const result = [];
    //   for (let [key, value] of Object.entries(this.posts)) {
    //     const categories = 'beer'
    //     if(value.category.id === categories) {
    //       this.itemLists.push(value);
    //     }
    //   }
    // }
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
  //   .row{
  //     margin: 10px
  //   }

  //   .row ::v-deep .v-carousel__controls {
  //     background: none;
  //     padding-top: 20px;
  //   }

  //   .v-card__subtitle, .v-card__text, .v-card__title {
  //       display: block;
  //       padding: 8px 12px;
  //   }
  //   .v-list-item__subtitle {
  //       padding-top: 10px;
  //   }
  //   .v-image {
  //     height: auto;
  //   }
  //   .title {
  //     justify-content: center;
  //   }
  //   .v-window {
  //     margin: auto;
  //   }

    .v-slide-group__wrapper{
      height: 460px;
    }

    .row ::v-deep .v-item-group  {
      height: 460px;
    }

    .row {
      justify-content: center;
    }

    // .col-sm-11 .col-md-10 .col-xl-8 .col-12 ::v-deep .row{
    //   width: 375px;
    // }
  }
</style>
