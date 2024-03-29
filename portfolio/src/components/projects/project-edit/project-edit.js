import { mapActions, mapGetters } from 'vuex'
import IconHeading from '@/components/headings/icon-heading'
import SimpleDropdown from '@/components/dropdowns/simple-dropdown'
import EditorButton from '@/components/buttons/editor-button'
import IconButton from '@/components/buttons/icon-button'
import RequestMessage from '@/components/projects/request-message'
import { VueDraggableNext } from 'vue-draggable-next'
import DraggableItem from '@/components/projects/draggable-item'
import FileUploader from '@/components/projects/file-uploader'

export default {
  name: 'project-edit',
  props: [
    'availableSubCategories',
    'urlPrefix',
    'selectedCategory',
    'selectedSubCategory',
    'availableCategories',
    'availableNames',
    'projectImages',
    'selectedName',
    'selectedDesc',
    'selectedCode',
    'selectedSite',
    'displayImage'
  ],
  components: {
    IconHeading,
    SimpleDropdown,
    EditorButton,
    IconButton,
    RequestMessage,
    DraggableItem,
    draggable: VueDraggableNext,
    FileUploader
  },
  computed: {
    ...mapGetters(['getCategories', 'getSubCategories']),
    canClick() {
      if (this.selectedCategory && this.project.projectKey && this.draggableImages.length > 0) {
        if (this.availableSubCategories.length > 0) {
          if (this.selectedSubCategory) {
            return true
          } else {
            return false
          }
        } else {
          return true
        }
      }
    },
    changedProjectImages() {
      this.project.changedDesc = this.selectedDesc
      this.project.changedSite = this.selectedSite
      this.project.changedCode = this.selectedCode
      if (this.availableSubCategories.length > 0) {
        const subCategoryName = this.selectedCategory.subCategories.find((sc) => sc === this.selectedSubCategory)
        const subCategories = JSON.parse(JSON.stringify(this.getSubCategories))
        const subCategory = subCategories.data.find((sc) => sc.sub_category_name === subCategoryName)
        const project = subCategory.projects.find((p) => p.name === this.selectedName)
        const displayImage = project.display_image.split('/')

        this.draggableImages = [displayImage[displayImage.length - 1]]
        return [displayImage[displayImage.length - 1]]
      } else {
        let imageNames = []
        if (this.selectedCategory.images) {
          this.selectedCategory.images.forEach((image) => {
            const imageInfo = image.split('/')
            imageNames.push(imageInfo[imageInfo.length - 1])
          })
        }
        this.draggableImages = imageNames
        return imageNames
      }
    },
    editedData() {
      const data = {
        projectCategory: this.selectedCategory,
        projectSubCategory: this.changedSubCategory ? this.changedSubCategory : this.selectedSubCategory,
        originSubCategory: this.selectedSubCategory,
        projectId: this.selectedSubCategory ? this.getSubCategories.data.find((sc) => sc.sub_category_name === this.selectedSubCategory).projects.find((project) => project.name === this.selectedName)._id : '',
        projectName: this.project.changedName ? this.project.changedName : this.selectedName,
        projectDesc: this.project.changedDesc ? this.project.changedDesc : this.selectedDesc,
        projectSite: this.project.changedSite ? this.project.changedSite : this.selectedSite,
        projectCode: this.project.changedCode ? this.project.changedCode : this.selectedCode,
        projectKey: this.project.projectKey,
        projectImages: this.draggableImages
      }

      return data
    }
  },
  data() {
    return {
      project: {
        projectDesc: '',
        projectKey: '',
        changedSubCategory: '',
        changedName: '',
        changedDesc: '',
        changedSite: '',
        changedCode: ''
      },
      draggableImages: []
    }
  },
  methods: {
    ...mapActions(['fetchCategories', 'fetchSubCategories']),
    categoryChanged(clickedCategory) {
      this.selectedCategory = JSON.parse(JSON.stringify(this.availableCategories)).find((category) => category.name === clickedCategory)

      if (this.selectedCategory.subCategories.length > 0) {
        this.selectedSubCategory = this.selectedCategory.subCategories[0]
        this.project.changedDesc = this.selectedDesc
        this.project.changedSite = this.selectedSite
        this.project.changedCode = this.selectedCode
      } else {
        this.selectedSubCategory = ''
        this.project.changedDesc = ''
        this.project.changedSite = ''
        this.project.changedCode = ''
      }
    },
    subCategoryChanged(clickedSubCategory) {
      this.selectedSubCategory = clickedSubCategory
      this.project.changedDesc = this.selectedDesc
      this.project.changedSite = this.selectedSite
      this.project.changedCode = this.selectedCode
    },
    removeImage(imageUrl) {
      this.draggableImages = this.draggableImages.filter((image) => image !== imageUrl)
    },
    async editorActionClick() {
      this.$emit('editor-action-click', this.project, this.editedData)
    },
    moveToSubCategory(subCategory) {
      this.changedSubCategory = subCategory
    },
    changeValue(value, i) {
      this.draggableImages[0] = value
    }
  },
  async mounted() {
    await this.fetchCategories()
    await this.fetchSubCategories()
    // Wait for store to be populated by app call
    while (this.getCategories.length === 0) {
      await new Promise((resolve) => setTimeout(resolve, 10))
    }

    this.draggableImages = this.changedProjectImages
    this.project.changedDesc = this.selectedDesc
    this.project.changedSite = this.selectedSite
    this.project.changedCode = this.selectedCode
  }
}
