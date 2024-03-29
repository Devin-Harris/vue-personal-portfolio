import FooterButton from '@/components/buttons/footer-button';
import Illustration from '@/components/headings/page-heading/illustration';

export default {
   name: 'footer-bar',
   components: {
      FooterButton,
      Illustration,
   },
   props: ['footerButtonTheme'],
   data() {
      return {
         currYear: new Date(Date.now()).getUTCFullYear(),
      };
   },
   methods: {
      openLink(link) {
         window.open(link);
      },
      redirect(name) {
         if (name === 'top') {
            window.scroll({ left: 0, top: 0, behavior: 'smooth' });
            return;
         }

         if (name === 'work') {
            if (this.$route.name === 'Home')
               document
                  .querySelector('.page-work-section')
                  .scrollIntoView({ behavior: 'smooth' });
            else {
               this.$router.push('/');
               setTimeout(() => {
                  document
                     .querySelector('.page-work-section')
                     .scrollIntoView({ behavior: 'smooth' });
               }, 50);
            }
            return;
         }

         if (name === 'footer-button') {
            if (this.$route.name === 'Contact') {
               this.$router.push('/');
               setTimeout(() => {
                  document
                     .querySelector('.page-work-section')
                     .scrollIntoView({ behavior: 'smooth' });
               }, 50);
            } else {
               this.$router.push('/contact');
            }
         }

         this.$router.push({ name });
      },
   },
};
