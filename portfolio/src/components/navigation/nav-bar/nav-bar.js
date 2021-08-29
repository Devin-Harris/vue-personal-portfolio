import SimplePopup from '@/components/popups/simple-popup'
import { mapActions, mapGetters } from 'vuex'

import anime from 'animejs'

export default {
  name: 'nav-bar',
  components: {
    SimplePopup
  },
  data() {
    return {
      isPopupOpen: false,
      logo: null,
      isDesktopView: false,
      isMobileLinksOpen: false,
      allMobileLinks: {
        'main': [
          { text: 'Home', redirect: '/', iconClass: 'fas fa-home' },
          { text: 'My projects', redirect: null, iconClass: 'fas fa-stream' },
          { text: 'Contact me', redirect: '/contact', iconClass: 'fas fa-comment' }
        ],
        'projects': []
      },
      currentLinksKey: 'main'
    }
  },
  computed: {
    ...mapGetters(['getCategories', 'getSubCategories']),
    route() {
      return this.$route
    }
  },
  mounted() {
    this.logo = require('@/assets/icons/dchLogoWhite.png')
    this.checkDesktopView()
    window.addEventListener('resize', this.checkDesktopView)
    window.addEventListener('scroll', this.handleNavbarBackground)
    window.addEventListener('click', this.clickOutside)
    window.addEventListener('click', this.mobileClickOutside)
  },
  onUnmounted() {
    window.removeEventListener('resize', this.checkDesktopView)
    window.removeEventListener('scroll', this.handleNavbarBackground)
    window.removeEventListener('click', this.clickOutside)
    window.removeEventListener('click', this.mobileClickOutside)
  },
  methods: {
    togglePopup() {
      this.isPopupOpen = !this.isPopupOpen
      if (this.isPopupOpen) this.positionArrow()
    },
    toggleMobileLinks() {
      this.isMobileLinksOpen = !this.isMobileLinksOpen
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
      this.isMobileLinksOpen = false
    },
    loadMobileLinks() {
      this.allMobileLinks.projects = this.getCategories.data.map(category => {
        return { text: category.name, redirect: `/projects/${category.name}`, iconClass: 'far fa-folder-open' }
      })
    },
    toggleCurrentLinksKey(key) {
      if (key === 'projects' && (!this.allMobileLinks.projects || this.allMobileLinks.projects.length === 0)) this.loadMobileLinks()
      this.currentLinksKey = key
    },
    checkDesktopView() {
      this.isDesktopView = window.innerWidth  > 992
    },
    handleNavbarBackground() {
      if (!this.isDesktopView) return
      if (window.scrollY >= 200) this.$refs.navContainer.classList.add('has-background')
      else this.$refs.navContainer.classList.remove('has-background')
    },
    swipeHandler(e) {
      if (e === 'left' || e === 'right') {
        this.currentLinksKey = this.currentLinksKey === 'main' ? 'projects' : 'main'
        if (this.currentLinksKey === 'projects' && (!this.allMobileLinks.projects || this.allMobileLinks.projects.length === 0)) {
          this.loadMobileLinks()
        }
      }
    },
    mobileClickOutside(e) {
      if (!this.isMobileLinksOpen || this.isDesktopView) return
      const popup = this.$el.querySelector('.nav-bar_mobile_links')
      if (!e.path.includes(popup) && !e.path.includes(this.$el)) this.isMobileLinksOpen = false
    }
  },
  watch: {
    getCategories() {
      if (this.getCategories) {
        this.loadMobileLinks()
      }
    }
  }
}