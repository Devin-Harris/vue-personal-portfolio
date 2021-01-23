import SimplePopup from '@/components/popups/simple-popup'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'nav-bar',
  components: {
    SimplePopup
  },
  created() {
    this.logo = require('@/assets/icons/dchLogoWhite.png')
    window.addEventListener('click', this.clickOutside)
  },
  onUnmounted() {
    window.removeEventListener('click', this.clickOutside)
  },
  data() {
    return {
      isPopupOpen: false,
      logo: null
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
      if (this.isPopupOpen) this.positionArrow()
    },
    positionArrow() {
      setTimeout(() => {
        const workIcon = this.$refs.workIcon
        const arrow = this.$refs.arrow
        const navContainer = this.$refs.navContainer
        let left = workIcon.getBoundingClientRect().left - navContainer.getBoundingClientRect().left + 6
        arrow.style.left = left  + 'px'
      }, 1)
    },
    navigateToCategory(category) {
      this.isPopupOpen = false
      this.$router.push(`/projects/${category}`)
    },
    clickOutside(e) {
      if (!this.isPopupOpen) return
      const popup = this.$el.querySelector('.popup-links')
      if (!e.path.includes(popup) && !e.path.includes(this.$el)) this.closePopup()
    },
    closePopup() {
      this.isPopupOpen = false
    },
    redirect(path) {
      this.$router.push(path)
      this.isPopupOpen = false
    }
  },
}