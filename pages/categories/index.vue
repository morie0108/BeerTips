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
              :items="tableItems"
              :search="search"
              :sort-by="sortBy"
              :items-per-page="itemsPerPage"
              :page.sync="page"
              sort-desc
              hide-default-footer
              @page-count="pageCount = $event"
            >
              <template v-slot:[`item.fields.name`]="{ item }">
                <v-icon size="18">
                  mdi-image-filter-none
                </v-icon>
                <nuxt-link
                  color="black"
                  :to="linkTo('categories', item)"
                >
                  {{ item.fields.name }}
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
    sortBy: 'fields.postcount',
    itemsPerPage: 20,
    page: 1,
    pageCount: 0,
    totalVisible: 7,
    headers: [
      {
        text: 'カテゴリ',
        align: 'left',
        value: 'fields.name'
      },
      {
        text: '投稿数',
        align: 'center',
        width: 150,
        value: 'fields.postcount'
      }
    ]
  }),
  computed: {
    ...mapState(['categories']),
    ...mapGetters(['linkTo']),
    addBreads () {
      return [{ icon: 'mdi-image-filter-none', text: 'カテゴリ一覧', to: '/categories', disabled: true, iconColor: 'grey' }]
    },
    tableItems () {
      const categories = []
      for (let i = 0; i < this.categories.length; i++) {
        const category = this.categories[i]
        category.fields.postcount = this.$store.getters.associateCategoryPosts(category).length
        categories.push(category)
      }
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
