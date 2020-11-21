import IconButton from '@/components/buttons/icon-button'

export default {
  name: 'invalid-route',
  components: {
    IconButton
  },
  data() {
    return {

    }
  },
  computed: {
    route() {
      return this.$route.fullPath
    },
    origin() {
      return window.location.origin
    }
  },
  methods: {
    headingRedirect() {
      this.$router.push('/')
    }
  },
}