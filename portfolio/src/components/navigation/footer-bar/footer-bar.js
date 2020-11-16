import FooterButton from '@/components/buttons/footer-button'

export default {
  name: 'footer-bar',
  components: {
    FooterButton
  },
  props: ['footerButtonTheme'],
  methods: {
    openLink(link) {
      window.open(link)
    },
    redirect(name) {
      if (name === 'top') {
        window.scroll(0, 0)
        return
      }

      if (name === 'work') {
        if (this.$route.name === 'Home')
          document.querySelector('.page-work-section').scrollIntoView()
        else {
          this.$router.push('/')
          setTimeout(() => {
            document.querySelector('.page-work-section').scrollIntoView()
          }, 50)
        }
        return
      }

      this.$router.push({ name })
    }
  }
}

