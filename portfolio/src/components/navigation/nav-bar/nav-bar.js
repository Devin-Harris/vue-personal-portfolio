import SimplePopup from '@/components/popups/simple-popup'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'nav-bar',
  components: {
    SimplePopup
  },
  created() {
    window.addEventListener('click', this.clickOutside)
  },
  onUnmounted() {
    window.removeEventListener('click', this.clickOutside)
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
    },
    clickOutside(e) {
      if (!this.isPopupOpen) return
      const popup = this.$el.querySelector('.simple-popup-container__dropdown-popup')
      if (!e.path.includes(popup) && !e.path.includes(this.$el)) this.closePopup()
    },
    closePopup() {
      this.isPopupOpen = false
    }
  }
}