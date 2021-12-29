<template>
  <v-container fluid>
    <headerImage />
    <v-row
      justify="center"
    >
      <v-col
        cols="12"
        sm="11"
        md="10"
        xl="8"
      >
        <v-row v-if="posts.length">
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
              <v-card-title class="align-end fill-height font-weight-bold">
                {{ post.fields.title }}
                <span :is="draftChip(post)" />
              </v-card-title>
              <v-img
                :src="setEyeCatch(post).url"
                :alt="setEyeCatch(post).title"
                :aspect-ratio="16/9"
                max-height="200"
                class="white--text"
              >
                <v-card-text>
                  <v-chip
                    small
                    dark
                    :color="categoryColor(post.fields.category)"
                    :to="linkTo('categories', post.fields.category)"
                    class="font-weight-bold"
                  >
                    {{ post.fields.category.fields.name }}
                  </v-chip>
                </v-card-text>
              </v-img>

              <v-card-title>
                <nuxt-link
                  :to="linkTo('posts', post)"
                  class="link-color"
                >
                  {{ post.fields.title }}
                </nuxt-link>
              </v-card-title>

              <v-card-text>
                {{ post.fields.publishDate }}
              </v-card-text>

              <v-list-item three-line style="min-height: unset;">
                <v-list-item-subtitle>
                  {{ post.fields.body }}
                </v-list-item-subtitle>
              </v-list-item>

              <v-card-text>
                <template v-if="post.fields.tags">
                  <v-chip
                    v-for="(tag) in post.fields.tags"
                    :key="tag.sys.id"
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
                    {{ tag.fields.name }}
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
    <v-pagination
      v-model = "page"
      :length = "length"
      @input = "pageChange"
      class = "pageNation"
    ></v-pagination>
  </v-container>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import draftChip from '~/components/posts/draftChip'
import headerImage from '~/components/contents/headerImage'


export default {
  data(){
    return{
      page: 1,
      length:0,
      displayLists: [],
      pageSize: 10,
    }
  },
  components: {
    draftChip,
    headerImage,
  },
  computed: {
    ...mapState(['posts']),
    ...mapGetters(['setEyeCatch', 'draftChip', 'linkTo']),
    categoryColor () {
      return (category) => {
        switch (category.fields.name) {
          case 'coordinate': return '#C73A31'
          case 'report': return '#236244'
          case 'news': return 'primary'
          default: return 'grey darken-3'
        }
      }
    }
  },
  mounted (){
    this.posts
    this.length = Math.ceil(this.posts.length/this.pageSize);
    this.displayLists = this.posts.slice(this.pageSize*(this.page -1), this.pageSize*(this.page));
  },
  methods: {
    pageChange: function(pageNumber){
      this.displayLists = this.posts.slice(this.pageSize*(pageNumber -1), this.pageSize*(pageNumber));
      this.returnTop()
    },
    returnTop() {
      window.scrollTo({
        top: 0,
        behavior: 'auto'
      })
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
  .pageNation{
    margin-top: 20px;
  }
  .row{
    padding: 10px
  }
  .link-color{
    color: black;
  }

</style>
