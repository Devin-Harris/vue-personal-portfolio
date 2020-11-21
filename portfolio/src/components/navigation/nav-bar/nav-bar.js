import SimplePopup from '@/components/popups/simple-popup'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'nav-bar',
  components: {
    SimplePopup
  },
  data() {
    return {
      isPopupOpen: false
    }
  },
  computed: {
    ...mapGetters(['getCategories', 'getSubCategories']),
    route() {
      return this.$route
    }
  },
  methods: {
    togglePopup() {
      this.isPopupOpen = !this.isPopupOpen
    },
    navigateToCategory(category) {
      this.isPopupOpen = false
      this.$router.push(`/projects/${category}`)
    }
  }
}