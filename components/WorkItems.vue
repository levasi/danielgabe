<template>
  <section class="section work" data-scroll-section>
    <div class="container">
      <h5 v-if="showTitle">Some of my projects</h5>
      <div class="work-items">
        <div
          class="work-item"
          :class="{
            ['half']: item.type === 'half',
          }"
          v-for="(item, index) in workItems"
          :key="index"
        >
          <img :src="item.image" :alt="item.alt" />
        </div>
      </div>
      <NuxtLink class="work-all" v-if="showMore" to="/work"
        >View all work +</NuxtLink
      >
    </div>
  </section>
</template>
<script>
export default {
  name: "WorkItems",
  props: {
    limit: {
      default: null,
    },
    showMore: {
      default: false,
    },
    showTitle: {
      default: false,
    },
  },
  computed: {
    workItems() {
      if (this.limit) {
        return this.$store.state.workItems.slice(0, this.limit);
      }
      return this.$store.state.workItems;
    },
  },
};
</script>