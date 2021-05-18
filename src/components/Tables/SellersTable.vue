<template>
  <div>
    <div v-if="$store.state.sellers">
      <pre>{{ $store.state.sellers }}</pre>
    </div>
    <div v-if="$store.state.shoes">
      <pre>{{ $store.state.shoes }}</pre>
    </div>
  </div>
</template>

<script>
export default {
  name: "Sellers",
  data() {
    return {
      columns: [
        {
          name: "email",
          required: true,
          label: "email",
          field: row => row.name,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: "firstName",
          required: true,
          label: "Имя",
          field: row => row.name,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: "secondName",
          required: true,
          label: "Фамилия",
          field: row => row.name,
          format: val => `${val}`,
          sortable: true
        }
      ]
    };
  },
  async created() {
    await this.$store.dispatch("FetchSellers");
  }
};
</script>

<style lang="scss" scoped></style>
