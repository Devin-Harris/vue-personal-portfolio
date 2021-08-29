<template>
  <div class="project-add-container">
    <icon-heading :title="'Project Information'" :iconClass="'fas fa-info-circle'" :theme="'dark'" />
    <div class="project_container__add-selections">
      <simple-dropdown class="selector category-selector" :items="availableCategories.map((category) => category.name)" :labelText="'Project Category'" @selected-change="$emit('selected-category-change', $event)" />
      <simple-dropdown class="selector sub-category-selector" v-if="availableSubCategories.length > 0" :items="availableSubCategories" :labelText="'Project Sub Category'" @selected-change="$emit('selected-sub-change', $event)" />
      <div class="project-name-field" v-if="availableSubCategories.length > 0">
        <label for="project-name">Project Name</label>
        <input type="text" name="project-name" placeholder="Please enter a project name..." v-model="project.projectName" autocomplete="off" />
      </div>
      <div class="project-description-field" v-if="availableSubCategories.length > 0">
        <label for="project-description">Project Description</label>
        <textarea name="project-description" placeholder="Please enter a description..." v-model="project.projectDesc" />
      </div>
      <div class="project-live-site-field" v-if="availableSubCategories.length > 0">
        <label for="project-live-site">Project Site</label>
        <input type="text" name="project-live-site" placeholder="Please enter project site url..." v-model="project.projectSite" autocomplete="off" />
      </div>
      <div class="project-code-site-field" v-if="availableSubCategories.length > 0">
        <label for="project-code-site">Project Code</label>
        <input type="text" name="project-code-site" placeholder="Please enter project code url..." v-model="project.projectCode" autocomplete="off" />
      </div>
      <div class="project-images-field" v-if="availableSubCategories.length === 0">
        <label>Project Image(s)</label>
        <label class="urlPrefix">{{ urlPrefix }}</label>
        <div class="all-image-links" v-if="projectImages.length > 0 && false">
          <div class="image-link" v-for="imageValue in projectImages" :key="imageValue" @click="$emit('open-image', imageValue)">
            <p>{{ imageValue }}</p>
            <i @click.stop="$emit('remove-image', imageValue)" class="fas fa-trash"></i>
          </div>
        </div>
        <input type="text" placeholder="File name..." autocomplete="off" @keydown.enter.prevent="$emit('add-image', $event)" />
        <!-- <file-uploader :uploadedFiles="projectImages" @file-change="$emit('set-images', $event)" ></file-uploader> -->
      </div>
      <div class="project-display-image-field" v-else>
        <label>Display Image</label>
        <label class="urlPrefix">{{ urlPrefix }}</label>
        <div class="all-image-links" v-if="projectImages.length > 0">
          <div class="image-link" v-for="imageValue in projectImages" :key="imageValue" @click="$emit('open-image', imageValue)">
            <p>{{ imageValue }}</p>
            <i @click.stop="$emit('remove-image', imageValue)" class="fas fa-trash"></i>
          </div>
        </div>
        <input type="text" placeholder="File name..." autocomplete="off" @keydown.enter.prevent="$emit('add-image', $event)" v-if="projectImages.length === 0" />
      </div>
      <div class="project-security-field">
        <label for="project-security">Security Key</label>
        <span>*</span>
        <input class="security-input" type="text" name="project-security" placeholder="Please enter security key..." v-model="project.projectKey" autocomplete="off" required />
      </div>
      <div class="project-action-button">
        <editor-button :btnText="'Create Project'" :iconClass="'fas fa-plus'" :canClick="canClick" @editor-action-click="$emit('editor-action-click', project)" />
      </div>
    </div>
  </div>
</template>

<script src="./project-add.js"></script>

<style lang="scss" src="./project-add.scss"></style>
