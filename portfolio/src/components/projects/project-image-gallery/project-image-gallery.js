
export default {
  name: 'project-image-gallery',
  props: [
    'items'
  ],
  components: {
  },
  computed: {
    category() {
      return this.$store.state.project_categories.find(category => category.name === this.$route.params.projectCategory)
    }
  },
  data() {
    return {}
  },
  methods: {},
  async mounted() {

    // Wait for store to be populated by app call
    while (this.$store.state.project_categories.length === 0) {
      await new Promise(resolve => setTimeout(resolve, 10))
    }
    console.log(this.category)
  },
}