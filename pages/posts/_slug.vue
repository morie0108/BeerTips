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
      <div v-html="$md.render(currentPost.fields.body)" class="contents"></div>
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
    font-size: x-large;
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
  ::v-deep .contents{

    h2 {
      background: #FFFFF3;/*背景色*/
      border-left: solid 5px #FFAB00;/*左線（実線 太さ 色）*/
      color: #494949;/*文字色*/
      font-size: 1.17rem;
      margin: 16px 0px;
      padding: 0.5em;/*文字周りの余白*/
    }

    h3 {
      border-bottom: solid 3px #FFFFF3;
      margin:16px 2px;
      position: relative;
    }

    h3:after {
      position: absolute;
      content: " ";
      display: block;
      border-bottom: solid 3px #FFAB00;
      bottom: -3px;
      width: 20%;
    }

    p {
      color: #4b5563;
    }

    img {
      max-width: 350px;
      max-height: 350px;

      @media only screen and (min-width:520px) {
        max-width: 480px;
        max-height: 480px;
      }

      @media only screen and (max-width:370px) {
        max-width: 296px;
      }

    }
  }
</style>
