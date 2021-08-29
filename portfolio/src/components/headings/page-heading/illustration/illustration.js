import anime from 'animejs'
import colors from '@/styles/_colors.scss'

export default {
  name: 'illustration',
  data() {
    return {
      timeline: null
    }
  },
  mounted() {
    this.timeline = anime.timeline({
      easing: 'easeInSine',
      duration: 500,
      direction: 'alternate',
      loop: false,
      complete: this.completedTimeline
    });

    this.timeline.pause(0)
    const fill = document.querySelector('.illustration-container .fill')
    const outline = document.querySelector('.illustration-container .outlines')
    if (fill) fill.style.opacity = 0
    if (outline) outline.style.opacity = 1

    this.timeline.add({
      targets: '.outlines .lines .animated-lines path',
      strokeDashoffset: [anime.setDashoffset, 0],
      stroke: [colors.themeGreywhite, colors.themeGreymiddle],
      easing: 'easeInOutSine',
      delay: function (el, i) { return i * 5 }
    })
      .add({
        targets: '.fill',
        opacity: 1,
        duration: 450,
        delay: 150
      })
      .add({
        targets: '.outlines',
        opacity: 0,
        duration: 250,
      }, '-=250')
  },
  methods: {
    completedTimeline() {
      this.$emit('completed-animation')
    }
  }
}