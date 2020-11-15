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