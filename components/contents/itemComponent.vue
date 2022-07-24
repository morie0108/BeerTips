<template>
  <v-container fluid>
    <h2>ビール紹介</h2>
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
          <v-col
            v-for="post in displayLists"
            :key="post.index"
            cols="12"
            sm="6"
            lg="4"
            xl="3"
          >
            <v-card
              max-width="400"
              class="mx-auto"
            >
              <v-card-title class="align-end fill-height font-weight-bold title">
                {{ post.title }}
              </v-card-title>
              <v-img
                :src="post.image.url"
                :alt="post.image.title"
                :aspect-ratio="16/9"
                max-height="200"
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

              <v-card-text>
                <template v-if="post.tags">
                  <v-chip
                    v-for="(tag) in post.tags"
                    :key="tag.id"
                    :to="linkTo('tags', tag)"
                    small
                    label
                    outlined
                    class="ma-1"
                  >

                    <v-icon
                      left
                      size="18"
                      color="grey"
                    >
                      mdi-label
                    </v-icon>
                    {{ tag.name }}
                  </v-chip>
                </template>
              </v-card-text>

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
          </v-col>
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
  // components: {
  //   headerImage,
  //   itemComponent,
  // },
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
    }
  },
  mounted (){
    this.getItemLists();
    this.displayLists =this.itemLists.slice(this.pageSize*(this.page -1), this.pageSize*(this.page));
  },
  methods: {
    getItemLists(){
      // const result = [];
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

<style lang="scss" scoped>
  .container{
    padding: 0px;
  }
  .discription{
    padding: 10px 0px;
    width: 90%;
    margin: auto;
  }
  .row{
    padding: 10px
  }
  .link-color{
    color: black;
  }

h2 {
  font-size: large;
  text-align: center;
}
.v-card__subtitle, .v-card__text, .v-card__title {
    padding: 8px 12px;
}
.title {
  justify-content: center;
}
</style>
