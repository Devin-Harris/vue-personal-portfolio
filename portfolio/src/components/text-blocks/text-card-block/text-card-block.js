import IconHeading from '@/components/headings/icon-heading'
import IconButton from '@/components/buttons/icon-button'

export default {
  name: 'text-card-block',
  props: [
    'title',
    'iconClass',
    'theme',
    'paragraphText',
    'paragraphEmphasisText',
    'buttons'
  ],
  components: {
    IconHeading,
    IconButton
  },
  data() {
    return {}
  },
  methods: {}
}