<template>
  <div>
  <v-container fluid>
    <breadcrumbs :add-items="addBreads" class="breadcrumbs"/>
    <div class="discription">
    <h1>{{ tag.fields.name }}</h1>
      <p class="copy">こちらのページでは、{{ tag.fields.name }}に関連する記事を紹介しています。</p>
    </div>

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
            v-for="(post, i) in relatedPosts"
            :key="i"
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
                    light
                    :color="categoryColor(post.fields.category)"
                    :to="linkTo('categories', post.fields.category)"
                    class="font-weight-bold"
                  >
                    {{ post.fields.category.fields.name }}
                  </v-chip>
                </v-card-text>
              </v-img>

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
  </v-container>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import draftChip from '~/components/posts/draftChip'

export default {
    components: {
    draftChip,
  },
  asyncData ({ payload, params, error, store, env }) {
    const tag = payload || store.state.tags.find(tag => tag.fields.slug === params.slug)
    if (tag) {
      const relatedPosts = store.getters.associateTagPosts(tag)
      return { tag, relatedPosts }
    } else {
      error({ statusCode: 400 })
    }
  },
  computed: {
    addBreads () {
      return [{ icon: 'mdi-tag-outline', text: 'タグ一覧', to: '/tags' }]
    },
    ...mapState(['posts']),
    ...mapGetters(['setEyeCatch', 'draftChip', 'linkTo']),
    categoryColor () {
      return (category) => {
        switch (category.fields.name) {
          case 'Beer': return '#FFEE58'
          case 'Brewery': return '#A7FFEB'
          case 'Shop・Service': return 'deep-purple lighten-3'
          default: return 'grey darken-3'
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>
  .discription{
    height: 100px;
    width: 90%;
    margin: 10px auto;
  }
  .copy{
    text-align: center;
  }
  h1{
    font-size: x-large;
    text-align: center;
    margin-bottom: 10px;
  }
  .v-card__subtitle, .v-card__text, .v-card__title {
    padding: 8px 12px;
  }
  .title {
    justify-content: center;
  }
</style>
