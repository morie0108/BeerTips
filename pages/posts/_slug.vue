<template>
  <v-container fluid>
    <breadcrumbs :add-items="addBreads" />
    <p class="publishData">{{ currentPost.fields.publishDate }} 更新</p>
    <h2>{{ currentPost.fields.title }}</h2>
    <v-img
      :src="setEyeCatch(currentPost).url"
      :alt="setEyeCatch(currentPost).title"
      :aspect-ratio="16/9"
      max-width="600"
      max-height="400"
      class="mx-auto"
    />
    <div class="mainContents">
      <div v-html="$md.render(currentPost.fields.body)" class="contentsImg"></div>
    </div>

    <v-btn
      outlined
      color="primary"
      to="/"
      class="btn"
    >
      <v-icon size="16">
        fas fa-angle-double-left
      </v-icon>
      <span class="ml-1">ホームへ戻る</span>
    </v-btn>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import { documentToHtmlString } from '@contentful/rich-text-html-renderer'

export default {
  async asyncData ({ payload, store, params, error }) {
    const currentPost = payload || await store.state.posts.find(post => post.fields.slug === params.slug)

    if (currentPost) {
      return {
        currentPost,
        category: currentPost.fields.category
      }
    } else {
      return error({ statusCode: 400 })
    }
  },

  computed: {
    ...mapGetters(['setEyeCatch', 'linkTo']),
    addBreads () {
      return [
        {
          icon: 'mdi-folder-outline',
          text: this.category.fields.name,
          to: this.linkTo('categories', this.category)
        }
      ]
    }
  },
  methods: {
    toHtmlString(obj) {
      return documentToHtmlString(obj)
    }
  }
}
</script>

<style lang="scss" scoped>
  h2{
    font-size: xx-large;
    margin: 10px;
    text-align: center;
  }
  .publishData {
    margin: auto;
    max-width: 540px;
    text-align: center;
  }
  .mainContents {
    display: flex;
    justify-content: center;
  }
  .btn {
    display: flex;
    justify-content: center;
    width: 200px;
    margin: auto;
  }
  ::v-deep .contentsImg{
    img {
      max-width: 320px;
      max-height: 400px;

      @media only screen and (max-width:320px) {
        max-width: 280px;
      }
    }
  }
</style>
