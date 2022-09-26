<template>
  <v-container fluid>
    <headerImage />
    <itemComponent />
    <bunnerComponent />
    <newArticleComponent />
  </v-container>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import headerImage from '~/components/contents/headerImage'
import itemComponent from '~/components/contents/itemComponent'
import bunnerComponent from '~/components/contents/bunnerComponent'
import newArticleComponent from '~/components/contents/newArticleComponent'


export default {
  data(){
    return{
      page: 1,
      length:0,
      displayLists: [],
      pageSize: 10,
    }
  },
  components: {
    headerImage,
    itemComponent,
    bunnerComponent,
    newArticleComponent
  },
  computed: {
    ...mapState(['posts']),
    ...mapGetters(['linkTo']),
    post() {
    const blog = this.$store.getters.getPosts
    return blog
  },
    categoryColor () {
      return (category) => {
        switch (category.name) {
          case 'Beer': return '#FFEE58'
          case 'Brewery': return '#A7FFEB'
          case 'Shop・Service': return '#B39DDB'
          case 'Tips': return '#FFB74D'
          default: return '#424242'
        }
      }
    }
  },
  mounted (){
    this.posts
    this.length = Math.ceil(this.posts.length/this.pageSize);
    this.displayLists = this.posts.slice(this.pageSize*(this.page -1), this.pageSize*(this.page));

  },
  methods: {
    pageChange: function(pageNumber){
      this.displayLists = this.posts.slice(this.pageSize*(pageNumber -1), this.pageSize*(pageNumber));
      this.returnTop()
    },
    returnTop() {
      window.scrollTo({
        top: 0,
        behavior: 'auto'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .container{
    padding: 0px;
  }
  .discription{
    padding: 10px 0px;
    width: 90%;
    margin: auto;
  }
  .pageNation{
    margin-top: 20px;
    margin-bottom: 32px;
  }
  .row{
    padding: 10px
  }
  .link-color{
    color: black;
  }

h2 {
  font-size: large;
  text-align: center;
  margin: 16px;
}
.v-card__subtitle, .v-card__text, .v-card__title {
    padding: 8px 12px;
}
.title {
  justify-content: center;
}
</style>
