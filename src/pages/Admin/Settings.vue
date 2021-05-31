<template>
  <div class="q-ml-xl q-mt-xl">
    <settings />
  </div>
</template>

<script>
import AdminPageContent from "src/layouts/AdminPageContent.vue";
import settings from "src/pages/Settings.vue";

export default {
  name: "AdminSettings",
  components: { AdminPageContent, settings }
};
</script>

<style lan AdminPageContentg="scss" scoped></style>
