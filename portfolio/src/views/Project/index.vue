<template>
   <div class="project-container">
      <!-- load in cards for each sub category within the current projectCategory -->
      <div v-if="projectEditor">
         <selector-checkbox
            v-if="$route.params.projectSubCategory"
            :items="['Add', 'Edit', 'Reorder']"
         />
         <editor-heading
            :title="projectEditorTitle"
            :btnText="'Home'"
            :class="{ topSpacing: !$route.params.projectSubCategory }"
         />
         <!-- <background-animation /> -->
         <project-editor
            v-if="$route.params.projectSubCategory"
            @get-data="initData"
         />
         <div v-if="!$route.params.projectSubCategory" class="editor-cards">
            <div
               class="card"
               v-for="item in [
                  { name: 'Add', iconClass: 'fas fa-plus' },
                  { name: 'Edit', iconClass: 'fas fa-edit' },
                  { name: 'Reorder', iconClass: 'fas fa-sort' },
               ]"
               :key="item"
               @click="changeEditorType(item)"
            >
               <p>{{ item.name }}</p>
               <i :class="item.iconClass"></i>
            </div>
         </div>
      </div>
      <!-- load in cards for each sub category within the current projectCategory -->
      <div v-else-if="projectHasSubCategory && !projectSubCategory">
         <page-heading
            class="page-heading-card"
            v-if="!projectEditor"
            @heading-button-click="headingBtnClick()"
            :title="projectCategory"
            :subTitle="''"
            :btnText="'My other projects'"
            :isSocialMediaShown="true"
            :isIllustrationShown="false"
         />
         <!-- <background-animation /> -->
         <div class="project-container__sub-categories">
            <text-card-block
               class="page-work-section"
               :title="'My projects'"
               :iconClass="''"
               :theme="'light'"
               :paragraphText="'Here are some projects I have worked on. Want a commission?'"
               :paragraphEmphasisText="'Contact me.'"
               :buttons="subCategories ? subCategories : []"
               :activeButton="activeSubCategory.sub_category_name"
               :items="subCategoriesItems"
               @sub-category-click="subCategoryClick($event)"
               @sub-category-card-click="subCategoryCardClick($event)"
            />
         </div>
      </div>
      <!-- load in description and buttons for project in subcategory in category -->
      <div v-else-if="projectHasSubCategory && projectSubCategory">
         <page-heading
            class="page-heading-card"
            v-if="!projectEditor"
            @heading-button-click="webProjectsClick()"
            :title="this.$route.params.projectName"
            :subTitle="projectSubCategory"
            :btnText="'My other projects'"
            :isSocialMediaShown="true"
            :isIllustrationShown="false"
         />

         <!-- <visualizations
            v-if="projectSubCategory === 'Visualizations'"
            class="project-about-block"
            :title="'About the project'"
            :iconClass="'fas fa-info-circle'"
            :theme="'dark'"
            :paragraphText="getProjectDescription"
            :projectName="this.$route.params.projectName"
            :buttons="
               getProjectHasCodeLink
                  ? [
                       {
                          hasIcon: true,
                          btnText: 'View the live site',
                          action: 'site',
                       },
                       {
                          hasIcon: true,
                          btnText: 'View the code',
                          action: 'code',
                       },
                    ]
                  : [
                       {
                          hasIcon: true,
                          btnText: 'View the live site',
                          action: 'site',
                       },
                    ]
            "
            @button-click="buttonClick($event)"
         /> -->

         <!-- v-else -->
         <text-button-block
            class="project-about-block"
            :title="'About the project'"
            :iconClass="'fas fa-info-circle'"
            :theme="'dark'"
            :paragraphText="getProjectDescription"
            :buttons="buildProjectButtons()"
            @button-click="buttonClick($event)"
         />
      </div>
      <!-- load in images in category -->
      <div v-else>
         <page-heading
            class="page-heading-card"
            v-if="!projectEditor"
            @heading-button-click="headingBtnClick()"
            :title="projectCategory"
            :subTitle="''"
            :btnText="'My other projects'"
            :isSocialMediaShown="true"
            :isIllustrationShown="false"
         />
         <!-- <background-animation /> -->
         <div class="project-gallery-block">
            <text-card-block
               class="project-image-gallery-block"
               :title="'Image gallery'"
               :iconClass="'fas fa-file-image'"
               :theme="'light'"
               :paragraphText="'Here are some projects I have worked on. Want a commission? Contact me.'"
               :paragraphEmphasisText="'Contact me.'"
               :buttons="[]"
               :shouldHaveNoImages="true"
               :items="[]"
            />
            <project-image-gallery :items="category ? category.images : []" />
         </div>
      </div>
   </div>
</template>

<script src="./project.js"></script>

<style lang="scss" src="./project.scss"></style>
