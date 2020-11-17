export default {
  name: 'category-card',
  props: [
    'item'
  ],
  components: {
  },
  data() {
    return {}
  },
  methods: {
    redirect() {
      // Home page card click
      if (this.$route.name === 'Home') {
        this.$router.push(`/projects/${this.item.name}`)
      } else {
        console.log(this.$route.params.projectSubCategory)
        this.$parent.$emit('sub-category-card-click', this.item.name)
      }

      // if (this.$route.params.projectSubCategory)
      //   this.$router.push(`/projects/${this.category.name}/${this.category.sub_category_name}`)
      // else
      //   this.$router.push(`/projects/${this.category.name}`)
    }
  }
}