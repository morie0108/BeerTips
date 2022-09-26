<template>
  <v-container>
    <div>
      <picture>
        <source media="(max-width: 760px)" srcset="@/assets/images/main_visual.png">
        <source media="(max-width: 960px)" srcset="@/assets/images/main_visual_3.png">
        <img src="@/assets/images/main_visual_2.png" alt="メイン画像">
      </picture>
    </div>
    <div class="discription">
      <!-- <div v-if="mobile" class="mainImg">
        <img :src="imgSrc">
      </div>
      <div v-else class="mainImg">
        <img :src="imgSrcPc">
      </div> -->
      <div class="copy">
        <h1>にゃんと、日本のブルワリーは500を超える。</h1>
        <!-- <p>Cheers！僕たちはジャパニーズクラフトビールを楽しむTipsをお届けします。<br>クラフトビールを気になりはじめた、そんな方にオススメのブログです♪</p> -->
      </div>
    </div>
  </v-container>
</template>

// <script>

// export default {
//   data(){
//     return{
//       image: "main_visual.png",
//       imagePc: "main_visual_2.png",
//       mobile: {}
//     }
//   },
//   computed: {
//     imgSrc () {
//       return require("../../assets/images/" + this.image)
//     },
//     imgSrcPc () {
//       return require("../../assets/images/" + this.imagePc)
//     },
//   },
//   methods: {
//       handleResize: function() {
//         console.log(window.innerWidth)
//           if (window.innerWidth <= 960) {
//               this.mobile = true
//           } else {
//               this.mobile = false
//           }
//       }
//   },
//   created() {
//     if (process.browser){
//       console.log("created")
//       window.addEventListener('resize', this.handleResize)
//       this.handleResize()
//     }
//    },
//   destroyed() {
//     if (process.browser){
//       window.removeEventListener('resize', this.handleResize)
//     }
//   }
// }
// </script>

<style lang="scss" scoped>

.discription{
  width: 100%;
  background-color: #fff;
    // @media only screen and (min-width:960px) {
    //   display: flex;
    //   justify-content: center;
    // }
    .copy {
      margin: auto 6px;
    }
  text-align: center;

}


h1 {
  color: #000612;
  font-size: medium;
  text-align: center;
  margin: 10px;
  padding-top: 10px;
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
  display: block;
  width: 100%;
}
.container{
  max-width: 1920px;
}
</style>
