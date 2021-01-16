import ProjectImageGallery from '@/components/projects/project-image-gallery'

export default {
  name: 'file-uploader',
  components: {
    ProjectImageGallery
  },
  props: [
    'uploadedFiles'
  ],
  data() {
    return {
      inputFiles: []
    }
  },
  methods: {
    async fileLoad(e) {
      this.inputFiles = []
      let files = e.target.files

      for (let i = 0; i < files.length; i++) {
        let reader = new FileReader();
        reader.readAsDataURL(files[i]);
        reader.onload = () => {
          this.inputFiles.push(reader.result)
          this.$emit('file-change', this.inputFiles)
        }
        reader.onerror = () => {
          console.log(reader.error);
        }
      }
    },
    openSelector() {
      this.$refs.fileSelector.click()
    }
  }
}