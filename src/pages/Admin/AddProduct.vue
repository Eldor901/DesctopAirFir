<template>
  <admin-page-content title="Добавить обувь" returnBack="true">
    <div v-if="loading">
      <q-spinner color="primary" size="3em" />
    </div>
    <div class="border-container" v-else>
      <q-form
        @submit="onSubmit"
        v-if="reset"
        @reset="onReset"
        class="q-gutter-md"
      >
        <div class="row">
          <div class="col-5">
            <div class="show3dContainer q-ml-sm q-my-sm">
              <iframe
                ref="iframe3d"
                src="https://3dviewer.net/"
                title="W3Schools Free Online Web Tutorials"
              >
              </iframe>
            </div>
            <div class="row">
              <div class="q-my-md q-mx-sm col-6">
                <upload-file-field
                  @getfileUrl="form.image = $event"
                  :showFile="true"
                  :url="form.image"
                />
              </div>
            </div>
          </div>
          <div class="col-7">
            <add-product-form :formData="form" @onFormSumbit="onFormSumbit" />
          </div>
        </div>
        <div class="q-gutter-sm text-right content-end q-my-md q-mx-md">
          <q-btn
            :label="$route.params.id ? 'Изменить' : 'Добавить'"
            class="q-px-lg"
            color="primary"
            type="submit"
          />
          <q-btn label="Очистить" type="reset" class="q-px-lg" />
        </div>
      </q-form>
    </div>
  </admin-page-content>
</template>

<script>
import AdminPageContent from "src/layouts/AdminPageContent.vue";
import AddProductForm from "src/components/forms/AddProductForm.vue";
import UploadFileField from "src/components/forms/UploadFileField.vue";
export default {
  name: "AddProduct",
  components: { AdminPageContent, AddProductForm, UploadFileField },
  data() {
    return {
      reset: true,
      loading: false,
      form: {}
    };
  },
  async created() {
    if (this.$route.params.id) {
      this.loading = true;
      let resp = await this.$store.dispatch(
        "FetchProduct",
        this.$route.params.id
      );
      this.form = resp;
      this.loading = false;
    }
  },
  methods: {
    onFormSumbit(form) {
      this.form = form;
    },
    onAdd() {},
    onSubmit() {
      if (this.$route.params.id) {
        this.$store.dispatch("UpdateProduct", {
          id: this.$route.params.id,
          form: this.form
        });
      } else this.$store.dispatch("CreateProduct", this.form);
    },
    onReset() {
      //reset for rerendiring component with empty value
      this.reset = false;
      setTimeout(() => {
        this.form = {};
        this.onFormReset = null;
        this.reset = true;
      }, 10);
    }
  }
};
</script>

<style lang="scss" scoped>
.show3dContainer {
  height: 100%;
  max-height: 450px;
}

iframe {
  width: 100%;
  height: 450px;
}

.border-container {
  border: 1px solid #c4c4c4;
  border-radius: 10px;
}
</style>
