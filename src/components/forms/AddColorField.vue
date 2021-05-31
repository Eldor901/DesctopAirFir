<template>
  <div class="q-ma-sm row">
    <div class="row content-center q-pa-sm app_border">
      <q-btn
        class="square"
        :style="{
          'background-color': choosenColor.name
        }"
      >
        <q-menu fit>
          <q-list style="min-width: 100px">
            <q-item
              clickable
              v-close-popup
              :key="color.name"
              v-for="color in allColors"
            >
              <q-item-section @click="onSelect(color)" :key="color.name">
                <q-btn
                  class="square"
                  :style="{
                    'background-color': color.name
                  }"
                ></q-btn>
              </q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>
      <q-icon name="arrow_drop_down" style="font-size: 20px" color="primary" />
    </div>
    <div
      class="q-ml-sm col-lg-9 col-md-7"
      :class="{ lower_opacity: choosenColor.texture }"
    >
      <upload-file-field @getfileUrl="onFileUploaded" />
    </div>
    <div
      class="row q-ml-sm delete icon_hover delete_icon content-center app_border delete"
    >
      <q-icon
        @click="$emit('onRemove', idRenderColor)"
        name="remove"
        class="icon_hover"
        :style="{ 'font-size': '30px' }"
      />
    </div>
  </div>
</template>

<script>
import UploadFileField from "./UploadFileField.vue";
export default {
  components: { UploadFileField },
  name: "AddColorField",
  props: ["renderValue", "allColors", "idRenderColor"],
  data() {
    return {
      choosenColor: {
        name: this.renderValue.name || this.allColors[0].name || "red",
        colorId: this.renderValue.colorId || this.allColors[0].id || "0",
        renderId: this.idRenderColor || "0",
        texture: this.renderValue.texture || ""
      },
      colors: [],
      colorsOption: []
    };
  },
  created() {
    this.$emit("onSelect", this.choosenColor);
  },

  methods: {
    onSelect(color) {
      this.choosenColor.colorId = color.id;
      this.choosenColor.name = color.name;
      this.renderId = this.idRenderColor;
      this.$emit("onSelect", this.choosenColor);
    },
    onFileUploaded(event) {
      this.choosenColor.texture = event;
      this.$emit("onSelect", this.choosenColor);
    }
  }
};
</script>

<style lang="scss" scoped>
.square {
  width: 20px;
  height: 20px;
  box-shadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px";
}

.select_container_color {
  border: 1px solid #c4c4c4;
  border-radius: 10px;
}

.delete_icon {
  border-radius: 50px;
}

.delete {
  cursor: pointer;
  &:hover {
    background: red;
    color: white;
  }
}
</style>
