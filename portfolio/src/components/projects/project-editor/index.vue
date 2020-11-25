<template>
  <div class="project-editor-container">
    <request-message v-if="requestMessage" :requestMessage="requestMessage" @request-btn-click="requestBtnHandler($event)" />

    <project-add
      v-if="editorType === 'add' && !requestMessage"
      :availableSubCategories="availableSubCategories"
      :urlPrefix="urlPrefix"
      :selectedCategory="selectedCategory"
      :selectedSubCategory="selectedSubCategory"
      :availableCategories="availableCategories"
      :projectImages="projectImages"
      :requestMessage="requestMessage"
      @selected-sub-change="subCategoryChanged($event)"
      @selected-category-change="categoryChanged($event)"
      @open-image="openImage($event)"
      @remove-image="removeImage($event)"
      @add-image="addImage"
      @editor-action-click="editorActionClick($event)"
    />

    <project-edit
      v-if="editorType === 'edit' && !requestMessage"
      :availableSubCategories="availableSubCategories"
      :urlPrefix="urlPrefix"
      :selectedCategory="selectedCategory"
      :selectedSubCategory="selectedSubCategory"
      :availableNames="availableNames"
      :selectedName="selectedName"
      :selectedCode="selectedCode"
      :selectedSite="selectedSite"
      :selectedDesc="selectedDesc"
      :availableCategories="availableCategories"
      :projectImages="projectImages"
      :requestMessage="requestMessage"
      @selected-sub-change="subCategoryChanged($event)"
      @selected-category-change="categoryChanged($event)"
      @selected-name-change="nameChanged($event)"
      @open-image="openImage($event)"
      @remove-image="removeImage($event)"
      @add-image="addImage"
      @editor-action-click="editorActionClick"
    />

    <project-reorder
      v-if="editorType === 'reorder' && !requestMessage"
      :availableSubCategories="availableSubCategories"
      :urlPrefix="urlPrefix"
      :selectedCategory="selectedCategory"
      :selectedSubCategory="selectedSubCategory"
      :availableNames="availableNames"
      :selectedName="selectedName"
      :selectedCode="selectedCode"
      :selectedSite="selectedSite"
      :selectedDesc="selectedDesc"
      :availableCategories="availableCategories"
      :projectImages="projectImages"
      :requestMessage="requestMessage"
      @selected-sub-change="subCategoryChanged($event)"
      @selected-category-change="categoryChanged($event)"
      @selected-name-change="nameChanged($event)"
      @open-image="openImage($event)"
      @remove-image="removeImage($event)"
      @add-image="addImage"
      @editor-action-click="editorActionClick"
    />
  </div>
</template>

<script src="./project-editor.js"></script>

<style lang="scss" src="./project-editor.scss"></style>
