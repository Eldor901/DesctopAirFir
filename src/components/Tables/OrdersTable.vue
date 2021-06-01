<template>
  <div>
    <q-table
      :loading="$store.state.orders.getInfoOrdersLoading"
      :pagination="initialPagination"
      :data="
        $store.state.orders.getInfoOrdersData &&
          $store.state.orders.getInfoOrdersData.orders
      "
      :columns="columns"
      row-key="id"
    >
      <template v-slot:top-right>
        <div class="q-gutter-sm">
          <q-btn
            color="primary"
            label="Обновить"
            @click="refresh"
            icon="refresh"
          />
        </div>
        <q-select
          @input="onStatusChange"
          class="q-ml-sm border_default"
          style="min-width: 200px"
          outlined
          color="primary"
          dense
          v-model="params.status"
          :options="options"
          label="статус"
        />
      </template>
      <template v-slot:top-left="props">
        <div class="q-gutter-sm">
          <q-btn
            flat
            color="primary"
            round
            dense
            :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
            @click="props.toggleFullscreen"
            class="q-ml-md"
          />
        </div>
      </template>
      <template v-slot:bottom="">
        <div class="pagination">
          <q-pagination
            @input="pagination"
            v-model="params.page"
            :max="
              $store.state.orders.getInfoOrdersData &&
                $store.state.orders.getInfoOrdersData.pageCount
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
      ></q-table
    >
  </div>
</template>

<script>
export default {
  name: "OrdersTable",
  data() {
    return {
      options: [
        "На обработке",
        "Доставляется",
        "Доставлено",
        "Возврат",
        "Завершено",
        "Возвращено"
      ],
      initialPagination: {
        rowsPerPage: 10
      },
      params: {
        take: 10,
        status: "",
        page: 1
      },
      columns: [
        {
          name: "firstName",
          required: true,
          label: "Имя",
          align: "left",
          field: "firstName"
        },
        {
          name: "lastName",
          required: true,
          label: "фамилия",
          align: "left",
          field: "lastName"
        },
        {
          name: "email",
          required: true,
          label: "Электронная почта",
          align: "left",
          field: "email"
        },
        {
          name: "address",
          required: true,
          label: "Адрес доставки",
          align: "left",
          field: "address"
        },
        {
          name: "postalCode",
          required: true,
          label: "Индекс доставки",
          align: "left",
          field: "postalCode"
        },
        {
          name: "createdTime",
          required: true,
          label: "Дата заказа",
          align: "left",
          field: "createdTime"
        },
        {
          name: "updatedTime",
          required: true,
          label: "Дата последнего изменения",
          align: "left",
          field: "updatedTime"
        },
        {
          name: "status",
          required: true,
          label: "Статус",
          align: "left",
          field: "status"
        }
      ]
    };
  },

  async created() {
    await this.$store.dispatch("FetchAllOrders", this.params);
  },

  methods: {
    async pagination() {
      await this.$store.dispatch("FetchAllOrders", this.params);
    },

    async refresh() {
      this.params = {
        take: 10,
        status: "",
        page: 1
      };
      await this.$store.dispatch("FetchAllOrders", this.params);
    },

    async onStatusChange() {
      await this.$store.dispatch("FetchAllOrders", this.params);
    },

    toggle(e) {
      const target = e.target.parentNode.parentNode.parentNode;

      this.$q.fullscreen
        .toggle(target)
        .then(() => {
          // success!
        })
        .catch(err => {
          alert(err);
          // uh, oh, error!!
          // console.error(err)
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.pagination {
  margin: 20px auto;
}
</style>
