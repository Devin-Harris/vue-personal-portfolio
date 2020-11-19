import IconButton from "@/components/buttons/icon-button"

export default {
  name: 'request-message',
  props: [
    'requestMessage'
  ],
  components: {
    IconButton
  },
  computed: {
    successBtns() {
      if (this.$route.params.projectCategory === 'add')
        return [{ text: 'Edit this project', action: 'edit' }, { text: 'View this project', action: 'view' }, { text: 'Add another project', action: 'add' }]
    }
  },
  data() {
    return {}
  },
  methods: {}
}