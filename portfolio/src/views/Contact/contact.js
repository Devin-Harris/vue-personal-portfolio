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
      btnText: 'Submit',
      formTitle: 'Please fill out this form',
      formSubTitle: 'Thanks for your interest!',
      isFormShown: true
    }
  },
  methods: {
    handleFieldChange(e, field) {
      this.formFields.map(f => {
        if (f === field)
          f.value = e.target.value
      })
    },
    async formAction() {

      // If btnText is submit, Post to send message
      if (this.btnText === 'Submit') {

        const formData = {
          firstName: this.formFields[0].value,
          lastName: this.formFields[1].value,
          email: this.formFields[2].value,
          message: this.formFields[3].value
        }

        let url = ""
        if (location.hostname === "localhost")
          url = 'http://localhost:3000/form-submission'
        else url = 'https://devinharris-portfolio.herokuapp.com/form-submission'

        const response = await fetch(url, {
          method: "POST",
          credentials: "same-origin",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData)
        })

        const data = await response.json()

        if (data.status === 200)
          this.btnText = 'Send another message'
        else
          this.btnText = 'Please try again'

        this.formTitle = data.message.title
        this.formSubTitle = data.message.subTitle

        this.formFields = [
          { label: 'First Name', type: 'input', value: '', required: false },
          { label: 'Last Name', type: 'input', value: '', required: false },
          { label: 'Email', type: 'input', value: '', required: true },
          { label: 'Message', type: 'textarea', value: '', required: true }
        ]

        this.isFormShown = false
      }
      //Else reload form
      else {
        this.btnText = 'Submit'
        this.formTitle = 'Please fill out this form'
        this.formSubTitle = 'Thanks for your interest!'
        this.formFields = [
          { label: 'First Name', type: 'input', value: '', required: false },
          { label: 'Last Name', type: 'input', value: '', required: false },
          { label: 'Email', type: 'input', value: '', required: true },
          { label: 'Message', type: 'textarea', value: '', required: true }
        ]
        this.isFormShown = true
      }
    },
    headingBtnClick() {
      this.$router.push('/')
    }
  }
}
