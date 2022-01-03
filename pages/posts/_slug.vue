<template>
  <v-container fluid>
    <breadcrumbs :add-items="addBreads" />
    <p class="publishData">{{ currentPost.fields.publishDate }} 更新</p>
    <h2>{{ currentPost.fields.title }}</h2>
    <v-card-text>
    <template v-if="currentPost.fields.tags">
      <v-chip
        v-for="(tag) in currentPost.fields.tags"
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
    text-decoration: underline;
  }
  .publishData {
    margin: auto;
    max-width: 540px;
    text-align: center;
  }
  .mainContents {
    display: flex;
    justify-content: center;
    margin-top: 30px;
  }
  .btn {
    display: flex;
    justify-content: center;
    width: 200px;
    margin: 30px auto;
  }
  .v-card__text{
    text-align: center;
  }
  ::v-deep .contents{

    max-width: 540px;

    h2 {
      font-size:large;
      padding: 0.25em 0.5em;/*上下 左右の余白*/
      color: #494949;/*文字色*/
      background:  #fffffe;/*背景色*/
      border-left: solid 5px #262130;/*左線*/
      margin-bottom: 14px;
    }

    h3 {
      font-size:large;
      position: relative;
      line-height: 2.4;
    }

    p {
      color: #4b5563;
    }

    img {
      display: block;
      margin: auto;
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
