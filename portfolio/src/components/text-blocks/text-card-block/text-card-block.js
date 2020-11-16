import IconHeading from '@/components/headings/icon-heading'
import IconButton from '@/components/buttons/icon-button'
import CategoryCard from '@/components/projects/category-card'

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
    IconButton,
    CategoryCard
  },
  data() {
    return {}
  },
  methods: {}
}