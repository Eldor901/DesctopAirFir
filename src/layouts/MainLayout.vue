<template>
  <q-layout view="lHh lpR fFf">
    <q-header elevated class="bg-secondary text-primary">
      <q-toolbar class="justify-between">
        <div>
          <q-btn dense flat round icon="menu" @click="left = !left" />
        </div>
        <div>
          <q-icon
            @click="onQuite"
            name="logout"
            class="cursor-pointer"
            style="font-size: 25px;"
          />
        </div>
      </q-toolbar>
    </q-header>
    <q-drawer show-if-above v-model="left" side="left" elevated>
      <q-list padding>
        <div class="text-center q-mt-sm">
          <arfit-admin-svg />
        </div>
        <template v-for="route in routes">
          <router-link :key="route.name" exact :to="{ name: route.name }">
            <q-item
              class="q-mx-md q-my-sm border_default item_hover"
              :active="route.name === activeRouteName"
              active-class="bg-primary"
              clickable
              @click="activeRouteName = route.name"
              v-ripple
            >
              <q-item-section
                avatar
                :class="
                  route.name === activeRouteName ? 'text-white' : 'text-black'
                "
              >
                <q-icon :name="route.icon_name" />
              </q-item-section>

              <q-item-section
                :class="
                  route.name === activeRouteName
                    ? 'text-secondary'
                    : 'text-primary'
                "
              >
                {{ route.text }}
              </q-item-section>
            </q-item>
          </router-link>
        </template>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import ArfitAdminSvg from "src/assets/svg/ArfitAdminSvg.vue";
export default {
  components: { ArfitAdminSvg },
  props: ["routes"],
  data() {
    return {
      left: false,
      active: false,
      activeRouteName: ""
    };
  },
  methods: {
    async onQuite() {
      await this.$store.dispatch("LOGOUT");
    }
  }
};
</script>

<style lang="scss" scoped>
.item_hover {
  &:hover {
    background: $accent;
  }
  &:focus {
    background: $accent;
  }
}
</style>
