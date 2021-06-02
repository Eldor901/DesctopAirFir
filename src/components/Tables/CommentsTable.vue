<template>
  <div>
    <q-table
      :loading="$store.state.comments.getInfoCommentsLoading"
      :pagination="initialPagination"
      :data="
        $store.state.comments.getInfoCommentsData &&
          $store.state.comments.getInfoCommentsData.estimations
      "
      :columns="columns"
      row-key="id"
    >
      <template v-slot:top-right="">
        <div class="q-gutter-sm">
          <q-btn
            color="primary"
            label="Обновить"
            @click="refresh"
            icon="refresh"
          />
        </div>
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

      <template v-slot:body-cell-estimation="props">
        <td>
          <span style="font-size: 20px">
            {{ props.row.estimation }}
          </span>
        </td>
      </template>

      <template v-slot:body-cell-action="props">
        <td>
          <div class="seller_container">
            <q-icon
              @click="handleComment(props.row)"
              name="comment"
              class="icon_hover"
              style="font-size: 25px"
            />
            <q-tooltip>
              Просмотр
            </q-tooltip>
          </div>
        </td>
      </template>
      <template v-slot:bottom="">
        <div class="pagination">
          <q-pagination
            @input="pagination"
            v-model="params.page"
            :max="
              $store.state.comments.getInfoCommentsData &&
                $store.state.comments.getInfoCommentsData.pageCount
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
const perPage = 10;
export default {
  name: "CommentsTable",
  data() {
    return {
      initialPagination: {
        rowsPerPage: perPage
      },
      params: {
        take: perPage,
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
          name: "productName",
          required: true,
          label: "Имя Продукта",
          align: "left",
          field: "productName"
        },
        {
          name: "brand",
          required: true,
          label: "Брэнд",
          align: "left",
          field: "brand"
        },
        {
          name: "estimation",
          required: true,
          label: "Оценка (5)",
          align: "left",
          field: "estimation"
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
    await this.$store.dispatch("FetchAllComments", this.params);
  },

  methods: {
    async pagination() {
      await this.$store.dispatch("FetchAllComments", this.params);
    },

    async openComment() {
      await this.$store.dispatch("");
    },

    async refresh() {
      this.params = {
        take: perPage,
        search: this.params.search,
        page: 1
      };
      await this.$store.dispatch("FetchAllComments", this.params);
    },

    async handleComment(data) {
      await this.$store.dispatch("OpenComment", data);
      await this.refresh();
    }
  }
};
</script>

<style lang="scss" scoped>
.pagination {
  margin: 20px auto;
}
</style>
