<template>
  <div class="q-pa-sm">
    <div v-if="$store.state.products.getInfoShoesCategoriesLoading">
      <q-spinner color="primary" size="3em" />
    </div>
    <div v-else>
      <div class="row" @mouseleave="mouseLeave()">
        <div class="col-6">
          <q-input
            standout
            no-error-icon
            dense
            filled
            v-model="form.name"
            label="Название *"
            lazy-rules
            :rules="[val => val && val.length > 0]"
          />
          <q-input
            standout
            no-error-icon
            dense
            filled
            :value="form.price"
            @input="form.price = Number($event)"
            label="цена (руб) *"
            lazy-rules
            fill-mask="0"
            reverse-fill-mask
            mask="#"
            :rules="[val => val]"
          />
          <q-select
            dense
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
          <q-select
            dense
            no-error-icon
            filled
            v-model="form.typeId"
            option-value="id"
            option-label="name"
            map-options
            emit-value
            :options="
              $store.state.products.getInfoShoesCategoriesData.shoeTypes
            "
            :rules="[val => val]"
            label="Тип"
          />
          <q-select
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
          <q-input
            standout
            no-error-icon
            dense
            filled
            v-model="form.description"
            label="Описание *"
            type="textarea"
            lazy-rules
            :rules="[val => val && val.length > 0]"
          />
          <h5 class="q-ma-none">Характеристика</h5>
          <q-select
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
          <q-input
            standout
            no-error-icon
            dense
            filled
            v-model="form.liningMaterial"
            label="Материал подкладки *"
            lazy-rules
            :rules="[val => val && val.length > 0]"
          />
          <q-input
            standout
            no-error-icon
            dense
            filled
            v-model="form.soleMaterial"
            label="Материал подошвы *"
            lazy-rules
            :rules="[val => val && val.length > 0]"
          />
          <q-input
            standout
            no-error-icon
            dense
            filled
            v-model="form.insoleMaterial"
            label="Материал стельки *"
            lazy-rules
            :rules="[val => val && val.length > 0]"
          />
        </div>
        <div class="col-6">
          <div class="q-pl-sm">
            <h6 class="q-ma-none">Размеры</h6>
            <template v-for="n in 15">
              <q-checkbox
                :key="n"
                v-model="form.sizes"
                :val="35 + n"
                :label="(35 + n).toString()"
              />
            </template>
            <h6 class="q-ma-none">
              Цвета
            </h6>
            <div v-if="allColors.length">
              <template v-for="renderColor of renderColors">
                <add-color-field
                  :renderValue="renderColor"
                  :key="renderColor.renderId"
                  :idRenderColor="renderColor.renderId"
                  :allColors="allColors"
                  @onSelect="SelectColor"
                  @onRemove="RemoveColor"
                />
              </template>
            </div>
            <div class="row justify-center  q-my-md">
              <div class="icon_hover">
                <q-icon
                  @click="onAddColor"
                  color="primary"
                  name="add_circle_outline"
                  class="cursor-pointer"
                  :style="{ 'font-size': '40px' }"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- {{ htmlColors }} -->
</template>

<script>
import AddColorField from "./AddColorField.vue";
export default {
  components: { AddColorField },
  props: ["formData"],
  name: "AddProductForm",
  data() {
    return {
      htmlColors: "",
      renderColors: [],
      allColors: [],
      
      form: {
        name: "",
        price: 0,
        description: "",
        brandId: "",
        typeId: "",
        genderId: "",
        seasonId: "",
        liningMaterial: "",
        soleMaterial: "",
        image: "",
        insoleMaterial: "",
        sizes: [],
        colors: []
      }
    };
  },
  async created() {
    await this.$store.dispatch("FetchCategories");
    this.allColors = this.$store.getters.getAllColors;
    if (this.formData.id) this.form = this.formData;
    if (this.formData.colors) {
      for (let val of this.formData.colors) {
        this.renderColors.push({
          renderId: Math.floor(Math.random() * Date.now()),
          colorId: val.colorId,
          name: val.color,
          texture: val.texture
        });
      }
    }
  },

  async mounted() {
    if (!this.form.colors) {
      this.onAddColor();
    }
  },

  methods: {
    async SelectColor(data) {
      const Idx = this.renderColors.findIndex(
        el => el.renderId === data.renderId
      );

      if (Idx >= 0) {
        this.renderColors[Idx] = data;
      }

      this.form.colors = this.renderColors;
    },
    async RemoveColor(data) {
      this.renderColors = this.renderColors.filter(el => el.renderId !== data);
      this.form.colors = this.renderColors;
    },

    onAddColor() {
      this.renderColors.push({
        renderId: Math.floor(Math.random() * Date.now()),
        colorId: null,
        texture: null
      });
    },
    mouseLeave(e) {
      this.$emit("onFormSumbit", this.form);
    }
  }
};
</script>

<style lang="scss" scoped>
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
