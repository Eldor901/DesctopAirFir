<template>
  <q-layout>
    <q-page-container>
      <q-page class="flex bg-image flex-center">
        <q-card
          v-bind:style="$q.screen.lt.sm ? { width: '80%' } : { width: '30%' }"
        >
          <q-card-section>
            <q-avatar size="103px" class="absolute-center shadow-10">
              <img src="profile.svg" />
            </q-avatar>
          </q-card-section>
          <q-card-section>
            <div class="text-center q-pt-lg">
              <div class="col text-h6 ellipsis">
                Вход
              </div>
            </div>
          </q-card-section>
          <q-card-section>
            <q-form class="q-gutter-md" @submit.prevent="onSubmit">
              <q-input
                :rules="[isValidEmail]"
                filled
                v-model="username"
                label="Email"
                lazy-rules
              />
              <q-input
                type="password"
                filled
                v-model="password"
                :rules="[
                  val =>
                    (val && val.length > 6) ||
                    'пороль должен содержать не мение 6 символов'
                ]"
                label="Пороль"
                lazy-rules
              />

              <div class="text-center">
                <q-btn label="Войти" type="submit" color="primary" />
              </div>
            </q-form>
          </q-card-section>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    async onSubmit() {
      console.log(this.username, this.password);
      await this.$store.dispatch("LOGIN", {
        email: this.username,
        password: this.password
      });
    },
    isValidEmail() {
      const emailPattern = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
      return emailPattern.test(this.username) || "пожулуста ввидите email";
    }
  }
};
</script>

<style>
.bg-image {
  background-image: linear-gradient(135deg, blue 0%, black);
}
</style>
