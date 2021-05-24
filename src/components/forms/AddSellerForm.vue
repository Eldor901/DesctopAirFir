<template>
  <div>
    <q-dialog v-model="isFormOpen" persistent>
      <q-card>
        <div style="height: 20px">
          <q-btn
            dense
            flat
            icon="close"
            class="float-right q-mr-sm q-mt-sm"
            @click="onClose"
            v-close-popup
          >
            <q-tooltip>Закрыть</q-tooltip>
          </q-btn>
        </div>
        <div class="q-my-xl q-mx-sm">
          <div class="text-center">
            <q-icon name="face" style="font-size: 4em;" />
          </div>
          <q-card-section class="items-center" style="width: 500px">
            <q-input
              class="q-mb-xs"
              dense
              filled
              v-model="form.email"
              label="Email"
              :rules="[ValidateEmail]"
              lazy-rules
            />
            <q-input
              class="q-mb-xs"
              dense
              filled
              v-model="form.firstName"
              label="Имя"
              :rules="[val => !!val || 'поле не может быть пустым']"
              lazy-rules
            />
            <q-input
              dense
              filled
              v-model="form.lastName"
              label="Фамилия"
              :rules="[val => !!val || 'поле не может быть пустым']"
              lazy-rules
            />
          </q-card-section>

          <q-card-actions align="right">
            <q-btn
              label="Добавить"
              class="full-width"
              color="primary"
              @click="onAddSeller"
            />
          </q-card-actions>
        </div>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { isValidEmail } from "src/utils/emailValidation.js";
export default {
  name: "AddSellerForm",
  props: ["isFormOpen"],
  data() {
    return {
      form: {
        email: "",
        firstName: "",
        lastName: ""
      }
    };
  },
  methods: {
    onClose() {
      this.$emit("onClose", false);
    },
    async ValidateEmail(val) {
      return isValidEmail(val);
    },
    async onAddSeller() {
      await this.$store.dispatch("AddSeller", this.form);
      this.onClose();
    }
  }
};
</script>

<style lang="scss" scoped></style>
