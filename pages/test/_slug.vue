<template>

<v-container fluid>
  <breadcrumb :breadcrumbs="breadcrumbs" />

    <div v-for="content in post.contents" :key="content.id">

      <p class="publishData">{{ content.updatedAt }} 更新</p>
      <h2>{{ content.title }}</h2>

      <v-card-text>
      <template v-if="content.tags">
        <v-chip
          v-for="(tag) in content.tags"
          :key="tag.id"
          :to="testLinkTo('tags', tag)"
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

      <v-img
        :src="content.image.url"
        :alt="content.title"
        :aspect-ratio="16/9"
        max-width="600"
        max-height="400"
        class="mx-auto"
      />

      <div class="mainContents">
        <div class="contents" v-html="content.body"></div>
      </div>

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
import Breadcrumb from '~/components/Breadcrumb.vue'

export default {

  async asyncData({$microcms , context}) {

    const post = await $microcms.get({
      endpoint: 'blog',
      queries: { limit: 20, filters: 'createdAt[greater_than]2021' },
    });

    const tag = await $microcms.get({
      endpoint: 'tags',
      queries: { limit: 20, filters: 'createdAt[greater_than]2021' },
    });

    // const getTag = store.state.tags.find(tag => tag.fields.slug === params.slug)

    const category = await $microcms.get({
      endpoint: 'categories',
      queries: { limit: 20, filters: 'createdAt[greater_than]2021' },
    });

    for (let i = 0; i < tag.contents.length; i++) {
      const tagId = tag.contents[i].id;
      console.log(tagId)
    }

    // console.log(this.$route.params.slug)

    return{
      post,
      tag,
      category
    }

  },

  computed: {

    ...mapGetters(['testSetEyeCatch','testLinkTo','setEyeCatch', 'linkTo']),

  breadcrumbs: function() {
    // console.log(this.$route.params.slug)
    // console.log(this.post)
    // console.log(this.tag)
    // console.log(this.category)
        return {
          data: [
            {
              icon: 'mdi-home',
              name: 'ホーム',
              path: '/'
            },
            {
              icon: 'mdi-folder-outline',
              name: this.post.contents[0].category.name,
              path: '/categories/' + this.post.contents[0].category.id
            },
            {
              name: this.post.contents[0].title
            }
          ]
        }
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
    td {
      font-size: x-small;
      padding-right: 6px;
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
