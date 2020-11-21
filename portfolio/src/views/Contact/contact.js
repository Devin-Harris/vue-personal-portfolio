import PageHeading from '@/components/headings/page-heading'
import FormBlock from '@/components/text-blocks/form-block'

export default {
  name: 'Contact',
  components: {
    PageHeading,
    FormBlock
  },
  data() {
    return {
      formFields: [
        { label: 'First Name', type: 'input', value: '', required: false },
        { label: 'Last Name', type: 'input', value: '', required: false },
        { label: 'Email', type: 'input', value: '', required: true },
        { label: 'Message', type: 'textarea', value: '', required: true }
      ],
      btnText: 'Submit'
    }
  },
  methods: {
    handleFieldChange(e, field) {
      this.formFields.map(f => {
        if (f === field)
          f.value = e.target.value
      })
    },
    formAction() {

      // If btnText is submit, Post to send message

      //Else reload form

    }
  },
}
