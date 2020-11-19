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
        this.$parent.$emit('sub-category-card-click', this.item.name)
      }
    }
  }
}