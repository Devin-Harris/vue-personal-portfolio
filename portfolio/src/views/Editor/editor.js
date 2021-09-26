import { mapActions, mapGetters, mapMutations } from "vuex";
import DraggableTable from '@/components/projects/draggable-table'

export default {
  name: 'editor',
  components: {
    DraggableTable
  },
  data() {
    return {
      headingOverride: '',
      password: '',
      incorrectPassword: false
    }
  },
  computed: {
    ...mapGetters(['getIsLoggedIntoEditor', 'getCategories']),
    categoryItems() {
      if (!this.getCategories || !this.getCategories.data) return []
      return this.getCategories.data.map(c => {
        return {
          ...c,
          label: c.name
        }
      })
    }
  },
  created() {
    this.verifyPassword(localStorage.getItem('editor_password'))
    this.fetchCategories()
  },
  methods: {
    ...mapActions(['verifyPassword', 'fetchCategories']),
    ...mapMutations(['updateIsLoggedIntoEditor']),
    async checkPassword() {
      const response = await this.verifyPassword(this.password)
      this.incorrectPassword = response.status !== 200
      if (response.status === 200) {
        localStorage.setItem('editor_password', this.password)
      }
    }
  },
  watch: {
    password() {
      this.incorrectPassword = false
    }
  }
}