<template>
  <div :class="{ upload_photo_small_continer: !showFile }">
    <!-- <input
      style="display: none"
      id="file-upload"
      type="file"
      @change="onFileSelected"
      accept=".jpg, .jpeg, .png"
    />
    asd -->
    <label class="file-select">
      <!-- We can't use a normal button element here, as it would become the target of the label. -->
      <div
        class="select-button row justify-center content-center"
        :class="{ upload_photo_small: !showFile }"
      >
        <!-- Display the filename if a file has been selected. -->

        <div>
          <template v-if="!showFile">
            <template v-if="photoUrl || this.url">
              Файл Выбран
            </template>
            <template v-else>
              Выбрать Файл
            </template>
          </template>
          <template v-if="showFile && !photoUrl && !this.url"
            >Выбрать файл</template
          >
        </div>

        <img v-if="showFile" :src="this.url || photoUrl" />
      </div>
      <!-- Now, the file input that we hide. -->
      <input
        type="file"
        accept=""
        @drop="handleFileChange"
        @change="handleFileChange"
      />
    </label>
  </div>
</template>

<script>
export default {
  name: "UploadFileField",
  props: ["showFile", "url"],
  data() {
    return {
      photoUrl: this.url || null
    };
  },

  mounted() {},

  methods: {
    async handleFileChange(e) {
      this.photoUrl = await this.$store.dispatch(
        "UPLOADFILE",
        e.target.files[0]
      );
      this.$emit("getfileUrl", this.photoUrl);
    }
  }
  //   props: ["fileName"],
  //   data() {
  //     return {
  //       photoUrl: this.fileName || ""
  //     };
  //   },
  //   methods: {
  //     async onFileSelected(event) {
  //       this.photoUrl = await this.$store.dispatch(
  //         "UPLOADFILE",
  //         event.target.files[0]
  //       );
  //     }
};
</script>

<style lang="scss" scoped>
.file-select > .select-button {
  padding: 1rem;
  height: 250px;
  border: 1px solid #c4c4c4;
  color: black;
  cursor: pointer;
  background-color: white;
  font-size: 20px;

  border-radius: 0.3rem;

  text-align: center;
  font-weight: bold;
}

/* Don't forget to hide the original file input! */
.file-select > input[type="file"] {
  display: none;
}

img {
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;
}

.upload_photo_small_continer {
  width: 100%;
}

.upload_photo_small {
  height: 20px !important;
  font-size: 12px !important;
}
</style>
