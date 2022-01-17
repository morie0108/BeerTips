<template>
  <ul>
    <li v-for="content in contents" :key="content.id">
      <nuxt-link :to="`/test/${content.id}`">
        {{ content.title }}
      </nuxt-link>
    </li>
  </ul>
</template>

<script>

export default {
  async asyncData({$microcms}) {
    const data = await $microcms.get({
      endpoint: 'blog',
      queries: { limit: 20, filters: 'createdAt[greater_than]2021' },
    });
    return data;
  }
}

</script>
