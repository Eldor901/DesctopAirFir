<template>
  <q-layout>
    <q-page-container>
      <q-page class="flex flex-center">
        <div
          class="text-center"
          v-bind:style="$q.screen.lt.sm ? { width: '80%' } : { width: '30%' }"
        >
          <arfit-login-svg />
          <q-card>
            <q-card-section>
              <div class="text-center q-pt-lg">
                <div class="col text-h5 ellipsis">
                  Вход
                </div>
              </div>
            </q-card-section>
            <q-card-section>
              <q-form class="" @submit.prevent="onSubmit">
                <q-input
                  class="q-mb-sm"
                  :rules="[ValidateEmail]"
                  filled
                  v-model="username"
                  label="Email"
                  lazy-rules
                />
                <q-input
                  type="password"
                  class="q-pa-none"
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
                <div class="text-right q-pt-lg q-pb-sm">
                  <span class="cursor-pointer">Забыли парол?</span>
                </div>

                <div class="text-center">
                  <q-btn
                    label="Войти"
                    class="q-px-xl q-py-xs q-my-md"
                    type="submit"
                    color="primary"
                  />
                </div>
              </q-form>
            </q-card-section>
          </q-card>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import ArfitLoginSvg from "src/assets/svg/ArfitLoginSvg.vue";
import { isValidEmail } from "src/utils/emailValidation.js";

export default {
  components: { ArfitLoginSvg },
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
    async ValidateEmail(val) {
      return isValidEmail(val);
    }
  }
};
</script>

<style>
.bg-image {
  background-image: linear-gradient(135deg, white 0%, white);
}
</style>
