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
        <div class="q-gutter-sm">
          <q-btn
            color="primary "
            icon="add"
            label="Добавить"
            @click="isFormOpen = true"
          />

          <q-btn
            color="primary"
            label="Обновить"
            icon="refresh"
            @click="getUsers"
          />
        </div>
      </template>
      <template v-slot:top-left>
        <q-input dense debounce="300" v-model="filter" placeholder="поиск">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
      <template v-slot:body-cell-action="props">
        <td>
          <div class="seller_container">
            <q-icon
              name="delete_outline"
              class="icon_negative cursor-pointer"
              @click="deleteUser(props.key)"
            />
            {{ props.id }}
            <q-icon
              class="q-ml-sm icon_negative cursor-pointer"
              name="lock_open"
              @click="reset_password(props.key)"
            />
          </div>
        </td>
      </template>
    </q-table>
    <add-seller-form :isFormOpen="isFormOpen" @onClose="isFormOpen = $event" />
  </div>
</template>

<script>
import AddSellerForm from "../forms/AddSellerForm.vue";
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
          label: "Электронная почта",
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
        },
        {
          name: "action",
          align: "center",
          label: "",
          field: "action",
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
    },
    async deleteUser(id) {
      await this.$store.dispatch("DeleteUser", id);
    },

    async reset_password(id) {
      await this.$store.dispatch("ResetPassword", id);
    }
  }
};
</script>

<style lang="scss" scoped>
.seller_container {
  width: 25px;
}
</style>
