import PageHeading from '@/components/headings/page-heading'

export default {
  name: 'project',
  components: {
    PageHeading
  },
  created() {
    this.projectCategory = this.$route.params.projectCategory
    if (this.projectCategory === 'add' || this.projectCategory === 'edit' || this.projectCategory === 'delete') {
      this.projectEditor = true
    }
    if (this.$route.params.projectSubCategory) {
      this.projectSubCategory = this.$route.params.projectSubCategory
    }
    console.log(this.projectEditor)
  },
  data() {
    return {
      projectCategory: '',
      projectEditor: false,
      projectHasSubCategory: false,
      projectSubCategory: null
    }
  }
}