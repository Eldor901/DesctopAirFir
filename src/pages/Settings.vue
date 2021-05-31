<template>
  <div class="flex">
    <q-form @submit="onSubmit" class="q-gutter-md">
      <h5 class="q-ma-none">Изменить Данные</h5>
      <q-input
        @blur="changeName"
        dense
        filled
        v-model="formData.firstName"
        label="Имя"
        :rules="[val => !!val || 'поле не может быть пустым']"
        lazy-rules
      />
      <q-input
        @blur="changeName"
        v-model="formData.lastName"
        dense
        filled
        label="Фамилия"
        :rules="[val => !!val || 'поле не может быть пустым']"
        lazy-rules
      />

      <h5 class="q-ma-none">Изменить пороль</h5>
      <q-input
        style="width: 500px"
        dense
        v-model="form.oldPassword"
        filled
        label="Введите ваш старый пороль  *"
        lazy-rules
        :rules="[val => (val && val.length > 0) || 'поле не может быть пустым']"
      />

      <q-input
        style="width: 500px"
        filled
        dense
        v-model="form.password"
        label="Введите новый пороль *"
        lazy-rules
        :rules="[
          val =>
            (val && val.length >= 6) ||
            'Ваш пороль должен содержать больше чем 6 символов'
        ]"
      />

      <q-input
        style="width: 500px"
        dense
        v-model="form.passwordConfirm"
        filled
        label="Введите новый пороль еше раз *"
        lazy-rules
        :rules="[repeatPassword]"
      />

      <div>
        <q-btn label="Изменить" type="submit" color="primary" />
      </div>
    </q-form>
  </div>
</template>

<script>
export default {
  name: "Settings",
  data() {
    return {
      formData: {
        firstName: "",
        lastName: ""
      },
      form: {
        oldPassword: null,
        password: null,
        passwordConfirm: null
      }
    };
  },

  async created() {
    let resp = await this.$store.dispatch("FetchUserInfo");
    this.formData.firstName = resp.firstName;
    this.formData.lastName = resp.lastName;
  },

  methods: {
    repeatPassword() {
      if (this.form.password !== this.form.passwordConfirm) {
        return "пороли не совпали";
      }
    },
    async onSubmit() {
      await this.$store.dispatch("ChangePassword", this.form);
    },

    async changeName() {
      await this.$store.dispatch("ChangeUserData", this.formData);
    }
  }
};
</script>

<style lang="scss" scoped></style>
