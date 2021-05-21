<template>
  <div>
    <q-dialog ref="dialog" @hide="onDialogHide">
      <q-card style="width: 600px">
        <q-card-section>
          <h6 class="q-ma-none">{{ title }}</h6>
        </q-card-section>
        <q-card-section class="row items-center">
          <span class="q-ml-sm">
            <p class="text-subtitle1">
              {{ text }}
            </p>
          </span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Да" color="primary" @click="onYesClick" />
          <q-btn flat label="Нет" color="primary" @click="onNoClick" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
export default {
  props: ["title", "text"],
  name: "ConfirmDialog",
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
      this.$emit("ok");
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
