import IconButton from '@/components/buttons/icon-button'
import Illustration from '@/components/headings/page-heading/illustration'
import anime from 'animejs'
import colors from '@/styles/_colors.scss'

export default {
  name: 'page-heading',
  props: {
    title: { default: '' },
    subTitle: { default: '' },
    btnText: { default: '' },
    isSocialMediaShown: { default: false },
    isIllustrationShown: { default: false },
    textAnimation: { default: false }
  },
  components: {
    IconButton,
    Illustration
  },
  data() {
    return {
      linksTimeline: null,
      textTimeline: null
    }
  },
  methods: {
    openLink(link) {
      window.open(link)
    },
    animationCompleted() {
      if (this.isIllustrationShown) {
        this.linksTimeline.play()
        if (this.textAnimation) this.textTimeline.play()
      }
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
    // Timeline for media links
    this.linksTimeline = anime.timeline({
      easing: 'easeInOutSine',
      duration: 500,
      direction: 'alternate',
      loop: false
    });
    if (this.isIllustrationShown) {
      const picElm = document.querySelector('.page-heading-container__image')
      this.linksTimeline
        .add({
          targets: '.page-heading-container__links',
          right: [0, picElm ? picElm.getBoundingClientRect().width - 16 + 'px' : 0],
          margin: 0,
          opacity: [0, 1],
          duration: 0
        })
        .add({
          targets: '.page-heading-container-animate',
          duration: 150,
          border: [`1px solid ${colors.themeGreywhite}`, 'none'],
          backgroundColor: ['transparent', colors.themeGreymiddle]
        }, '-=500')
        .add({
          targets: '.page-heading-container__links .media_container',
          delay: function (el, i) { return (i+1) * 350 },
          duration: 250,
          right: ['2000px', '0px'],
          opacity: [0, 1]
        }, '-=250')
      
      this.linksTimeline.pause(0)
    }

    // Timeline for page heading text
    this.textTimeline = anime.timeline({
      easing: 'spring(1, 80, 10, 0)',
      duration: 1000,
      loop: false
    })
    this.textTimeline
      .add({
        targets: '.page-heading-container__text > *',
        translateY: ['-450px', 0],
        translateX: 0,
        scale: [2, 1],
        opacity: [0, 1],
        delay: function (el, i) { return (i+1) * 50 }
      })
    
    if (this.textAnimation) this.textTimeline.pause(0)
    if (!this.textAnimation) this.textTimeline.seek(100000) 

  }
}