import SimplePopup from '@/components/popups/simple-popup'

export default {
  name: 'simple-dropdown',
  props: [
    'items',
    'labelText'
  ],
  components: {
    SimplePopup
  },
  created() {
    window.addEventListener('click', this.clickOutside)
  },
  onUnmounted() {
    window.removeEventListener('click', this.clickOutside)
  },
  data() {
    return {
      selectedItem: '',
      isDropdownOpen: false
    }
  },
  computed: {
    itemChange() {
      return this.items
    }
  },
  methods: {
    togglePopup() {
      this.isDropdownOpen = !this.isDropdownOpen
    },
    itemClick(item) {
      this.selectedItem = item
      this.$emit('selected-change', item)
      this.togglePopup()
    },
    clickOutside(e) {
      if (!this.isDropdownOpen) return
      const popup = this.$el.querySelector('.simple-popup-container__dropdown-popup')
      if (!e.path.includes(popup) && !e.path.includes(this.$el)) this.isDropdownOpen = false
    }
  },
  mounted() {
    setTimeout(() => {
      this.selectedItem = this.items[0]
    }, 200)
  },
  watch: {
    itemChange() {
      if (this.items.includes(this.selectedItem)) return
      this.selectedItem = this.itemChange[0]
    }
  },
}