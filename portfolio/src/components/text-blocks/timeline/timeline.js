import IconButton from '@/components/buttons/icon-button'
export default {
  name: 'timeline',
  props: [ 'points' ],
  components: {
    IconButton
  },
  data() {
    return {
      infoPopup: null
    }
  },
  methods: {
    back() {
      this.infoPopup = null
    },
    loadInfoPopup(point) {
      this.infoPopup = point
    }
  }
}