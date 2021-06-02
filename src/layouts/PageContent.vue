<template>
  <div>
    <h3 class="q-ma-md">
      {{ title }}

      <span>
        <q-icon
          v-if="returnBack"
          name="arrow_back"
          class="icon_hover"
          @click="$router.go(-1)"
        />
        <q-tooltip>
          Вернутся назад
        </q-tooltip>
      </span>
    </h3>
    <div class="q-ma-md">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: ["title", "returnBack"],
  name: "AdminPageContent"
};
</script>

<style lang="scss" scoped></style>
