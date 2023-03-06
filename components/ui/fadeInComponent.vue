<template>
    <div class="fadeUp">
      <v-slot v-show="visible"></v-slot>
      <!-- slot から変更 -->
    </div>
</template>

<script>
  export default {
    data() {
      return {
        visible: false
      };
    },
    created() {
      if (process.browser) {
        window.addEventListener("scroll", this.handleScroll);
      }
    },
    destroyed() {
      if (process.browser) {
        window.removeEventListener("scroll", this.handleScroll);
      }
    },
    methods: {
      handleScroll() {
        if (!this.visible) {
          var top = this.$el.getBoundingClientRect().top;
          this.visible = top < window.innerHeight + 100;
        }
      }
    }
  }
</script>

<style>
.fadeUp {
  animation-name:fadeUpAnime;
  animation-duration:0.5s;
  animation-fill-mode:forwards;
  opacity:0;
}
@keyframes fadeUpAnime{
  from {
    opacity: 0;
	  transform: translateY(200px);
  }

  to {
    opacity: 1;
	  transform: translateY(0);
  }
}
</style>
