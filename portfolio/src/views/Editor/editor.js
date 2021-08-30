import { mapActions, mapGetters, mapMutations } from "vuex";

export default {
  name: 'editor',
  data() {
    return {
      headingOverride: '',
      password: '',
      incorrectPassword: false
    }
  },
  computed: {
    ...mapGetters(['getIsLoggedIntoEditor'])
  },
  methods: {
    ...mapActions(['verifyPassword']),
    ...mapMutations(['updateIsLoggedIntoEditor']),
    checkPassword() {
      const response = this.verifyPassword(this.password)
      this.incorrectPassword = response.status !== 200
    }
  },
  watch: {
    password() {
      this.incorrectPassword = false
    }
  }
}