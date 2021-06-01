<template>
  <admin-page-content title="Обработка Заказов">
    <orders-table />
  </admin-page-content>
</template>

<script>
import AdminPageContent from "src/layouts/AdminPageContent.vue";
import OrdersTable from "src/components/Tables/OrdersTable.vue";
export default {
  components: { AdminPageContent, OrdersTable },
  name: "Orders"
};
</script>

<style lang="scss" scoped></style>
