import { mapActions, mapGetters } from 'vuex'
import IconHeading from "@/components/headings/icon-heading"
import SimpleDropdown from "@/components/dropdowns/simple-dropdown"
import EditorButton from "@/components/buttons/editor-button"
import IconButton from "@/components/buttons/icon-button"
import RequestMessage from "@/components/projects/request-message"

export default {
  name: "project-add",
  props: [
    'availableSubCategories',
    'urlPrefix',
    'selectedCategory',
    'selectedSubCategory',
    'availableCategories',
    'projectImages'
  ],
  components: {
    IconHeading,
    SimpleDropdown,
    EditorButton,
    IconButton,
    RequestMessage
  },
  computed: {
    ...mapGetters(['getCategories']),
    canClick() {
      if (
        this.selectedCategory &&
        this.project.projectKey &&
        this.projectImages.length > 0
      ) {
        if (this.availableSubCategories.length > 0) {
          if (
            this.selectedSubCategory &&
            this.project.projectName &&
            this.project.projectDesc
          ) {
            return true
          } else {
            return false
          }
        } else {
          return true
        }
      }
    },
  },
  data() {
    return {
      project: {
        projectName: "",
        projectDesc: "",
        projectKey: ""
      }
    }
  },
  methods: {
    ...mapActions(['fetchCategories']),
    categoryChanged(clickedCategory) {
      this.selectedCategory = JSON.parse(
        JSON.stringify(this.availableCategories)
      ).find((category) => category.name === clickedCategory)

      if (this.selectedCategory.subCategories.length > 0) {
        this.selectedSubCategory = this.selectedCategory.subCategories[0]
      } else {
        this.selectedSubCategory = ""
      }
    },
    subCategoryChanged(clickedSubCategory) {
      this.selectedSubCategory = clickedSubCategory
    },
    addImage(e) {
      this.projectImages.push(e.target.value)
      e.target.value = ""
    },
    openImage(imageUrl) {
      window.open(this.urlPrefix + imageUrl)
    },
    removeImage(imageUrl) {
      this.projectImages = this.projectImages.filter(
        (image) => image !== imageUrl
      )
    },
    async editorActionClick() {
      let route
      if (this.$route.params.projectCategory === "add") route = "/add-project"
      else if (this.$route.params.projectCategory === "edit")
        route = "/edit-project"
      else if (this.$route.params.projectCategory === "delete")
        route = "/delete-project"

      let url = ""
      if (location.hostname === "localhost")
        url = `http://localhost:3000${route}`
      else url = `https://devinharris-portfolio.herokuapp.com${route}`

      const data = {
        projectCategory: this.selectedCategory,
        projectSubCategory: this.selectedSubCategory,
        projectName: this.projectName,
        projectDesc: this.projectDesc,
        projectKey: this.projectKey,
        projectImages: this.projectImages.map(
          (image) => this.urlPrefix + image
        ),
      }

      const response = await fetch(url, {
        method: "POST",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
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
      }
      else if (action === 'retry') this.$router.push(`/projects/${this.$route.params.projectCategory}`)
    }
  },
  async mounted() {
    await this.fetchCategories()
    // Wait for store to be populated by app call
    while (this.getCategories.length === 0) {
      await new Promise(resolve => setTimeout(resolve, 10))
    }
  },
}
