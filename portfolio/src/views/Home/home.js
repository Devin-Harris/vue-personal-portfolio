import { mapActions, mapGetters } from 'vuex'
import PageHeading from '@/components/headings/page-heading'
import IconButton from '@/components/buttons/icon-button'
import TextButtonBlock from '@/components/text-blocks/text-button-block'
import TextCardBlock from '@/components/text-blocks/text-card-block'
import SideBySideBlock from '@/components/text-blocks/side-by-side-block'
import BackgroundAnimation from '@/components/headings/background-animation'
import threeAnimation from '@/components/headings/three-animation'
import Timeline from '@/components/text-blocks/timeline'
import ScrollMagic from 'scrollmagic'

export default {
  name: 'Home',
  components: {
    PageHeading,
    IconButton,
    TextButtonBlock,
    TextCardBlock,
    SideBySideBlock,
    BackgroundAnimation,
    threeAnimation,
    Timeline
  },
  computed: {
    ...mapGetters(['getCategories']),
    aboutPicture() {
      return require('@/assets/images/aboutPicture.jpg')
    }
  },
  data() {
    return {
      aboutMeText: 'I am a computer science engineering student at the University of Cincinnati. I have over 6 years of experience in Adobe Photoshop, Illustrator, and Lightroom. I have an interest in software development especially in web development. I have experience with C++, MATLAB, Python, Processing, and PHP. I have worked extensively in HTML/CSS, Javascript, Vue, jQuery, Bootstrap, and Jest.',
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
      ],
      workTimelinePoints: [
        {
          position: 'Software Engineer',
          company: 'Cincom Systems',
          dates: '08/2020 - 01/2021',
          info: 'This was my first coop at the University of Cincinnati. I worked primarily as a Front-End developer on the engineering team. Practiced Agile development Participated in daily stand ups, retrospectives, and demos. Used Vue.js, TDD, REST Apis, C#, and other technologies.'
        },
        {
          position: 'Software Engineer',
          company: 'Cincom Systems',
          dates: '05/2021 - 09/2021',
          info: 'This was my second coop at the University of Cincinnati. I worked primarily as a Front-End developer on the engineering team. Practiced Agile development Participated in daily stand ups, retrospectives, and demos. Used Vue.js, TDD, REST Apis, C#, and other technologies.'
        }
      ],
      qualificationType: 'skills',
      controller: null,
      scene: null
    }
  },
  mounted() {
    this.controller = new ScrollMagic.Controller()

      // build scene
    this.scene = new ScrollMagic.Scene({
        triggerElement: ".home-container_qualifications",
        triggerHook: 0.9, // show, when scrolled 10% into view
        offset: 50, // move trigger to center of element
        reverse: false // only do once
      })
        .setClassToggle(".home-container_qualifications", "visible") // add class to reveal
        .addTo(this.controller);
      
  },
  methods: {
    ...mapActions(['fetchCategories']),
    headingBtnClick() {
      document.querySelector('.page-work-section').scrollIntoView({ behavior: "smooth" })
    },
    downloadResume() {
      const link = document.createElement("a");
      link.setAttribute('download', 'Devin Harris_Resume.pdf');
      link.href = './resume.pdf';
      document.body.appendChild(link);
      link.click();
      link.remove();
    }
  }
}