<template>
  <div>
    obj
    <model-obj
      :backgroundAlpha="0"
      @on-load="onLoad"
      src="../../assets/3d/Lee.obj"
    ></model-obj>
    <!-- <div class="example-loading" v-show="loading"></div> -->

    <!-- <img src="../../assets/ex.jpg" /> -->

    <!-- <img src="../../assets/3d/ex.jpg" /> -->
    <!-- <model-fbx src="../../assets/3d/exFbx.fbx"> </model-fbx> -->

    <!-- <model-obj src="../../assets/3d/exObj.obj"></model-obj> -->
  </div>
</template>

<script>
import { ModelObj } from "vue-3d-model";
export default {
  name: "AddShoes",
  components: { ModelObj },
  data() {
    return {
      loading: true
    };
  },
  methods: {
    onLoad() {
      this.loading = false;
    }
  }
};
</script>

<style lang="scss" scoped></style>
