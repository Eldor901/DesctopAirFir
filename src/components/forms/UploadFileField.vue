<template>
  <div>
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
      <div class="select-button row justify-center content-center">
        <!-- Display the filename if a file has been selected. -->

        <div v-if="!photoUrl">
          <template>Выбрать файл</template>
        </div>

        <img :src="photoUrl" />
      </div>
      <!-- Now, the file input that we hide. -->
      <input
        type="file"
        accept=".jpg, .jpeg, .png"
        @drop="handleFileChange"
        @change="handleFileChange"
      />
    </label>
  </div>
</template>

<script>
export default {
  name: "UploadFileField",
  data() {
    return {
      photoUrl: ""
    };
  },

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
</style>
