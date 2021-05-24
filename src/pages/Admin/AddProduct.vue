<template>
  <admin-page-content title="Добавить обувь">
    <div class="border-container">
      <div class="row">
        <div class="col-6">
          <div class="show3dContainer">
            <iframe
              ref="iframe3d"
              src="https://3dviewer.net/"
              title="W3Schools Free Online Web Tutorials"
            >
            </iframe>
          </div>
          <div></div>
        </div>
        <div class="col-6">
          <add-product-form />
        </div>
      </div>
    </div>
  </admin-page-content>
</template>

<script>
import AdminPageContent from "src/layouts/AdminPageContent.vue";
import AddProductForm from "src/components/forms/AddProductForm.vue";
export default {
  name: "AddProduct",
  components: { AdminPageContent, AddProductForm },
  mounted() {}
};
</script>

<style lang="scss" scoped>
.show3dContainer {
  height: 100%;
  min-height: 600px;
}

iframe {
  width: 100%;
  height: 100%;
}

.border-container {
  border: 1px solid #c4c4c4;
  border-radius: 10px;
}
</style>
