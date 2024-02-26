import SelectorCheckbox from '@/components/buttons/selector-checkbox';
import SimpleDropdown from '@/components/dropdowns/simple-dropdown';
import BackgroundAnimation from '@/components/headings/background-animation';
import EditorHeading from '@/components/headings/editor-heading';
import IconHeading from '@/components/headings/icon-heading';
import PageHeading from '@/components/headings/page-heading';
import ProjectEditor from '@/components/projects/project-editor';
import ProjectImageGallery from '@/components/projects/project-image-gallery';
import TextButtonBlock from '@/components/text-blocks/text-button-block';
import TextCardBlock from '@/components/text-blocks/text-card-block';
import { mapActions, mapGetters } from 'vuex';
// import Visualizations from './visualizations';

export default {
   name: 'project',
   components: {
      PageHeading,
      EditorHeading,
      IconHeading,
      TextCardBlock,
      TextButtonBlock,
      SimpleDropdown,
      ProjectImageGallery,
      ProjectEditor,
      SelectorCheckbox,
      BackgroundAnimation,
      // Visualizations,
   },
   data() {
      return {
         projectHasSubCategory: false,
         category: {},
         subCategories: [],
         activeSubCategory: {},
      };
   },
   computed: {
      ...mapGetters(['getCategories', 'getSubCategories']),
      projectCategory() {
         if (
            this.$route.params.projectCategory === 'editor' &&
            !this.$route.params.projectSubCategory
         )
            return this.$route.params.projectCategory;
         if (
            this.$route.params.projectSubCategory === 'add' ||
            this.$route.params.projectSubCategory === 'edit' ||
            this.$route.params.projectSubCategory === 'reorder'
         )
            return this.$route.params.projectSubCategory;

         if (
            this.getCategories &&
            this.getCategories.data &&
            this.$route.params.projectCategory
         )
            this.category = this.getCategories.data.find(
               (c) => c.name === this.$route.params.projectCategory
            );

         if (
            this.category &&
            this.category.subCategories &&
            this.category.subCategories.length > 0
         ) {
            this.subCategories = this.getSubCategories.data;
            if (this.subCategories)
               this.activeSubCategory = this.subCategories[0];
            this.projectHasSubCategory = true;
         } else {
            this.subCategories = [];
            this.activeSubCategory = '';
            this.projectHasSubCategory = false;
         }
         return this.$route.params.projectCategory;
      },
      projectEditor() {
         if (
            this.projectCategory === 'add' ||
            this.projectCategory === 'edit' ||
            this.projectCategory === 'reorder' ||
            this.projectCategory === 'delete' ||
            this.projectCategory === 'editor'
         ) {
            return true;
         } else {
            return false;
         }
      },
      projectEditorTitle() {
         let title = '';
         if (this.projectCategory === 'editor') title = 'Project Editor';
         if (this.projectCategory === 'add') title = 'Add new project';
         else if (this.projectCategory === 'edit') title = 'Edit a project';
         else if (this.projectCategory === 'reorder')
            title = 'Reorder projects';
         else if (this.projectCategory === 'delete') title = 'Delete a project';
         return title;
      },
      projectSubCategory() {
         if (this.$route.params.projectSubCategory) {
            return this.$route.params.projectSubCategory;
         } else {
            return null;
         }
      },
      subCategoriesItems() {
         let items = [];
         if (this.subCategories)
            this.subCategories.map((sc) =>
               Array.from(sc.projects).forEach((project) => items.push(project))
            );
         return items.filter((item) =>
            this.activeSubCategory.projects.find((project) => project === item)
         );
      },
      getProjectDescription() {
         const projectName = this.$route.params.projectName;
         const projectSubCategory = this.$route.params.projectSubCategory;
         const project = this.subCategories
            ?.find((sc) => sc.sub_category_name === projectSubCategory)
            ?.projects.find((p) => p.name === projectName);
         if (project) return project.description;
         else return '';
      },
      getProjectHasCodeLink() {
         const projectName = this.$route.params.projectName;
         const projectSubCategory = this.$route.params.projectSubCategory;
         const project = this.subCategories
            ?.find((sc) => sc.sub_category_name === projectSubCategory)
            ?.projects.find((p) => p.name === projectName);
         return !!project?.code;
      },
      getProjectHasDocumentationLink() {
         const projectName = this.$route.params.projectName;
         const projectSubCategory = this.$route.params.projectSubCategory;
         const project = this.subCategories
            ?.find((sc) => sc.sub_category_name === projectSubCategory)
            ?.projects.find((p) => p.name === projectName);
         return !!project?.documentation;
      },
   },
   methods: {
      ...mapActions(['fetchCategories', 'fetchSubCategories']),
      async initData() {
         await this.fetchCategories();
         await this.fetchSubCategories();
         // Wait for store to be populated by app call
         while (!this.getCategories && this.getCategories.length === 0) {
            await new Promise((resolve) => setTimeout(resolve, 10));
         }

         this.category = this.getCategories.data.find(
            (c) => c.name === this.$route.params.projectCategory
         );

         if (this.category && this.category.subCategories.length > 0) {
            this.subCategories = await this.getSubCategories.data;
            const queryName = this.$route.query['sub_category_name'];
            const match = this.subCategories.find(
               (s) => s.sub_category_name === queryName
            );
            this.activeSubCategory = match ?? this.subCategories[0];
            this.projectHasSubCategory = true;
         }
      },
      headingBtnClick() {
         this.$router.push('/');
         setTimeout(() => {
            document
               .querySelector('.page-work-section')
               .scrollIntoView({ behavior: 'smooth' });
         }, 50);
      },
      webProjectsClick() {
         this.$router.push(`/projects/${encodeURI('Web Projects')}`);
      },
      subCategoryClick(subCategory) {
         this.activeSubCategory = subCategory;
         window.history.replaceState(
            null,
            '',
            `?sub_category_name=${this.activeSubCategory.sub_category_name}`
         );
      },
      subCategoryCardClick(subCategoryCardName) {
         this.$router.push(
            `/projects/${this.$route.params.projectCategory}/${this.activeSubCategory.sub_category_name}/${subCategoryCardName}`
         );
      },
      changeEditorType(item) {
         this.$router.push({
            name: 'Projects',
            params: {
               projectCategory: 'editor',
               projectSubCategory: item.name.toLowerCase(),
            },
         });
      },
      buttonClick(button) {
         const projectName = this.$route.params.projectName;
         const projectSubCategory = this.$route.params.projectSubCategory;
         const project = this.subCategories
            .find((sc) => sc.sub_category_name === projectSubCategory)
            .projects.find((p) => p.name === projectName);
         if (button === 'site') window.open(project.live_site);
         else if (button === 'code') window.open(project.code);
         else if (button === 'docs') window.open(project.documentation);
      },
      buildProjectButtons() {
         const actions = [
            {
               hasIcon: true,
               btnText: 'View the live site',
               action: 'site',
            },
         ];

         if (this.getProjectHasDocumentationLink) {
            actions.push({
               hasIcon: true,
               btnText: 'View the documentation',
               action: 'docs',
            });
         }

         if (this.getProjectHasCodeLink) {
            actions.push({
               hasIcon: true,
               btnText: 'View the code',
               action: 'code',
            });
         }

         return actions;
      },
   },
   async mounted() {
      await this.initData();
   },
};
