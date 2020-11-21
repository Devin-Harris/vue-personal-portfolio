import { mapActions, mapGetters } from 'vuex'
import IconHeading from '@/components/headings/icon-heading'
import SimpleDropdown from '@/components/dropdowns/simple-dropdown'
import EditorButton from '@/components/buttons/editor-button'
import IconButton from '@/components/buttons/icon-button'
import RequestMessage from '@/components/projects/request-message'
import ProjectAdd from '@/components/projects/project-add'
import ProjectEdit from '@/components/projects/project-edit'

export default {
  name: 'project-editor',
  props: ['editorType', 'hasIcon'],
  components: {
    IconHeading,
    SimpleDropdown,
    EditorButton,
    IconButton,
    RequestMessage,
    ProjectAdd,
    ProjectEdit
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
      let subCategory = JSON.parse(
        JSON.stringify(this.getSubCategories.data)
      ).find(
        (subCategory) =>
          subCategory.sub_category_name === this.selectedSubCategory
      )
      return subCategory.projects.map((project) => project.name)
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
    canClick() {
      if (this.editorType === 'add') {
        if (
          this.selectedCategory &&
          this.projectKey &&
          this.projectImages.length > 0
        ) {
          if (this.availableSubCategories.length > 0) {
            if (
              this.selectedSubCategory &&
              this.projectName &&
              this.projectDesc
            ) {
              return true
            } else {
              return false
            }
          } else {
            return true
          }
        }
      } else {
        return false
      }
    }
  },
  data() {
    return {
      selectedCategory: {},
      selectedSubCategory: '',
      selectedName: '',
      selectedDesc: '',
      availableCategories: [],
      projectImages: [],
      requestMessage: null
    }
  },
  methods: {
    ...mapActions(['fetchCategories', 'fetchSubCategories']),
    categoryChanged(clickedCategory) {
      this.selectedCategory = JSON.parse(
        JSON.stringify(this.availableCategories)
      ).find((category) => category.name === clickedCategory)

      if (this.selectedCategory.subCategories.length > 0) {
        this.selectedSubCategory = this.selectedCategory.subCategories[0]
        let subCategory = JSON.parse(
          JSON.stringify(this.getSubCategories.data)
        ).find(
          (subCategory) =>
            subCategory.sub_category_name === this.selectedSubCategory
        )
        this.selectedName = subCategory.projects[0].name
        this.selectedDesc = subCategory.projects.find(
          (project) => project.name === this.selectedName
        ).description
      } else {
        this.selectedSubCategory = ''
      }
    },
    subCategoryChanged(clickedSubCategory) {
      this.selectedSubCategory = clickedSubCategory
      let subCategory = JSON.parse(
        JSON.stringify(this.getSubCategories.data)
      ).find(
        (subCategory) => subCategory.sub_category_name === clickedSubCategory
      )
      this.selectedName = subCategory.projects[0].name
      this.selectedDesc = subCategory.projects.find(
        (project) => project.name === this.selectedName
      ).description
    },
    nameChanged(clickedName) {
      this.selectedName = clickedName
      let subCategory = JSON.parse(
        JSON.stringify(this.getSubCategories.data)
      ).find(
        (subCategory) =>
          subCategory.sub_category_name === this.selectedSubCategory
      )
      this.selectedDesc = subCategory.projects.find(
        (project) => project.name === this.selectedName
      ).description
    },
    addImage(e) {
      this.projectImages.push(e.target.value)
      e.target.value = ''
    },
    openImage(imageUrl) {
      window.open(this.urlPrefix + imageUrl)
    },
    removeImage(imageUrl) {
      this.projectImages = this.projectImages.filter(
        (image) => image !== imageUrl
      )
    },
    async editorActionClick(project, editedData = null) {
      let route
      let editor

      if (this.$route.params.projectCategory === 'add') {
        route = '/add-project'
        editor = 'add'
      } else if (this.$route.params.projectCategory === 'edit') {
        route = '/edit-project'
        editor = 'edit'
      } else if (this.$route.params.projectCategory === 'delete') {
        route = '/delete-project'
        editor = 'delete'
      }

      let url = ''
      if (location.hostname === 'localhost')
        url = `http://localhost:3000${route}`
      else url = `https://devinharris-portfolio.herokuapp.com${route}`

      let data
      if (editedData) {
        data = {
          projectCategory: this.selectedCategory,
          projectSubCategory: editedData.projectSubCategory,
          originSubCategory: editedData.originSubCategory,
          projectId: editedData.projectId,
          projectName: editedData.projectName,
          projectDesc: editedData.projectDesc,
          projectKey: editedData.projectKey,
          projectImages: editedData.projectImages.map((image) => this.urlPrefix + image)
        }
      } else {
        data = {
          projectCategory: this.selectedCategory,
          projectSubCategory: this.selectedSubCategory,
          projectName: project.projectName,
          projectDesc: project.projectDesc,
          projectKey: project.projectKey,
          projectImages: this.projectImages.map((image) => this.urlPrefix + image)
        }
      }

      const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })

      this.requestMessage = await response.json()
    },
    requestBtnHandler(action) {
      if (action === 'add') this.$router.push('/projects/add')
      else if (action === 'edit') this.$router.push('/projects/edit')
      else if (action === 'view') {
        this.$router.push(`/projects/${this.selectedCategory.name}`)
        setTimeout(() => {
          this.$emit('get-data')
        }, 300)
      } else if (action === 'retry')
        this.$router.push(`/projects/${this.$route.params.projectCategory}`)
    }
  },
  async mounted() {
    await this.fetchCategories()
    await this.fetchSubCategories()
    // Wait for store to be populated by app call
    while (this.getCategories.length === 0) {
      await new Promise((resolve) => setTimeout(resolve, 10))
    }

    this.availableCategories = JSON.parse(
      JSON.stringify(this.getCategories.data)
    )
    this.selectedCategory = this.availableCategories[0]
    this.selectedSubCategory = this.selectedCategory.subCategories[0]
    this.selectedName = JSON.parse(
      JSON.stringify(this.getSubCategories.data)
    ).find(
      (subCategory) =>
        subCategory.sub_category_name === this.selectedSubCategory
    ).projects[0].name
  }
}
