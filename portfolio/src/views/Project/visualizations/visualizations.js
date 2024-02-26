import IconButton from '@/components/buttons/icon-button';
import IconHeading from '@/components/headings/icon-heading';
import Project1 from './project-1.vue';

export default {
   name: 'visualizations',
   props: [
      'title',
      'iconClass',
      'theme',
      'paragraphText',
      'buttons',
      'projectName',
   ],
   components: {
      IconHeading,
      IconButton,
      Project1,
   },
   data() {
      return {};
   },
   methods: {
      handleClick(action) {
         if (action === '/contact') {
            this.$router.push('/contact');
         } else if (action === 'site' || action === 'code') {
            this.$emit('button-click', action);
         }
      },
   },
};
