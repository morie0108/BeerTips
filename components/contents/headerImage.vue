<template>
    <div class="discription">
      <div class="mainImg">
        <img :src="imgSrc">
      </div>
      <div class="copy">
        <h1>まだ見ぬクラフトビールと出会おう</h1>
        <p>BeerTips では日本全国にある500以上のブルワリーで創られる、ビールの情報をお届けします。</p>
      <copy>
    </div>
</template>

<script>

export default {
  data(){
    return{
      image: "pale-705.png",
    }
  },
  computed: {
    imgSrc () {
      return require("../../assets/images/" + this.image)
    },
  }
}
</script>

<style lang="scss" scoped>

.discription{
  width: 100%;
  margin-bottom: 20px;
  background-color: #030c20;
    @media only screen and (min-width:960px) {
      display: flex;
      justify-content: center;
    }
    .copy {
      margin: auto 32px;
    }

}

.mainImg {
  text-align: center;
}
h1 {
  color: aliceblue;
  font-size: large;
  text-align: center;
  margin: 10px;
  @media only screen and (min-width:960px) {
    font-size: x-large;
  }
}
p {
  // background-color: #f7f8ff;
  // border-radius: 16px;
  color: aliceblue;
  max-width: 540px;
  margin: auto;
  padding: 12px 10px;
  text-align: center;
  @media only screen and (min-width:960px) {
    font-size: large;
    padding: 24px 16px;
  }
}
  img {
      max-width: 240px;
      max-height: 240px;
  }
</style>
