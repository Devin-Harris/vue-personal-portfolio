export default {
  name: 'draggable-table',
  props: {
    hasHeading: { default: true },
    heading: { default: '' },
    canAdd: { default: true },
    items: { default: () => [] }
  }
}