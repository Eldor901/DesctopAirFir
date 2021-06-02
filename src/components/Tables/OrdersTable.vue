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
      <template v-slot:top-right="props">
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
          clearable
          class="q-ml-sm border_default"
          style="min-width: 200px"
          outlined
          color="primary"
          dense
          v-model="params.status"
          :options="options"
          label="статус"
        />
        <q-btn
          flat
          color="primary"
          round
          dense
          :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
          @click="props.toggleFullscreen"
          class="q-ml-md"
        />
      </template>
      <template v-slot:top-left="">
        <q-input
          dense
          debounce="300"
          @keyup.enter="refresh"
          v-model="params.search"
          placeholder="поиск"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
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
      <template v-slot:body-cell-action="props">
        <td>
          <div class="seller_container">
            <div v-if="props.row.status === 'На обработке'">
              <q-icon
                class="q-ml-sm icon_hover"
                name="airport_shuttle"
                style="font-size: 25px"
                @click="sendOrder(props.key)"
              />
              <q-tooltip>
                Отправить
              </q-tooltip>
            </div>
            <div class="row" v-else-if="props.row.status === 'Возврат'">
              <div class="col-6">
                <q-icon
                  class="q-mr-lg icon_hover"
                  name="assignment_return"
                  style="font-size: 25px"
                  @click="returnMoney(props.key)"
                />
                <q-tooltip>
                  Возврат денег
                </q-tooltip>
              </div>
              <div class="col-6">
                <q-icon
                  class="q-ml-sm icon_hover"
                  name="block"
                  style="font-size: 25px"
                  @click="cancelReturn(props.key)"
                />
                <q-tooltip>
                  Отменить Возврат
                </q-tooltip>
              </div>
            </div>
          </div>
        </td>
      </template>
      ></q-table
    >
  </div>
</template>

<script>
const perPage = 10;
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
        rowsPerPage: perPage
      },
      params: {
        take: perPage,
        status: "",
        search: null,
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
        },
        {
          name: "action",
          required: true,
          label: "",
          align: "left",
          field: "actions"
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
        take: perPage,
        status: this.params.status,
        search: this.params.search,
        page: 1
      };
      await this.$store.dispatch("FetchAllOrders", this.params);
    },

    async onStatusChange() {
      await this.$store.dispatch("FetchAllOrders", this.params);
    },

    async sendOrder(id) {
      await this.$store.dispatch("SendOrder", id);
      await this.refresh();
    },

    async returnMoney(id) {
      await this.$store.dispatch("ReturnMoney", id);
      await this.refresh();
    },

    async cancelReturn(id) {
      await this.$store.dispatch("CanselReturn", id);
      await this.refresh();
    },

    toggle(e) {
      const target = e.target.parentNode.parentNode.parentNode;

      this.$q.fullscreen
        .toggle(target)
        .then(() => {})
        .catch(err => {
          alert(err);
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
