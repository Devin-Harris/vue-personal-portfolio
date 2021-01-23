import IconButton from '@/components/buttons/icon-button'

export default {
  name: 'page-heading',
  props: [
    'title',
    'subTitle',
    'btnText',
    'isSocialMediaShown',
    'isIllustrationShown'
  ],
  components: {
    IconButton
  },
  data() {
    return {

    }
  },
  methods: {
    openLink(link) {
      window.open(link)
    },
    cardInHover(e) {
      const card = this.$refs.card
      card.style.transition = 'none'
    },
    cardMoveHover(e) {
      const intensity = 25
      const card = this.$refs.card
      let xAxis = ((window.innerWidth / 2) - e.pageX) / intensity
      let yAxis = ((window.innerHeight / 2) - e.pageY) / intensity
      card.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`
    },
    cardOutHover() {
      const card = this.$refs.card
      card.style.transition = 'all 0.5s ease'
      card.style.transform = `rotateY(0deg) rotateX(0deg)`
    }
  },
  mounted() {
    if (this.isIllustrationShown) {
      setTimeout(() => {
        const illustrationElm = document.querySelector('.page-heading-container__image')
        const illustrationBounds = illustrationElm.getBoundingClientRect()
        const linksElm = document.querySelector('.page-heading-container__links')
        linksElm.style.position = 'absolute'
        linksElm.style.top = '50%'
        linksElm.style.transform = 'translateY(-50%)'
        linksElm.style.right = illustrationBounds.width - 16 + 'px'
        linksElm.style.margin = 0
        linksElm.classList.remove('hidden')
      }, 500)
    }
  }
}