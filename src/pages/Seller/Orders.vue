<template>
  <admin-page-content title="Обработка заказов">
    <orders-table />
  </admin-page-content>
</template>

<script>
import AdminPageContent from "src/layouts/PageContent.vue";
import OrdersTable from "src/components/Tables/OrdersTable.vue";
export default {
  components: { AdminPageContent, OrdersTable },
  name: "Orders"
};
</script>

<style lang="scss" scoped></style>
