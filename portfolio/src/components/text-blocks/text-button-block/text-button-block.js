import IconHeading from '@/components/headings/icon-heading'
import IconButton from '@/components/buttons/icon-button'

export default {
  name: 'text-button-block',
  props: [
    'title',
    'iconClass',
    'theme',
    'paragraphText',
    'buttons'
  ],
  components: {
    IconHeading,
    IconButton
  },
  data() {
    return {}
  },
  methods: {
    handleClick(action) {
      if (action === '/contact') {
        this.$router.push('/contact')
      } else if (action === 'site' || action === 'code') {
        this.$emit('button-click', action)
      }
    }
  }
}