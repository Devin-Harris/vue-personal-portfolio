import TOPOLOGY from 'vanta/dist/vanta.topology.min'
import p5 from 'p5'

export default {
  name: 'background-animation',
  data() {
    return {
      vantaEffect: null
    }
  },
  mounted() {
    // this.vantaEffect = TOPOLOGY({
    //   el: ".background-animation-container",
    //   scale: 1.00,
    //   scaleMobile: 1.00,
    //   color: '#2b3239',
    //   backgroundColor: '#1b1e22',
    //   p5: p5
    // })
  },
  beforeUnmount() {
    if (this.vantaEffect) {
      this.vantaEffect.destroy()
    }
  }
}