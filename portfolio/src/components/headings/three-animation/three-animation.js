import * as THREE from 'three';
import OrbitControls from 'three-orbitcontrols';

export default {
  name: 'three-animation',
  data() {
    return {
      scene: null,
      camera: null,
      renderer: null,
      cube: null
    }
  },
  mounted() {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.update();
    this.$refs.threeContainer.appendChild(renderer.domElement);

    const textureLoader = new THREE.TextureLoader()
    let image = require('@/assets/NormalMap.png')
    const normalTexture = textureLoader.load(image)

    const geometry = new THREE.SphereGeometry(5, 32, 32)
    const material = new THREE.MeshStandardMaterial();
    material.normalMap = normalTexture
    material.metalness = .7
    material.roughness = .2
    material.color = new THREE.Color(0x292929)
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    const light = new THREE.PointLight(0xffffff, 1, 1000);
    light.position.set(2, 0, -20);
    scene.add(light);

    const light2 = new THREE.PointLight(0xff0000, 8, 1000);
    light2.position.set(10, 4, -20);
    scene.add(light2);

    const light3 = new THREE.PointLight(0x0000ff, 10, 1000);
    light3.position.set(-50, -4, -20);
    scene.add(light3);

    camera.position.x = -5;
    camera.position.y = 10;
    camera.position.z = 25;
    renderer.render(scene, camera)

    const animate = function () {
      requestAnimationFrame(animate);

      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      controls.update();

      renderer.render(scene, camera);
    };

    animate();

  },
  methods: {
    animate() {
      requestAnimationFrame(this.animate);
      this.cube.rotation.x += 0.01;
      this.cube.rotation.y += 0.01;
      this.renderer.render(this.scene, this.camera);
    }
  }
}