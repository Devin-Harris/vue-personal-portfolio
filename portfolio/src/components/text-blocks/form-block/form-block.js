import IconHeading from '@/components/headings/icon-heading'
import IconButton from '@/components/buttons/icon-button'
import CategoryCard from '@/components/projects/category-card'

export default {
  name: 'form-block',
  props: [
    'fields',
    'title',
    'subTitle',
    'btnText'
  ],
  components: {
    IconHeading,
    IconButton,
    CategoryCard
  },
  computed: {
    canClick() {
      let check = true
      this.fields.forEach(f => {
        if (f.required && !f.value)
          check = false
      })
      return check
    }
  },
  data() {
    return {
      currentCategorySelection: ''
    }
  },
  methods: {
    contactRedirect() {
      this.$router.push('/contact')
    }
  }
}