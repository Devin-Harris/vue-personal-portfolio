import { mapActions, mapGetters } from 'vuex'
import IconHeading from '@/components/headings/icon-heading'
import SimpleDropdown from '@/components/dropdowns/simple-dropdown'
import EditorButton from '@/components/buttons/editor-button'
import IconButton from '@/components/buttons/icon-button'
import RequestMessage from '@/components/projects/request-message'
import ProjectAdd from '@/components/projects/project-add'
import ProjectEdit from '@/components/projects/project-edit'
import ProjectReorder from '@/components/projects/project-reorder'
import BackgroundAnimation from '@/components/headings/background-animation'

export default {
  name: 'project-editor',
  props: ['hasIcon'],
  components: {
    IconHeading,
    SimpleDropdown,
    EditorButton,
    IconButton,
    RequestMessage,
    ProjectAdd,
    ProjectEdit,
    ProjectReorder,
    BackgroundAnimation
  },
  data() {
    return {
      selectedCategory: {},
      selectedSubCategory: '',
      selectedName: '',
      selectedDesc: '',
      selectedCode: '',
      selectedSite: '',
      availableCategories: [],
      projectImages: [],
      displayImage: null,
      requestMessage: null
    }
  },
  computed: {
    ...mapGetters(['getCategories', 'getSubCategories']),
    availableSubCategories() {
      const selectedCategorySubCategories = this.availableCategories.find(
        (category) => category._id === this.selectedCategory._id
      )
      if (
        this.$store.state.project_categories &&
        this.selectedCategory &&
        selectedCategorySubCategories &&
        selectedCategorySubCategories.subCategories.length > 0
      )
        return selectedCategorySubCategories.subCategories
      else return []
    },
    availableNames() {
      if (!this.selectedSubCategory) return []
      let subCategory = JSON.parse(JSON.stringify(this.getSubCategories.data)).find((subCategory) => subCategory.sub_category_name === this.selectedSubCategory)
      return (subCategory && subCategory.projects) ? subCategory.projects.map((project) => project.name) : []
    },
    urlPrefix() {
      let category = ''
      switch (this.selectedCategory.name) {
        case 'Web Projects':
          category = 'Web'
          break
        case 'Ads & Posters':
          category = 'Ads'
          break
        case 'Logo Concepts':
          category = 'Logos'
          break
        case 'Illustrations':
          category = 'Illustrations'
          break
        case 'Photos':
          category = 'Photos'
          break
        default:
          break
      }
      const url = `https://devinharris.dev/Portfolio_Images/${category}/`
      return url
    },
    editorType() {
      return this.$route.params.projectSubCategory
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
    this.selectedCategory = this.availableCategories[0]
    this.selectedSubCategory = this.selectedCategory.subCategories[0]
    let init_project = JSON.parse(JSON.stringify(this.getSubCategories.data)).find((subCategory) => subCategory.sub_category_name === this.selectedSubCategory)
    if (init_project) {
      init_project = init_project.projects[0]
      this.selectedName = init_project.name
      this.selectedDesc = init_project.description
      this.selectedCode = init_project.code
      this.selectedSite = init_project.live_site
    }
  },
  methods: {
    ...mapActions(['fetchCategories', 'fetchSubCategories', 'addProject', 'editProject']),
    categoryChanged(clickedCategory) {
      this.selectedCategory = JSON.parse(JSON.stringify(this.availableCategories)).find((category) => category.name === clickedCategory)

      if (this.selectedCategory.subCategories.length > 0) {
        this.selectedSubCategory = this.selectedCategory.subCategories[0]
        let subCategory = JSON.parse(JSON.stringify(this.getSubCategories.data)).find((subCategory) => subCategory.sub_category_name === this.selectedSubCategory)
        if (subCategory) {
          this.selectedName = subCategory.projects[0].name
          this.selectedDesc = subCategory.projects.find((project) => project.name === this.selectedName).description
          this.selectedCode = subCategory.projects.find((project) => project.name === this.selectedName).code
          this.selectedSite = subCategory.projects.find((project) => project.name === this.selectedName).live_site
        }
      } else {
        this.selectedSubCategory = ''
      }
    },
    subCategoryChanged(clickedSubCategory) {
      this.selectedSubCategory = clickedSubCategory
      let subCategory = JSON.parse(JSON.stringify(this.getSubCategories.data)).find((subCategory) => subCategory.sub_category_name === clickedSubCategory)

      if (subCategory) {
        this.selectedName = subCategory.projects[0].name
        this.selectedDesc = subCategory.projects.find((project) => project.name === this.selectedName).description
        this.selectedCode = subCategory.projects.find((project) => project.name === this.selectedName).code
        this.selectedSite = subCategory.projects.find((project) => project.name === this.selectedName).live_site
      }
    },
    nameChanged(clickedName) {
      this.selectedName = clickedName
      let subCategory = JSON.parse(JSON.stringify(this.getSubCategories.data)).find((subCategory) => subCategory.sub_category_name === this.selectedSubCategory)
      if (subCategory) {
        this.selectedDesc = subCategory.projects.find((project) => project.name === this.selectedName).description
        this.selectedCode = subCategory.projects.find((project) => project.name === this.selectedName).code
        this.selectedSite = subCategory.projects.find((project) => project.name === this.selectedName).live_site
      }
    },
    setImages(e) {
      this.projectImages = e
    },
    setDisplayImage(e) {
      this.displayImage = e
    },
    addImage(e) {
      this.projectImages.push(e.target.value)
      e.target.value = ''
    },
    openImage(imageUrl) {
      window.open(this.urlPrefix + imageUrl)
    },
    removeImage(imageUrl) {
      this.projectImages = this.projectImages.filter((image) => image !== imageUrl)
    },
    async editorActionClick(project, editedData = null) {
      let data
      if (this.$route.params.projectSubCategory === 'edit') {
        data = {
          projectCategory: this.selectedCategory,
          projectSubCategory: editedData.projectSubCategory,
          originSubCategory: editedData.originSubCategory,
          projectId: editedData.projectId,
          projectName: editedData.projectName,
          projectDesc: editedData.projectDesc,
          projectSite: editedData.projectSite,
          projectCode: editedData.projectCode,
          projectKey: editedData.projectKey,
          projectImages: editedData.projectImages.map((image) => this.urlPrefix + image),
          displayImage: this.displayImage
        }
        this.requestMessage = await this.editProject(data)
      } else if (this.$route.params.projectSubCategory === 'reorder') {
        data = {
          projectKey: editedData.projectKey,
          categories: editedData.categories,
          subCategories: editedData.subCategories,
          selectedSubCategory: editedData.selectedSubCategory
        }
        this.requestMessage = await this.reorderProject(data)
      } else if (this.$route.params.projectSubCategory === 'add') {
        data = {
          projectCategory: this.selectedCategory,
          projectSubCategory: this.selectedSubCategory,
          projectName: project.projectName,
          projectDesc: project.projectDesc,
          projectSite: project.projectSite,
          projectCode: project.projectCode,
          projectKey: project.projectKey,
          projectImages: this.projectImages,
          displayImage: this.displayImage
        }
        this.requestMessage = await this.addProject(data)
      }
    },
    requestBtnHandler(action) {
      if (action === 'add') {
        this.$router.push('/projects/editor/add')
        this.requestMessage = null
      }
      else if (action === 'edit') {
        this.$router.push('/projects/editor/edit')
        this.requestMessage = null
      }
      else if (action === 'reorder') {
        this.$router.push('/projects/editor/reorder')
        this.requestMessage = null
      }
      else if (action === 'view') {
        this.$router.push(`/projects/${this.selectedCategory.name}`)
        setTimeout(() => {
          this.$emit('get-data')
        }, 300)
      } else if (action === 'retry') {
        this.$router.push(`/projects/editor/${this.$route.params.projectCategory}`)
        this.requestMessage = null
      }
    }
  }
}
