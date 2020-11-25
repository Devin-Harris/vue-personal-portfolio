<template>
  <div class="project-edit-container">
    <icon-heading :title="'Select a project'" :iconClass="'fas fa-search'" :theme="'dark'" />
    <div class="project_container__search">
      <simple-dropdown class="selector category-selector" :items="availableCategories.map((category) => category.name)" :labelText="'Project Category'" @selected-change="$emit('selected-category-change', $event)" />
      <simple-dropdown class="selector sub-category-selector" v-if="availableSubCategories.length > 0" :items="availableSubCategories" :labelText="'Project Sub Category'" @selected-change="$emit('selected-sub-change', $event)" />
      <simple-dropdown class="selector name-selector" v-if="availableSubCategories.length > 0" :items="availableNames" :labelText="'Project Name'" @selected-change="$emit('selected-name-change', $event)" />
    </div>

    <icon-heading :title="'Edit this project'" :iconClass="'fas fa-edit'" :theme="'dark'" />
    <div>
      <simple-dropdown class="selector sub-category-selector" v-if="availableSubCategories.length > 0" :items="availableSubCategories" :labelText="'Move to Project Sub Category'" @selected-change="moveToSubCategory($event)" />
      <div class="project-name-field" v-if="availableSubCategories.length > 0">
        <label for="project-name">Project Name</label>
        <input type="text" name="project-name" :placeholder="selectedName" v-model="project.changedName" autocomplete="off" />
      </div>
      <div class="project-description-field" v-if="availableSubCategories.length > 0">
        <label for="project-description">Project Description</label>
        <textarea name="project-description" :placeholder="selectedDesc ? '' : 'No description found...'" v-model="project.changedDesc" />
      </div>
      <div class="project-live-site-field" v-if="availableSubCategories.length > 0">
        <label for="project-live-site">Project Site</label>
        <input type="text" name="project-live-site" :placeholder="selectedSite ? '' : 'No site found...'" v-model="project.changedSite" autocomplete="off" />
      </div>
      <div class="project-code-site-field" v-if="availableSubCategories.length > 0">
        <label for="project-code-site">Project Code</label>
        <input type="text" name="project-code-site" :placeholder="selectedCode ? '' : 'No code found...'" v-model="project.changedCode" autocomplete="off" />
      </div>
      <div class="project-images" v-if="availableSubCategories.length === 0">
        <label>Project Image(s)</label>
        <label class="urlPrefix">{{ urlPrefix }}</label>
        <draggable v-if="draggableImages && changedProjectImages && draggableImages.length > 0" :list="draggableImages" class="dragArea list-group w-full">
          <draggable-item v-for="(imageValue, i) in draggableImages" :canEdit="true" :key="imageValue" :hasActions="true" :value="imageValue" @value-change="changeValue($event, i)" @remove-image="removeImage(imageValue)" @open-image="$emit('open-image', imageValue)" />
        </draggable>
      </div>
      <div class="project-display-image" v-else>
        <label>Display Image</label>
        <label class="urlPrefix">{{ urlPrefix }}</label>
        <draggable v-if="draggableImages && changedProjectImages && draggableImages.length > 0" :list="draggableImages" class="dragArea list-group w-full">
          <draggable-item v-for="(imageValue, i) in draggableImages" :canEdit="true" :key="imageValue" :hasActions="true" :value="imageValue" @value-change="changeValue($event, i)" @remove-image="removeImage(imageValue)" @open-image="$emit('open-image', imageValue)" />
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

<script src="./project-edit.js"></script>

<style lang="scss" src="./project-edit.scss"></style>
