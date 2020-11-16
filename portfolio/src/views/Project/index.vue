<template>
  <div class="project-container">

    <div v-if="projectEditor">
     <!-- load in cards for each sub category within the current projectCategory -->
     <editor-heading :title="projectEditorTitle" :btnText="'Go back to home page'" />
    </div>

    <div v-else-if="projectHasSubCategory && !projectSubCategory">
     <!-- load in cards for each sub category within the current projectCategory -->
    </div>

    <div v-else-if="projectHasSubCategory && projectSubCategory">
      <!-- load in description and buttons for project in subcategory in category -->
    </div>

    <div v-else>
      <!-- load in category and corresponding images with that category -->
      <page-heading
        class="page-heading-card"
        :title="projectCategory"
        :subTitle="''"
        :btnText="'View my other work'"
        :isSocialMediaShown="true"
        :isIllustrationShown="false"
      />
    </div>

  </div>
</template>

<script src="./project.js"></script>

<style lang="scss" src="./project.scss"></style>
