import { mapActions, mapGetters } from 'vuex'
import IconHeading from '@/components/headings/icon-heading'
import SimpleDropdown from '@/components/dropdowns/simple-dropdown'
import EditorButton from '@/components/buttons/editor-button'
import IconButton from '@/components/buttons/icon-button'
import RequestMessage from '@/components/projects/request-message'
import { VueDraggableNext } from 'vue-draggable-next'
import DraggableItem from '@/components/projects/draggable-item'

export default {
  name: 'project-reorder',
  props: ['availableSubCategories', 'urlPrefix', 'selectedCategory', 'selectedSubCategory', 'availableCategories', 'availableNames', 'projectImages', 'selectedName', 'selectedDesc', 'selectedCode', 'selectedSite'],
  components: {
    IconHeading,
    SimpleDropdown,
    EditorButton,
    IconButton,
    RequestMessage,
    DraggableItem,
    draggable: VueDraggableNext
  },
  computed: {
    ...mapGetters(['getCategories', 'getSubCategories']),
    canClick() {
      if (this.project.projectKey) {
        return true
      } else {
        return false
      }
    },
    editedData() {
      return {
        projectKey: this.project.projectKey,
        categories: this.availableCategories,
        subCategories: this.availableSubCategories,
        selectedSubCategory: {
          sub_category_name: this.selectedSubCategory,
          projects: this.availableProjects
        }
      }
    }
  },
  data() {
    return {
      project: {
        projectKey: ''
      },
      availableCategories: [],
      availableSubCategories: [],
      availableProjects: [],
      selectedSubCategory: null
    }
  },
  methods: {
    ...mapActions(['fetchCategories', 'fetchSubCategories']),
    subCategoryChanged(clickedSubCategory) {
      this.selectedSubCategory = clickedSubCategory
      this.availableProjects = this.getSubCategories.data.find(sc => sc.sub_category_name === this.selectedSubCategory).projects
    },
    async editorActionClick() {
      this.$emit('editor-action-click', this.project, this.editedData)
    },
    moveToSubCategory(subCategory) {
      this.changedSubCategory = subCategory
    }
  },
  async mounted() {
    await this.fetchCategories()
    await this.fetchSubCategories()
    // Wait for store to be populated by app call
    while (this.getCategories.length === 0) {
      await new Promise((resolve) => setTimeout(resolve, 10))
    }

    this.availableCategories = JSON.parse(JSON.stringify(this.getCategories.data))
    this.availableSubCategories = JSON.parse(JSON.stringify(this.getSubCategories.data))
    this.selectedSubCategory = this.getSubCategories.data[0].sub_category_name
    this.availableProjects = this.getSubCategories.data.find(sc => sc.sub_category_name === this.selectedSubCategory).projects
  }
}

