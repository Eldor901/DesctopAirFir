<template>
  <div>
    <q-dialog ref="dialog" @hide="onDialogHide">
      <q-card style="width: 600px">
        <q-card-section>
          <div class="text-h6 q-ma-none">Частичное изменения товара</div>
        </q-card-section>
        <q-card-section>
          <q-input
            standout
            no-error-icon
            dense
            filled
            :value="allData.price"
            @input="allData.price = Number($event)"
            label="цена (руб) *"
            lazy-rules
            fill-mask="0"
            reverse-fill-mask
            mask="#"
            :rules="[val => val]"
          />
          <div class="q-ml-sm">
            <div class="row ">
              <div class="col-4 ">Размер</div>
              <div class="col-4">Цвет</div>
              <div class="col-4">Количество</div>
            </div>
            <template v-for="(quantity, index) in allData.quantities">
              <div class="row q-mt-sm" :key="index">
                <div class="col-4">
                  {{ quantity.size }}
                </div>
                <div class="col-4">
                  <q-btn
                    class="square"
                    disable
                    :style="{
                      'background-color': quantity.color
                    }"
                  ></q-btn>
                </div>
                <div class="col-4">
                  <q-input
                    standout
                    no-error-icon
                    dense
                    filled
                    :value="allData.quantities[index].quantity"
                    @input="allData.quantities[index].quantity = Number($event)"
                    label="количество"
                    lazy-rules
                    fill-mask="0"
                    reverse-fill-mask
                    mask="#"
                    :rules="[val => val]"
                  />
                </div>
              </div>
            </template>
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Добавить" color="primary" @click="onYesClick" />
          <q-btn flat label="Отменить" color="primary" @click="onNoClick" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
export default {
  props: ["data"],
  name: "PartialUpdateDialog",
  data() {
    return {
      allData: this.data
    };
  },
  methods: {
    show() {
      this.$refs.dialog.show();
    },
    // following method is REQUIRED
    // (don't change its name --> "hide")
    hide() {
      this.$refs.dialog.hide();
    },
    onYesClick() {
      console.error(this.allData);
      this.$emit("ok", this.allData);
      this.hide();
    },
    onDialogHide() {
      this.$emit("hide");
    },

    onNoClick() {
      // we just need to hide dialog
      this.hide();
    }
  }
};
</script>

<style lang="scss" scoped></style>
