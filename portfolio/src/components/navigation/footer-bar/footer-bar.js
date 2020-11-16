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

      this.$router.push({ name })
    }
  }
}

