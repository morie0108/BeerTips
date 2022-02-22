<template>
    <div class="discription">
      <div class="mainImg">
        <img :src="imgSrc">
      </div>
      <div class="copy">
        <h1>にゃんと、日本のブルワリーは500を超える。</h1>
        <p>Cheers！僕たちはジャパニーズクラフトビールを楽しむTipsをお届けします。<br>クラフトビールを気になりはじめた、そんな方にオススメのブログです♪</p>
      <copy>
    </div>
</template>

<script>

export default {
  data(){
    return{
      image: "visual_cat.png",
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
  background-color: #fff;
    // @media only screen and (min-width:960px) {
    //   display: flex;
    //   justify-content: center;
    // }
    .copy {
      margin: auto 6px;
    }

}

.mainImg {
  text-align: center;
}
h1 {
  color: #000612;
  font-size: medium;
  text-align: center;
  margin: 10px;
  @media only screen and (min-width:960px) {
    font-size: x-large;
  }
}
p {
  // background-color: #f7f8ff;
  // border-radius: 16px;
  color: #000612;
  font-size: small;
  max-width: 300px;
  margin: auto;
  padding: 12px 10px;
  text-align: center;

  @media only screen and (min-width:960px) {
    font-size: large;
    max-width: 480px;
    padding: 24px 16px;
  }
}
  img {
      max-width: 360px;
      @media only screen and (max-width:360px) {
      max-width: 300px;
    }
      @media only screen and (min-width:960px) {
      max-width: 680px;
    }
  }
</style>
