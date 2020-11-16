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
  mounted() {
    console.log(this.$route)
  },
}