<template>
  <div v-if="$store.state.products.getInfoShoesCategoriesLoading">
    <q-spinner color="primary" size="3em" />
  </div>
  <div v-else>
    <div class="row q-gutter-sm">
      <div class="col-2">
        <q-input
          standout
          no-error-icon
          @blur="onBlur"
          dense
          filled
          :value="form.minPrice"
          @input="form.minPrice = Number($event)"
          label="цена от (руб) *"
          lazy-rules
          fill-mask="0"
          reverse-fill-mask
          mask="#"
          :rules="[val => val]"
        />
      </div>
      <div class="col-2">
        <q-input
          standout
          no-error-icon
          dense
          @blur="onBlur"
          filled
          :value="form.maxPrice"
          @input="form.maxPrice = Number($event)"
          label="цена до (руб) *"
          lazy-rules
          fill-mask="0"
          reverse-fill-mask
          mask="#"
          :rules="[val => val]"
        />
      </div>
      <div class="col-2">
        <q-select
          dense
          @blur="onBlur"
          filled
          v-model="form.brandId"
          option-value="id"
          option-label="name"
          no-error-icon
          map-options
          emit-value
          :options="$store.state.products.getInfoShoesCategoriesData.brands"
          :rules="[val => val]"
          label="Брэнд"
        />
      </div>
      <div class="col-2">
        <q-select
          dense
          @blur="onBlur"
          no-error-icon
          filled
          v-model="form.typeId"
          option-value="id"
          option-label="name"
          map-options
          emit-value
          :options="$store.state.products.getInfoShoesCategoriesData.shoeTypes"
          :rules="[val => val]"
          label="Тип"
        />
      </div>
      <div class="col-2">
        <q-select
          @blur="onBlur"
          dense
          no-error-icon
          filled
          v-model="form.genderId"
          option-value="id"
          option-label="name"
          map-options
          emit-value
          :options="$store.state.products.getInfoShoesCategoriesData.genders"
          :rules="[val => val]"
          label="Пол"
        />
      </div>
      <div class="col-2">
        <q-select
          @blur="onBlur"
          no-error-icon
          dense
          filled
          v-model="form.seasonId"
          option-value="id"
          option-label="name"
          map-options
          emit-value
          :options="$store.state.products.getInfoShoesCategoriesData.seasons"
          :rules="[val => val]"
          label="Сезон"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductFilter",
  data() {
    return {
      form: {
        brandId: this.$store.getters.getFilterData?.brandId || "",
        typeId: this.$store.getters.getFilterData?.typeId || "",
        genderId: this.$store.getters.getFilterData?.genderId || "",
        minPrice: this.$store.getters.getFilterData?.minPrice || "",
        maxPrice: this.$store.getters.getFilterData?.maxPrice || ""
      }
    };
  },
  async created() {
    await this.$store.dispatch("FetchCategories");
  },
  methods: {
    async onBlur() {
      await this.$store.commit("setFilter", this.form);
      await this.$store.dispatch("FetchAllProducts");
    }
  }
};
</script>

<style lang="scss" scoped></style>
