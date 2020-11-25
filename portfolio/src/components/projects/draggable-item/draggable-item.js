export default {
  name: 'draggable-item',
  props: ['hasActions', 'value', 'canEdit'],
  computed: {

  },
  data() {
    return {
      isEdited: false
    }
  },
  methods: {
    getEdited(e) {
      if (e.target.value) this.isEdited = true
      else this.isEdited = false

      this.$emit('value-change', e.target.value)
    },
    editImage() {
      this.$el.querySelector('input').focus()
    }
  },
  mounted() { }
}
