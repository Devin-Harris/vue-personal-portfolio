export default {
  name: 'footer-button',
  props: [
    'btnText',
    'subTitle',
    'title',
    'theme'
  ],
  components: {
  },
  data() {
    return {}
  },
  methods: {
    cardInHover() {
      const footerButton = this.$refs.footerButton
      footerButton.style.transition = 'none'
    },
    cardMoveHover(e) {
      const intensity = 25
      const footerButton = this.$refs.footerButton
      let xAxis = ((window.innerWidth / 2) - e.clientX) / (intensity / 2)
      let yAxis = ((window.innerHeight / 2) - e.clientY) / intensity
      footerButton.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`
    },
    cardOutHover() {
      const footerButton = this.$refs.footerButton
      footerButton.style.transition = 'all 0.5s ease'
      footerButton.style.transform = `rotateY(0deg) rotateX(0deg)`
    }
  }
}