import { mapActions, mapGetters } from 'vuex'
import PageHeading from '@/components/headings/page-heading'
import ProjectImageGallery from '@/components/projects/project-image-gallery'
import ProjectEditor from '@/components/projects/project-editor'
import EditorHeading from '@/components/headings/editor-heading'
import IconHeading from '@/components/headings/icon-heading'
import SimpleDropdown from '@/components/dropdowns/simple-dropdown'
import TextCardBlock from '@/components/text-blocks/text-card-block'
import TextButtonBlock from '@/components/text-blocks/text-button-block'

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
    ProjectEditor
  },
  data() {
    return {
      projectHasSubCategory: false,
      category: {},
      subCategories: [],
      activeSubCategory: {}
    }
  },
  computed: {
    ...mapGetters([
      'getCategories'
    ]),
    projectCategory() {
      return this.$route.params.projectCategory
    },
    projectEditor() {
      if (this.projectCategory === 'add' || this.projectCategory === 'edit' || this.projectCategory === 'delete') {
        return true
      } else {
        return false
      }
    },
    projectEditorTitle() {
      let title = ''
      if (this.projectCategory === 'add')
        title = 'Add new project'
      else if (this.projectCategory === 'edit')
        title = 'Edit a project'
      else if (this.projectCategory === 'delete')
        title = 'Delete a project'
      return title
    },
    projectSubCategory() {
      if (this.$route.params.projectSubCategory) {
        return this.$route.params.projectSubCategory
      } else {
        return null
      }
    },
    subCategoriesItems() {
      let items = []
      this.subCategories.map(sc => Array.from(sc.projects).forEach(project => items.push(project)))
      return items.filter(item => this.activeSubCategory.projects.find(project => project === item))
    },
    getProjectDescription() {
      const project = this.subCategoriesItems.find(project => project.name === this.$route.params.projectName)
      return project.description
    }
  },
  methods: {
    ...mapActions([
      'fetchCategories'
    ]),
    async initData() {
      await this.fetchCategories()
      // Wait for store to be populated by app call
      while (this.getCategories.length === 0) {
        await new Promise(resolve => setTimeout(resolve, 10))
      }

      this.category = this.getCategories.data.find(c => c.name === this.$route.params.projectCategory)

      if (this.category && this.category.subCategories.length > 0) {
        const url = "http://localhost:3000/project-sub-categories"
        const response = await fetch(url, {
          method: 'GET'
        })
        this.subCategories = await response.json()
        this.activeSubCategory = this.subCategories[0]
        this.projectHasSubCategory = true
      }
    },
    headingBtnClick() {
      this.$router.push('/')
      setTimeout(() => {
        document.querySelector('.page-work-section').scrollIntoView({ behavior: "smooth" })
      }, 50)
    },
    subCategoryClick(subCategory) {
      this.activeSubCategory = subCategory
    },
    subCategoryCardClick(subCategoryCardName) {
      this.$router.push(`/projects/${this.$route.params.projectCategory}/${this.activeSubCategory.sub_category_name}/${subCategoryCardName}`)
    }
  },
  async mounted() {
    await this.initData()
  }
}