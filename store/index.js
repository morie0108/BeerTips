import axios from 'axios'

export const state = () => ({
  posts: [],
  tags: [],
  categories: [],
})

export const getters = {
  getPosts: state => {
    return state.posts
  },
  getTags: state => {
    return state.tags
  },
  getCategories: state => {
    return state.categories
  },

  linkTo: () => (name, obj) => {
    return { name: `${name}-slug`, params: { slug: obj.id } }
  },

  associateTagPosts: state => (currentTag) => {
    const posts = []
    Object.keys(state.posts).forEach((key) => {
      if (state.posts[key].tags) {
        const tags = state.posts[key].tags
        const tag = tags.find(tags => tags.id === currentTag.id)
        if (tag) { posts.push(state.posts[key]) }
      }
    });
    return posts
  },

  associateCategoryPosts: state => (currentCategory) => {
    const posts = []
    Object.keys(state.posts).forEach((key) => {
    if (state.posts[key].category) {
        const categories = []
        categories.push(state.posts[key].category)
        const category = categories.find(categories => categories.id === currentCategory.id)
        if (category) {
          posts.push(state.posts[key])
        }
      }
    });
    return posts
  },
}

export const mutations = {
  setPosts (state, payload) {
    state.posts = payload
  },
  setTags (state, payload) {
    state.tags = payload
  },
  setCategories (state, payload) {
    state.categories = payload
  },
}

export const actions = {

  async asyncData({ commit, $config }) {
    const postApiUrl = `${this.$config.postApiUrl}?limit=30`
    const post = await axios.get(
      postApiUrl,
      {
        headers: { 'X-MICROCMS-API-KEY': this.$config.apiKey },
      });

    const tagApiUrl = `${this.$config.tagApiUrl}?limit=30`
    const tag = await axios.get(
      tagApiUrl,
      {
        headers: { 'X-MICROCMS-API-KEY': this.$config.apiKey }
      });

    const category = await axios.get(
      this.$config.categoryApiUrl,
      {
        headers: { 'X-MICROCMS-API-KEY': this.$config.apiKey }
      });
      commit('setPosts', post.data.contents)
      commit('setTags', tag.data.contents)
      commit('setCategories', category.data.contents)

  }
}
