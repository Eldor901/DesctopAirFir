<template>
  <div>
    <q-table
      :loading="$store.state.products.getInfoProductsLoading"
      :data="
        $store.state.products.getInfoProductsData &&
          $store.state.products.getInfoProductsData.products
      "
      :columns="columns"
      row-key="id"
    >
      <template v-slot:top-right>
        <div class="q-gutter-sm">
          <q-btn
            color="primary "
            icon="add"
            label="Добавить"
            @click="$router.push({ name: 'addProduct' })"
          />
          <q-btn color="primary" label="Обновить" icon="refresh" />
        </div>
      </template>
      <template v-slot:top-left>
        <q-input dense debounce="300" placeholder="поиск по названию">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
      <template v-slot:body-cell-action="props">
        <td>
          <div class="seller_container">
            <q-icon name="delete_outline" class="icon_negative" />
            {{ props.id }}
            <q-icon
              class="q-ml-sm icon_negative cursor-pointer"
              name="lock_open"
            />
          </div>
        </td>
      </template>

      <template v-slot:bottom="">
        <div class="pagination">
          <q-pagination
            @input="pagination"
            v-model="params.page"
            :max="
              $store.state.products.getInfoProductsData &&
                $store.state.products.getInfoProductsData.pageCount
            "
            direction-links
            :max-pages="6"
            boundary-links
            icon-first="skip_previous"
            icon-last="skip_next"
            icon-prev="fast_rewind"
            icon-next="fast_forward"
          />
        </div>
      </template>
    </q-table>
  </div>
</template>

<script>
export default {
  name: "SnikkersTable",
  data() {
    return {
      params: {
        take: 1,
        page: 1
      },
      columns: [
        {
          name: "name",
          required: true,
          label: "Названия",
          align: "left",
          field: "name"
        },
        {
          name: "brand",
          align: "left",
          label: "Бренд",
          field: "brand"
        },
        {
          name: "price",
          align: "center",
          label: "Цена (Руб)",
          field: "price"
        },
        {
          name: "action",
          align: "center",
          label: "",
          field: "action"
        }
      ]
    };
  },

  async created() {
    await this.$store.dispatch("FetchAllProducts", this.params);
  },

  methods: {
    async refresh() {
      await this.$store.dispatch("FetchAllProducts");
    },

    async pagination() {
      await this.$store.dispatch("FetchAllProducts", this.params);
    }
  }
};
</script>

<style lang="scss" scoped>
.seller_container {
  width: 25px;
}
.pagination {
  margin: 20px auto;
}
</style>
