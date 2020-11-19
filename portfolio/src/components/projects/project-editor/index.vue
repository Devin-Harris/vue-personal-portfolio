<template>
  <div class="project-editor-container">
    <request-message
      v-if="requestMessage"
      :requestMessage="requestMessage"
      @request-btn-click="requestBtnHandler($event)"
    />

    <div
      class="project_container__add"
      v-if="editorType === 'add' && !requestMessage"
    >
      <icon-heading
        :title="'Project Information'"
        :iconClass="'fas fa-info-circle'"
        :theme="'dark'"
      />
      <div class="project_container__add-selections">
        <simple-dropdown
          class="selector category-selector"
          :items="availableCategories.map((category) => category.name)"
          :labelText="'Project Category'"
          @selected-change="categoryChanged($event)"
        />
        <simple-dropdown
          class="selector sub-category-selector"
          v-if="availableSubCategories.length > 0"
          :items="availableSubCategories"
          :labelText="'Project Sub Category'"
          @selected-change="subCategoryChanged($event)"
        />
        <div
          class="project-name-field"
          v-if="availableSubCategories.length > 0"
        >
          <label for="project-name">Project Name</label>
          <input
            type="text"
            name="project-name"
            placeholder="Please enter a project name..."
            v-model="projectName"
            autocomplete="off"
          />
        </div>
        <div
          class="project-description-field"
          v-if="availableSubCategories.length > 0"
        >
          <label for="project-description">Project Description</label>
          <textarea
            type="text"
            name="project-description"
            placeholder="Please enter a description..."
            v-model="projectDesc"
          />
        </div>
        <div
          class="project-images-field"
          v-if="availableSubCategories.length === 0"
        >
          <label>Project Image(s)</label>
          <label class="urlPrefix">{{ urlPrefix }}</label>
          <div class="all-image-links" v-if="projectImages.length > 0">
            <div
              class="image-link"
              v-for="imageValue in projectImages"
              :key="imageValue"
              @click="openImage(imageValue)"
            >
              <p>{{ imageValue }}</p>
              <i @click.stop="removeImage(imageValue)" class="fas fa-trash"></i>
            </div>
          </div>
          <input
            type="text"
            placeholder="File name..."
            autocomplete="off"
            @keydown.enter.prevent="addImage"
          />
        </div>
        <div class="project-display-image-field" v-else>
          <label>Display Image</label>
          <label class="urlPrefix">{{ urlPrefix }}</label>
          <div class="all-image-links" v-if="projectImages.length > 0">
            <div
              class="image-link"
              v-for="imageValue in projectImages"
              :key="imageValue"
              @click="openImage(imageValue)"
            >
              <p>{{ imageValue }}</p>
              <i @click.stop="removeImage(imageValue)" class="fas fa-trash"></i>
            </div>
          </div>
          <input
            type="text"
            placeholder="File name..."
            autocomplete="off"
            @keydown.enter.prevent="addImage"
            v-if="projectImages.length === 0"
          />
        </div>
        <div class="project-security-field">
          <label for="project-security">Security Key</label>
          <span>*</span>
          <input
            class="security-input"
            type="text"
            name="project-security"
            placeholder="Please enter security key..."
            v-model="projectKey"
            autocomplete="off"
            required
          />
        </div>
        <div class="project-action-button">
          <editor-button
            :btnText="'Create Project'"
            :iconClass="'fas fa-plus'"
            :canClick="canClick"
            @editor-action-click="editorActionClick"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./project-editor.js"></script>

<style lang="scss" src="./project-editor.scss"></style>
