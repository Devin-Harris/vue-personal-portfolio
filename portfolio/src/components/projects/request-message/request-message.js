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
        return [{ text: 'Add another project', action: 'add' }, { text: 'View this project', action: 'view' }]
      else if (this.$route.params.projectCategory === 'edit')
        return [{ text: 'Edit another project', action: 'edit' }]
    }
  },
  data() {
    return {}
  },
  methods: {}
}