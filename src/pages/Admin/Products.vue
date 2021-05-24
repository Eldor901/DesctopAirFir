<template>
  <admin-page-content title="Обувь">
    <products-table />
  </admin-page-content>
</template>

<script>
import AdminPageContent from "src/layouts/AdminPageContent.vue";
import ProductsTable from "src/components/Tables/ProductsTable.vue";
export default {
  components: { AdminPageContent, ProductsTable },
  name: "AddShoes"
};
</script>

<style lang="scss" scoped></style>
