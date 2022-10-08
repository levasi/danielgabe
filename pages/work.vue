<template>
  <div>
    <Subheader
      title="Creating next level digital products"
      headline="My work"
    />
    <WorkItems />
  </div>
</template>

<script>
export default {
  name: "Work",
  computed: {
    workItems() {
      return this.$store.state.workItems;
    },
  },
};
</script>