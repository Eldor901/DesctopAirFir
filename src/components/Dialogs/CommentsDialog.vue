<template>
  <div>
    <q-dialog ref="dialog" @hide="onDialogHide">
      <q-card style="width: 600px">
        <q-card-section>
          <h6 class="q-ma-none">Подробная информация об Комментарий</h6>
          <p>Имя: {{ userInfo.firstName }}</p>
          <p>Фамилия: {{ userInfo.lastName }}</p>
          <p>Электронная почта: {{ userInfo.email }}</p>
          <p>Комментарий: {{ userInfo.comment }}</p>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            label="Удалить Комментарий"
            color="primary"
            class="q-px-md"
            @click="onYesClick"
          />
          <q-btn
            flat
            label="Назад"
            class="q-px-md"
            color="primary"
            @click="onNoClick"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
export default {
  props: ["userInfo"],
  name: "CommentsDialog",
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

<style lang="scss" scoped>
p {
  margin-top: 5px;
  margin-bottom: 5px;
  word-wrap: break-word;
  font-size: 18x;
  padding: 5px;
}

p:nth-child(2n) {
  background: $accent;
}
</style>
