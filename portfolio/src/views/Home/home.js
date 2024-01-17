import IconButton from '@/components/buttons/icon-button';
import BackgroundAnimation from '@/components/headings/background-animation';
import PageHeading from '@/components/headings/page-heading';
import threeAnimation from '@/components/headings/three-animation';
import SideBySideBlock from '@/components/text-blocks/side-by-side-block';
import TextButtonBlock from '@/components/text-blocks/text-button-block';
import TextCardBlock from '@/components/text-blocks/text-card-block';
import Timeline from '@/components/text-blocks/timeline';
import ScrollMagic from 'scrollmagic';
import { mapActions, mapGetters } from 'vuex';

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
      Timeline,
   },
   computed: {
      ...mapGetters(['getCategories']),
      aboutPicture() {
         return require('@/assets/images/aboutPicture.jpg');
      },
   },
   data() {
      return {
         aboutMeText: `I am a computer science engineering student at the University of Cincinnati.
        I have over 6 years of experience in Adobe Photoshop, Illustrator, and Lightroom.
        I have an interest in software development especially in web development.
        I have experience with C++, MATLAB, Python, LabVIEW, and PHP.
        I have worked extensively in HTML/CSS, JavaScript, Vue, Angular, WebAPI, NestJS, jQuery, Bootstrap, Tailwind, Selenium, and Jest.
        <br>
        My career goals are currently to become a fullstack web developer.
        I have quite a bit of experience with frontend and graphic design and would love to branch out into all forms of software development one day as well.
      `,
         sideBySideInformation: [
            {
               iconClass: 'fas fa-bezier-curve',
               title: 'Graphic Design',
               subTitle:
                  'I like to have well thought-out, simple, and stylish designs',
               rows: [
                  {
                     title: 'Things I create:',
                     subText: [
                        'Logos, Advertisements, Illustrations, Photography, UX, UI',
                     ],
                  },
                  {
                     title: 'Design Tools',
                     subText: [
                        'Adobe Illustrator',
                        'Adobe Photoshop',
                        'Adobe Lightroom',
                        'Adobe XD',
                        'Pen & Paper',
                        'Excalidraw',
                     ],
                  },
               ],
            },
            {
               iconClass: 'fas fa-file-code',
               title: 'Web Development',
               subTitle:
                  'I enjoy coding from scratch. Bringing both client and server side ideas to life.',
               rows: [
                  {
                     title: 'Languages I know:',
                     subText: [
                        'HTML, CSS, Sass, JavaScript, TypeScript, PHP, C#, RxJS',
                     ],
                  },
                  {
                     title: 'Dev Tools / Frameworks',
                     subText: [
                        'Visual Studio Code',
                        'Visual Studio',
                        'Vue',
                        'Angular',
                        'Xampp',
                        'Bootstrap',
                        'jQuery',
                        'Jest',
                        'GSAP',
                        'GitHub',
                        'Azure DevOps',
                        'Selenium',
                        'Postman',
                        'HeidiSQL',
                        'MySQL',
                        'WebAPI',
                     ],
                  },
               ],
            },
         ],
         workTimelinePoints: [
            {
               position: 'Software Engineer',
               company: 'Cincom Systems',
               dates: '08/2020 - 01/2021',
               info: `This was my first coop at the University of Cincinnati.
            I worked primarily as a Front-End developer on the engineering team, but also got some experience on the Backend and QA portions of the applications we were building.
            I practiced Agile development, Participated in daily stand ups, retrospectives, and demos at Cincom.
            I used Vue.js, Test Driven Development through Jest and Selenium, REST Apis, C#, and other technologies as well.
            <br>
            <br>
            Since this was my first coop I spent a lot of time getting familiar with the code base and meeting the team.
            I got to practice professional work etiquette and partake in very technical discussions and meetings which was very exciting.
            I also got much better at understanding how all the pieces of software development tie together and create a functional, secure, and attractive looking site/app.
          `,
            },
            {
               position: 'Software Engineer',
               company: 'Cincom Systems',
               dates: '05/2021 - 09/2021',
               info: `This was my second coop at the University of Cincinnati.
            This semester I worked primarily as a Front-End developer on the engineering team and helped out with QA every now and then.
            Again got more practice with Agile development, participated in daily stand ups, retrospectives, and demos.
            Used Vue.js, Test Driven Development through Jest and Selenium, REST Apis, C#, and other technologies.
            <br>
            <br>
            My second coop I was much more comfortable with the codebase and my frontend skills.
            I took on much more technical stories/bugs and like to think I made a much bigger impact compared to my first semester at Cincom.
            This semester I also focused more on building connections with my team.
            The first semester was completely remote, and while most of the second semester was as well, I did get the opportunity to come into the office for the last 1-2 months of the semester.
            This made it much easier to build connections with the members of my team and was a great lesson on what the professional workplace looks and feels like. 
          `,
            },
            {
               position: 'Software Engineer',
               company: 'London Computer Systems',
               dates: '01/2022 - 01/2024',
               info: `This was my third, fourth and fifth coop at the University of Cincinnati.
            During my semesters here I worked as a full stack developer on the qManage engineering team.
            Again got more practice with Agile development, through participating in daily stand ups, bi-weekly retrospectives, and monthly demos.
            This coop did not practice paired programming, but instead used peer reviewing as a way to check code across the team.
            I also used Angular, RxJS, REST and GraphQl, C#, WebAPI, and other technologies here.
            <br>
            <br>
            My first couple weeks here, I was a little hesitant jumping into a brand new team and learning a bunch of brand new technologies, especially backend related ones.
            I picked up the frontend aspects very quickly and definitely learned a ton about WebAPI and backend methodologies.
            I also really enjoyed being more "on my own" over these semesters, as the non paired programming environment made it more challenging and exciting when I got to experience new pieces of the codebase.
            The team I joined was also spearheading a lot of the innovation on team tooling (such as switching from perforce to git) which I got to be apart of.
            This was also my first non-completely remote coop, so coming in 2 days a week for the whole duration of the coop was a new experience for me as well.
            <br>
            <br>
            I did many part time semesters here as I finished my schooling as well. I got to be part of tons of group projects which was awesome to experience and give feedback on.
            As of writing this I plan on returning to LCS full time after I graduate!
          `,
            },
         ],
         qualificationType: 'skills',
         controller: null,
         scene: null,
      };
   },
   mounted() {
      this.controller = new ScrollMagic.Controller();

      // build scene
      this.scene = new ScrollMagic.Scene({
         triggerElement: '.home-container_qualifications',
         triggerHook: 0.9, // show, when scrolled 10% into view
         offset: 50, // move trigger to center of element
         reverse: false, // only do once
      })
         .setClassToggle('.home-container_qualifications', 'visible') // add class to reveal
         .addTo(this.controller);

      this.positionInkBar();
   },
   methods: {
      ...mapActions(['fetchCategories']),
      headingBtnClick() {
         document
            .querySelector('.page-work-section')
            .scrollIntoView({ behavior: 'smooth' });
      },
      downloadResume() {
         const link = document.createElement('a');
         link.setAttribute('download', 'Devin Harris_Resume.pdf');
         link.href = './resume.pdf';
         document.body.appendChild(link);
         link.click();
         link.remove();
      },
      qualificationClick(qualificationType) {
         this.qualificationType = qualificationType;
         this.positionInkBar();
      },
      positionInkBar() {
         const qualificationsBounds =
            this.$refs.qualifications.getBoundingClientRect();
         let typeBounds = null;
         if (this.qualificationType === 'skills') {
            typeBounds = this.$refs.qualificationSkills.getBoundingClientRect();
         } else if (this.qualificationType === 'work') {
            typeBounds = this.$refs.qualificationWork.getBoundingClientRect();
         }
         if (typeBounds && qualificationsBounds) {
            this.$refs.qualificationInkBar.style.width =
               typeBounds.width + 'px';
            this.$refs.qualificationInkBar.style.left =
               (this.qualificationType === 'skills' ? 0 : typeBounds.width) +
               'px';
         }
      },
   },
};
