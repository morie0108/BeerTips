<template>
  <div>
    <breadcrumbs :add-items="addBreads" />

    <v-container>
      <v-row
        justify="center"
      >
        <v-col
          cols="12"
          sm="10"
          md="8"
        >
          <v-card>
            <v-card-title>
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
              />
            </v-card-title>
            <v-data-table
              :headers="headers"
              :items="categoryItems"
              :search="search"
              :sort-by="sortBy"
              :items-per-page="itemsPerPage"
              :page.sync="page"
              sort-desc
              hide-default-footer
              @page-count="pageCount = $event"
            >
              <template v-slot:[`item.name`]="{ item }">
                <v-icon size="18">
                  mdi-tag-outline
                </v-icon>
                <nuxt-link
                  :to="testLinkTo('categories', item)"
                >
                  {{ item.name }}
                </nuxt-link>
              </template>
            </v-data-table>

            <div class="text-center py-2">
              <v-pagination
                v-model="page"
                :length="pageCount"
                :total-visible="totalVisible"
                circle
                prev-icon="mdi-menu-left"
                next-icon="mdi-menu-right"
              />
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  data: () => ({
    search: '',
    sortBy: 'postcount',
    itemsPerPage: 20,
    page: 1,
    pageCount: 0,
    totalVisible: 7,
    headers: [
      {
        text: 'タグ',
        align: 'left',
        value: 'name'
      },
      {
        text: '投稿数',
        align: 'center',
        width: 150,
        value: 'postcount'
      }
    ]
  }),
  computed: {
    ...mapState(['tags']),
    ...mapGetters(['testLinkTo']),
    addBreads () {
      return [{ icon: 'mdi-tag-outline', text: 'タグ一覧', to: '/tags', disabled: true, iconColor: 'grey' }]
    },
    categoryItems () {
      const categories = []
      const post = this.$store.getters.getTestCategories
      Object.keys(post).forEach((key) => {
          const category = post[key]
          // console.log(category)
          //category.fields にpostcount を作成する必要がある
          category.postcount = this.$store.getters.testAssociateCategoryPosts(category).length
          categories.push(category)
    });
      // console.log(categories)
      return categories
    }
  }
}
</script>

<style lang="scss" scoped>
  .v-application a {
      color: black;
  }
</style>
