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

    const postApiUrl = `${this.$config.postApiUrl}?limit=50`
    const post = await axios.get(
      postApiUrl,
      {
        headers: { 'X-MICROCMS-API-KEY': this.$config.apiKey },
      });

    const tagApiUrl = `${this.$config.tagApiUrl}?limit=50`
    const tag = await axios.get(
      tagApiUrl,
      {
        headers: { 'X-MICROCMS-API-KEY': this.$config.apiKey }
      });


    const categoryApiUrl = `${this.$config.categoryApiUrl}?limit=50`
    const category = await axios.get(
      categoryApiUrl,
      {
        headers: { 'X-MICROCMS-API-KEY': this.$config.apiKey }
      });

      commit('setPosts', post.data.contents)
      commit('setTags', tag.data.contents)
      commit('setCategories', category.data.contents)

  }
}


// export const actions = {

//   async asyncData({ commit, $config }) {
//     const getAllContents = async (limit=40, offset=0) => {
//       const postApiUrl = this.$config.postApiUrl

//       const post = await axios.get(
//         postApiUrl,
//         {
//           headers: { 'X-MICROCMS-API-KEY': this.$config.apiKey },
//           params: {
//             offset,
//             limit
//           }
//         }
//       )

//       postContents.push(...post.data.contents)

//       if (post.data.offset + post.data.limit < post.data.totalCount) {
//         getAllContents(post.data.limit, post.data.offset + post.data.limit)
//       }

//     }

//     const postContents = []
//     getAllContents()

//     const tagApiUrl = `${this.$config.tagApiUrl}?limit=100`
//     const tag = await axios.get(
//       tagApiUrl,
//       {
//         headers: { 'X-MICROCMS-API-KEY': this.$config.apiKey }
//       });

//     const categoryApiUrl = `${this.$config.categoryApiUrl}?limit=50`
//     const category = await axios.get(
//       categoryApiUrl,
//       {
//         headers: { 'X-MICROCMS-API-KEY': this.$config.apiKey }
//       });

//       commit('setPosts', postContents)
//       commit('setTags', tag.data.contents)
//       commit('setCategories', category.data.contents)

//   }
// }
