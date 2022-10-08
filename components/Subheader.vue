<template>
  <section class="section subheader" data-scroll-section>
    <div class="container">
      <div class="subheader-top">
        <span v-if="headline" v-html="headline"></span>
        <span v-if="rightHeadline" v-html="rightHeadline"></span>
      </div>
      <h1 v-if="title" class="page-title" v-html="title"></h1>
    </div>
  </section>
</template>
<script>
export default {
  name: "Subheader",
  props: {
    title: "",
    headline: "",
    rightHeadline: "",
  },
};
</script>
