import PageHeading from '@/components/headings/page-heading'
import TextButtonBlock from '@/components/text-blocks/text-button-block'
import TextCardBlock from '@/components/text-blocks/text-card-block'
import SideBySideBlock from '@/components/text-blocks/side-by-side-block'

export default {
  name: 'Home',
  components: {
    PageHeading,
    TextButtonBlock,
    TextCardBlock,
    SideBySideBlock
  },
  data() {
    return {
      aboutMeText: 'I am a computer science engineering student at the University of Cincinnati. I have over 6 years of experience in Adobe Photoshop, Illustrator, and Lightroom. I have an interest in software development especially in web development. I have experience with C++, MATLAB, Python, Processing, and PHP. I have worked extensively in HTML/CSS, Javascript, Vue, and jQuery, Bootstrap, and Jest.',
      sideBySideInformation: [
        {
          iconClass: 'fas fa-bezier-curve',
          title: 'Graphic Design',
          subTitle: 'I like to have well thought-out, simple, and stylish designs',
          rows: [
            {
              title: 'Things I create:',
              subText: [
                'Logos, Advertisements, Illustrations, Photography, UX, UI'
              ]
            },
            {
              title: 'Design Tools',
              subText: [
                'Adobe Illustrator',
                'Adobe Photoshop',
                'Adobe Lightroom',
                'Adobe XD',
                'Pen & Paper'
              ]
            }
          ]
        },
        {
          iconClass: 'fas fa-file-code',
          title: 'Web Development',
          subTitle: 'I enjoy coding from scratch. Bringing both client and server side ideas to life.',
          rows: [
            {
              title: 'Languages I know:',
              subText: [
                'HTML, CSS, Sass, JavaScript, PHP, C#'
              ]
            },
            {
              title: 'Dev Tools / Frameworks',
              subText: [
                'VS Code',
                'Xampp',
                'Bootstrap',
                'jQuery',
                'Vue',
                'Jest',
                'GSAP',
                'GitHub',
                'Azure DevOps',
                'Selenium',
                'Postman'
              ]
            }
          ]
        }
      ]
    }
  },
  methods: {
    headingBtnClick() {
      document.querySelector('.page-work-section').scrollIntoView()
    }
  },
  async mounted() {
    const url = "http://localhost:3000/project-categories"
    const response = await fetch(url, {
      method: 'GET'
    })
    this.$store.state.project_categories = await response.json()
  },
}