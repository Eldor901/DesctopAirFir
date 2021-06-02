<template>
  <admin-page-content title="Обработка комментариев">
    <comments-table />
  </admin-page-content>
</template>

<script>
import CommentsTable from "src/components/Tables/CommentsTable.vue";
import AdminPageContent from "src/layouts/PageContent.vue";
export default {
  components: { CommentsTable, AdminPageContent },
  name: "Comments"
};
</script>

<style lang="scss" scoped></style>
