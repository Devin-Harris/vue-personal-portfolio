import IconButton from '@/components/buttons/icon-button'

export default {
  name: 'editor-heading',
  props: [
    'title',
    'btnText'
  ],
  components: {
    IconButton
  },
  data() {
    return {}
  },
  methods: {
    headingRedirect() {
      this.$router.push('/')
    }
  }
}