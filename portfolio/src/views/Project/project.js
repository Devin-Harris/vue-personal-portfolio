import PageHeading from '@/components/headings/page-heading'
import EditorHeading from '@/components/headings/editor-heading'

export default {
  name: 'project',
  components: {
    PageHeading,
    EditorHeading
  },
  data() {
    return {
      projectHasSubCategory: false
    }
  },
  computed: {
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
    }
  },
  methods: {
    headingBtnClick() {
      this.$router.push('/')
      setTimeout(() => {
        document.querySelector('.page-work-section').scrollIntoView()
      }, 50)
    }
  },
  async mounted() {
    const category = this.$store.state.project_categories.find(c => c.category_name === this.$route.params.projectCategory)

    if (category.subCategories.length > 0) {
      const url = "http://localhost:3000/project-sub-categories"
      const response = await fetch(url, {
        method: 'GET'
      })
      const data = await response.json()
      console.log(data)
      this.projectHasSubCategory = true
    }
  },
}