<template>
  <div>
    <q-dialog ref="dialog" @hide="onDialogHide">
      <q-card style="width: 400px">
        <q-card-section>
          <h6 class="q-ma-none">{{ title }}</h6>
        </q-card-section>

        <q-input
          class="q-mx-md"
          filled
          v-model="trackCode"
          dense
          label="трек-номер"
          lazy-rules
          :rules="[
            val => (val && val.length > 0) || 'Пожалуста введите трек код'
          ]"
        />

        <q-card-actions align="right">
          <q-btn
            :disable="!trackCode"
            label="Отправить"
            color="primary"
            @click="onYesClick"
          />
          <q-btn flat label="Отменить" color="primary" @click="onNoClick" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
export default {
  props: ["title"],
  name: "SendTrackCodeDialog",
  data() {
    return {
      trackCode: ""
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
      this.$emit("ok", this.trackCode);
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
