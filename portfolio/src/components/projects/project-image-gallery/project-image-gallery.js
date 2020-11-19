import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'project-image-gallery',
  props: [
    'items'
  ],
  components: {
  },
  computed: {
    ...mapGetters([
      'getCategories'
    ]),
    category() {
      return this.getCategories.data.find(category => category.name === this.$route.params.projectCategory)
    }
  },
  data() {
    return {}
  },
  methods: {
    ...mapActions([
      'fetchCategories'
    ]),
  },
  async mounted() {
    // Wait for store to be populated by app call
    while (this.$store.state.project_categories.length === 0) {
      await new Promise(resolve => setTimeout(resolve, 10))
    }
  },
}