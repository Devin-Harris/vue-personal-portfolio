<template>
  <div class="project-reorder-container">
    <icon-heading :title="'Reorder projects'" :iconClass="'fas fa-sort'" :theme="'dark'" />
    <div class="project-categories">
      <label>All Categories</label>
      <draggable v-if="availableCategories && availableCategories.length > 0" :list="availableCategories" class="dragArea list-group w-full">
        <draggable-item v-for="category in availableCategories" :key="category" :hasActions="false" :value="category.name" />
      </draggable>
    </div>

    <div class="project-sub-categories">
      <label>All Sub Categories</label>
      <draggable v-if="availableSubCategories.length > 0" :list="availableSubCategories" class="dragArea list-group w-full">
        <draggable-item v-for="subCategory in availableSubCategories" :key="subCategory" :hasActions="false" :value="subCategory.sub_category_name" />
      </draggable>
    </div>

    <icon-heading :title="'Select a sub category'" :iconClass="'fas fa-search'" :theme="'dark'" />
    <div>
      <simple-dropdown class="selector sub-category-selector" v-if="availableSubCategories.length > 0" :items="availableSubCategories.map((sc) => sc.sub_category_name)" :labelText="'Project Sub Category'" @selected-change="subCategoryChanged($event)" />
      <div class="project-current-sub-categories">
        <label>Current Sub Category Projects</label>
        <draggable v-if="availableProjects.length > 0" :list="availableProjects" class="dragArea list-group w-full">
          <draggable-item v-for="project in availableProjects" :key="project" :hasActions="false" :value="project.name" />
        </draggable>
      </div>
      <div class="project-security-field">
        <label for="project-security">Security Key</label>
        <span>*</span>
        <input class="security-input" type="text" name="project-security" placeholder="Please enter security key..." v-model="project.projectKey" autocomplete="off" required />
      </div>
      <div class="project-action-button">
        <editor-button :btnText="'Upload Changes'" :iconClass="'fas fa-plus'" :canClick="canClick" @editor-action-click="editorActionClick" />
      </div>
    </div>
  </div>
</template>

<script src="./project-reorder.js"></script>

<style lang="scss" src="./project-reorder.scss"></style>
