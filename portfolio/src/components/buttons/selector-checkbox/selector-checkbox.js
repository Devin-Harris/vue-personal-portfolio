export default {
  name: 'selector-checkbox',
  props: [
    'items'
  ],
  components: {
  },
  data() {
    return {}
  },
  methods: {
    redirectEditor(item) {
      this.$router.push({ name: 'Projects', params: { projectCategory: 'editor', projectSubCategory: item.toLowerCase() } })
    }
  }
}