<template>
  <div>
    <products-filter v-if="showFilter" />
    <q-table
      :loading="$store.state.products.getInfoProductsLoading"
      :pagination="initialPagination"
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
          <q-btn
            color="primary"
            label="Фильтры"
            @click="showFilter = !showFilter"
            icon="filter_list"
          />
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
            <q-icon
              name="delete_outline "
              class="icon_negative"
              @click="deleteProduct(props.key)"
            />
            <q-icon
              class="q-ml-sm icon_hover"
              @click="$router.push({ path: `admin/editproduct/${props.key}` })"
              name="edit"
            />
            <q-icon
              class="q-ml-sm icon_hover"
              name="list"
              @click="partialUpdate(props.key)"
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
import ProductsFilter from "../Filters/ProductsFilter.vue";
export default {
  components: { ProductsFilter },
  name: "SnikkersTable",
  data() {
    return {
      showFilter: false,
      initialPagination: {
        rowsPerPage: this.$store.getters.getFilterData.take
        // rowsNumber: xx if getting data from a server
      },
      params: {
        take: this.$store.getters.getFilterData.take,
        page: this.$store.getters.getFilterData.page
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
    await this.$store.dispatch("FetchAllProducts");
  },
  methods: {
    async refresh() {
      await this.$store.dispatch("FetchAllProducts");
    },

    async deleteProduct(id) {
      await this.$store.dispatch("DeleteProduct", id);
    },

    async partialUpdate(id) {
      await this.$store.dispatch("PartialUpdateProduct", id);
    },

    async pagination() {
      await this.$store.commit("setFilter", this.params);
      await this.$store.dispatch("FetchAllProducts");
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

.icon_hover {
  font-size: 20px;
  &:hover {
    color: $warning;
    font-size: 25px !important;
  }
}
</style>
