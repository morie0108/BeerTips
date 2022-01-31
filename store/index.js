import defaultEyeCatch from '~/assets/images/defaultEyeCatch.png'
import client from '~/plugins/contentful'
import axios from 'axios'



export const state = () => ({
  posts: [],
  categories: [],
  tags: [],
  testPosts: [],
  testTags: [],
  testCategories: [],
})

export const getters = {

  test: state => {
    return state.test
  },
  getTestPost: state => {
    return state.testPosts
  },
  getTestTags: state => {
    return state.testTags
  },
  getTestCategories: state => {
    return state.testCategories
  },

  testLinkTo: () => (name, obj) => {
    return { name: `${name}-slug`, params: { slug: obj.id } }
  },

  setEyeCatch: () => (post) => {
    if (!!post.fields.image && !!post.fields.image.fields) {
      return { url: `https:${post.fields.image.fields.file.url}`, title: post.fields.image.fields.title }
    } else {
      return { url: defaultEyeCatch, title: 'defaultImage' }
    }
  },
  draftChip: () => (post) => {
    if (!post.fields.publishDate) {
      return 'draftChip'
    }
  },
  linkTo: () => (name, obj) => {
    return { name: `${name}-slug`, params: { slug: obj.fields.slug } }
  },

  relatedPosts: state => (category) => {
    const posts = []
    for (let i = 0; i < state.posts.length; i++) {
      const catId = state.posts[i].fields.category.sys.id
      if (category.sys.id === catId) { posts.push(state.posts[i]) }
    }
    return posts
  },

  testRelatedPosts: state => (category) => {
    const posts = []
    for (let i = 0; i < state.posts.length; i++) {
      const catId = state.posts[i].fields.category.sys.id
      if (category.sys.id === catId) { posts.push(state.posts[i]) }
    }
    return posts
  },


  testAssociateTagPosts: state => (currentTag) => {
    const posts = []
    //object に入っているtags をforeach で取り出すところから

    Object.keys(state.testPosts).forEach((key) => {

      if (state.testPosts[key].tags) {
        const tags = state.testPosts[key].tags
        // console.log(tags)
        const tag = tags.find(tags => tags.id === currentTag.id)
        if (tag) { posts.push(state.testPosts[key]) }
      }
    });
    // console.log(posts)
    // console.log(posts.length)
    return posts
  },

  testAssociateCategoryPosts: state => (currentCategory) => {
    const posts = []
    //object に入っているtags をforeach で取り出すところから

    Object.keys(state.testPosts).forEach((key) => {

    if (state.testPosts[key].category) {
        const categories = []
        categories.push(state.testPosts[key].category)
        // console.log(categories)
        // console.log(currentCategory)
        const category = categories.find(categories => categories.id === currentCategory.id)
        // console.log(category)
        if (category) {
          posts.push(state.testPosts[key])
        }
      }
    });
    return posts
  },

  associateTagPosts: state => (currentTag) => {
    const posts = []
    for (let i = 0; i < state.posts.length; i++) {
      const post = state.posts[i]
      if (post.fields.tags) {
        const tag = post.fields.tags.find(tag => tag.sys.id === currentTag.sys.id)

        if (tag) { posts.push(post) }
      }
    }
    return posts
  },

  associateCategoryPosts: state => (currentCategory) => {
    const posts = []
    for (let i = 0; i < state.posts.length; i++) {
      const post = state.posts[i]
      if (post.fields.category) {
        const category = post.fields.category.sys.id === currentCategory.sys.id ? true:false;
        if (category) { posts.push(post) }
      }
    }
    return posts
  }
}

export const mutations = {
  setPosts (state, payload) {
    state.posts = payload
  },
  setLinks (state, entries) {
    state.tags = []
    state.categories = []
    for (let i = 0; i < entries.length; i++) {
      const entry = entries[i]
      if (entry.sys.contentType.sys.id === 'tag') {
        state.tags.push(entry)
      } else if (entry.sys.contentType.sys.id === 'category') {
        state.categories.push(entry)
      }
    }
    state.categories.sort((a, b) => a.fields.sort - b.fields.sort)
  },
  setTestPosts (state, payload) {
    state.testPosts = payload
  },
  setTestTag (state, payload) {
    state.testTags = payload
  },
  setTestCategory (state, payload) {
    state.testCategories = payload
  },
}

export const actions = {
  async getPosts({ commit }) {
    await client.getEntries({
      content_type: process.env.CTF_BLOG_POST_TYPE_ID,
      order: '-fields.publishDate', // desc
      include: 1
    }).then((res) => {
      commit('setLinks', res.includes.Entry)
      commit('setPosts', res.items)
    }).catch(console.error)
  },

  async asyncData({ commit, $config }) {
    const post = await axios.get(
      this.$config.blogApiUrl,
      {
        headers: { 'X-MICROCMS-API-KEY': this.$config.apiKey }
      });

    const tag = await axios.get(
      this.$config.tagApiUrl,
      {
        headers: { 'X-MICROCMS-API-KEY': this.$config.apiKey }
      });

    const category = await axios.get(
      this.$config.categoryApiUrl,
      {
        headers: { 'X-MICROCMS-API-KEY': this.$config.apiKey }
      });

    // console.log(post.data.contents[0])

      commit('setTestPosts', post.data.contents)
      commit('setTestTag', tag.data.contents)
      commit('setTestCategory', category.data.contents)


  }
}
