<template>
  <admin-page-content title="Добавить обувь">
    <div class="border-container">
      <q-form
        @submit="onSubmit"
        v-if="!reset"
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
                <upload-file-field @getfileUrl="form.image = $event" />
              </div>
            </div>
          </div>
          <div class="col-7">
            <add-product-form @onFormSumbit="onFormSumbit" />
          </div>
        </div>
        <div class="q-gutter-sm text-right content-end q-my-md q-mx-md">
          <q-btn
            label="Добавить"
            class="q-px-lg"
            color="primary"
            type="submit"
          />
          <q-btn label="Очистить" type="reset" class="q-px-lg" />
        </div>
        {{ form }}
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
      reset: false,
      form: {}
    };
  },
  mounted() {},
  methods: {
    onFormSumbit(form) {
      this.form = form;
    },
    onAdd() {
      console.log(this.form);
    },
    onSubmit() {
      console.log("submut", this.form);
    },
    onReset() {
      //reset for rerendiring component with empty value
      this.form = null;
      this.onFormReset = null;
      this.reset = true;
      setTimeout(() => {
        this.reset = false;
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
