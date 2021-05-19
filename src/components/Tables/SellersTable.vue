<template>
  <div>
    <q-table
      :loading="$store.state.sellers.getInfoSellersLoading"
      :data="$store.state.sellers.getInfoSellersData"
      :columns="columns"
      :pagination.sync="pagination"
      :filter="filter"
      row-key="id"
    >
      <template v-slot:top-right>
        <q-btn color="primary q-mr-sm" @click="isFormOpen = true"
          >Добавить</q-btn
        >
        <q-btn color="primary" @click="getUsers">Обновить</q-btn>
      </template>
      <template v-slot:top-left>
        <q-input dense debounce="300" v-model="filter" placeholder="поиск">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
    </q-table>
    <add-seller-form :isFormOpen="isFormOpen" @onClose="isFormOpen = $event" />
  </div>
</template>

<script>
import AddSellerForm from "../forms/sellers/AddSellerForm.vue";
export default {
  name: "Sellers",
  components: { AddSellerForm },
  data() {
    return {
      isFormOpen: false,
      filter: "",
      columns: [
        {
          name: "email",
          required: true,
          label: "email",
          align: "left",
          field: "email",
          sortable: true
        },
        {
          name: "firstName",
          align: "left",
          label: "Имя",
          field: "firstName",
          sortable: true
        },
        {
          name: "lastName",
          align: "left",
          label: "Фамилия",
          field: "lastName",
          sortable: true
        }
      ],
      pagination: {
        rowsPerPage: 10
      }
    };
  },

  async created() {
    await this.$store.dispatch("FetchSellers");
  },

  methods: {
    async getUsers() {
      await this.$store.dispatch("FetchSellers");
    }
  }
};
</script>

<style lang="scss" scoped></style>
