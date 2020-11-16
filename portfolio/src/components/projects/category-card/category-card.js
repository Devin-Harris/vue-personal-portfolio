export default {
  name: 'category-card',
  props: [
    'category'
  ],
  components: {
  },
  data() {
    return {}
  },
  methods: {
    redirect(category) {
      if (this.$route.params.projectSubCategory)
        this.$router.push(`/projects/${category.category_name}/${category.sub_category_name}`)
      else
        this.$router.push(`/projects/${category.category_name}`)
    }
  }
}