import colors from '@/styles/_colors.scss';
import anime from 'animejs';

export default {
   name: 'illustration',
   data() {
      return {
         timeline: null,
      };
   },
   props: {
      resetTimeLine: false,
   },
   mounted() {
      this.timeline = anime.timeline({
         easing: 'easeInSine',
         duration: 500,
         direction: 'alternate',
         loop: false,
         complete: this.completedTimeline,
      });

      this.timeline.pause(0);
      const outline = document.querySelector(
         '.illustration-container .outlines'
      );
      if (outline) outline.style.opacity = 1;

      this.timeline
         .add({
            targets: '.outlines .lines .animated-lines path',
            strokeDashoffset: [anime.setDashoffset, 0],
            stroke: ['#FFFFFF', colors.primary],
            strokeWidth: [2, 0],
            easing: 'easeInOutSine',
            delay: function (el, i) {
               return i * 5;
            },
         })
         .add(
            {
               targets: '.outlines',
               opacity: 0,
               duration: 250,
            },
            '-=250'
         );
   },
   methods: {
      completedTimeline() {
         this.$emit('completed-animation');
      },
   },
   watch: {
      resetTimeLine() {
         this.timeline.play();
      },
   },
};
