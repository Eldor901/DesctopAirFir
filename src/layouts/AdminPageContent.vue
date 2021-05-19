<template>
  <div>
    <h3 class="q-ma-md">{{ title }}</h3>
    <div class="q-ma-md">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: ["title"],
  name: "AdminPageContent"
};
</script>

<style lang="scss" scoped></style>
