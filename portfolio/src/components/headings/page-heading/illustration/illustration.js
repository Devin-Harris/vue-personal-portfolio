import anime from 'animejs';

export default {
   name: 'illustration',
   data() {
      return {
         timeline: null,
         slowDelayCallback: (i) => (i % 400) * 250,
         fastDelayCallback: (i) => (i % 100) * 25,
         strokeWidth: 2,
         completedOnce: false,
         delayCallback: 'fast',
      };
   },
   props: {
      resetTimeLine: false,
   },
   mounted() {
      this.buildTimeline();
      this.timeline.play();
   },
   methods: {
      completedTimeline() {
         this.$emit('completed-animation');
         if (!this.completedOnce) {
            this.strokeWidth = 10;
            this.delayCallback = 'slow';
            this.completedOnce = true;
            this.timeline?.restart();
            this.timeline?.pause();
            this.buildTimeline();
         }
      },
      buildTimeline() {
         this.timeline = anime.timeline({
            easing: 'easeInSine',
            duration: 2000,
            direction: 'alternate',
            loop: true,
            loopComplete: this.completedTimeline,
         });

         this.timeline.pause();
         const outline = document.querySelector(
            '.illustration-container .outlines'
         );
         if (outline) outline.style.opacity = '1';

         outline.querySelectorAll('.lines path').forEach((l) => {
            l.setAttribute('stroke-linejoin', 'round');
         });

         this.timeline
            .add({
               targets: `.outlines .lines path`,
               strokeDashoffset: [anime.setDashoffset, 0],
               stroke: ['#FFFFFF', '#ff6b6b'],
               strokeWidth: [this.strokeWidth, 0],
               easing: 'easeInOutSine',
               delay: (el, i) => {
                  return this.delayCallback === 'fast'
                     ? this.fastDelayCallback(i)
                     : this.slowDelayCallback(i);
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
   },
   watch: {
      resetTimeLine() {
         this.strokeWidth = this.strokeWidth === 10 ? 2 : 10;
         this.buildTimeline();
      },
   },
};
