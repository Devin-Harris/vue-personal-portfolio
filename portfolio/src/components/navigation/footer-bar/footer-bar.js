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
        window.scroll({ left: 0, top: 0, behavior: 'smooth' })
        return
      }

      if (name === 'work') {
        if (this.$route.name === 'Home')
          document.querySelector('.page-work-section').scrollIntoView({ behavior: "smooth" })
        else {
          this.$router.push('/')
          setTimeout(() => {
            document.querySelector('.page-work-section').scrollIntoView({ behavior: "smooth" })
          }, 50)
        }
        return
      }

      if (name === 'footer-button') {
        if (this.$route.name === 'Contact') {
          this.$router.push('/')
          setTimeout(() => {
            document.querySelector('.page-work-section').scrollIntoView({ behavior: "smooth" })
          }, 50)
        } else {
          this.$router.push('/contact')
        }
      }

      this.$router.push({ name })
    }
  }
}

