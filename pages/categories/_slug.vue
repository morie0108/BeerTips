<template>
  <v-container fluid>
    <breadcrumbs :add-items="addBreads" class="breadcrumbs"/>
    <div class="discription">
      <h1>{{ category.fields.name }}</h1>
      <p>こちらのページでは、{{ category.fields.name }}に関連する記事を紹介しています。</p>
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
              </v-img>

              <v-card-title>
                <nuxt-link
                  :to="linkTo('posts', post)"
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
                  color="primary"
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
import draftChip from '~/components/posts/draftChip'

export default {
    components: {
    draftChip,
  },
  async asyncData ({ payload, store, params, error }) {
    const category = payload || await store.state.categories.find(cat => cat.fields.slug === params.slug)
    if (category) {
      const relatedPosts = store.getters.associateCategoryPosts(category)
      return { category, relatedPosts  }
    } else {
      return error({ statusCode: 400 })
    }
  },
  computed: {
    addBreads () {
      return [{ icon: 'mdi-image-filter-none', text: 'カテゴリ一覧', to: '/categories' }]
    },
    ...mapState(['posts']),
    ...mapGetters(['setEyeCatch', 'draftChip', 'linkTo']),
    relatedPosts () {
      return this.$store.getters.relatedPosts(this.category)
    }
  }
}
</script>


<style lang="scss" scoped>
  .discription{
    height: 100px;
    width: 90%;
    margin: auto;
  }
</style>
