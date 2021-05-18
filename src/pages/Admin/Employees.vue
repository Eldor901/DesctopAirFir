<template>
  <admin-page-content title="Продавцы">
    <sellers-table />
  </admin-page-content>
</template>

<script>
import AdminPageContent from "src/layouts/AdminPageContent.vue";
import SellersTable from "src/components/Tables/SellersTable.vue";
export default {
  components: { AdminPageContent, SellersTable }
};
</script>

<style lang="scss" scoped></style>
