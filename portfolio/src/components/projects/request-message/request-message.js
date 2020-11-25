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
      if (this.$route.params.projectSubCategory === 'add')
        return [{ text: 'Add another project', action: 'add' }, { text: 'View this project', action: 'view' }]
      else if (this.$route.params.projectSubCategory === 'edit')
        return [{ text: 'Edit another project', action: 'edit' }]
      else if (this.$route.params.projectSubCategory === 'reorder')
        return [{ text: 'Reorder another project', action: 'reorder' }, { text: 'View this project', action: 'view' }]
    }
  },
  data() {
    return {}
  },
  methods: {}
}