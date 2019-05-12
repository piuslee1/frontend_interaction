import React from 'react';
import * as THREE from 'three';
import { PCDLoader } from '../lib/PCDLoader';

export default class PointCloud extends React.Component {

  constructor(props) {
    super(props);
    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.animate = this.animate.bind(this);
  }

  componentDidMount() {
    let width = this.mount.clientWidth;
    let height = this.mount.clientHeight;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    
    let geometry = new THREE.BoxGeometry(1, 1, 1);
    let material = new THREE.MeshNormalMaterial();
    this.pointCloud = new THREE.Mesh(geometry, material);
    this.scene.add(this.pointCloud);

    var pointLight = new THREE.PointLight(0xffffff, 10, 100, 1);
    pointLight.position.set(0, 10, 0);
    this.scene.add(pointLight);

    var ambientLight = new THREE.AmbientLight(0x404040, 1);
    this.scene.add(ambientLight);

    var loader = new PCDLoader();
    loader.load('bunny.pcd', (mesh) => {
      // setTimeout(() => {
        this.scene.remove(this.pointCloud);
        this.scene.add(mesh);
        this.pointCloud = mesh;
      // }, 3000);
    });

    this.camera.position.y = 0.3;
    this.camera.position.z = 0.3;
    this.camera.lookAt(this.scene.position);

    this.renderer.setClearColor('#000000');
    this.renderer.setSize(width, height);

    this.mount.appendChild(this.renderer.domElement);
    this.start();
  }

  componentWillUnmount() {
    this.stop();
    this.mount.removeChild(this.renderer.domElement);
  }

  start = () => {
    if (!this.frameId) {
      this.frameId = requestAnimationFrame(this.animate);
    }
  }

  stop = () => {
    cancelAnimationFrame(this.frameId);
  }

  animate = () => {
    this.renderScene();
    this.frameId = window.requestAnimationFrame(this.animate);
  }

  renderScene() {
    this.renderer.render(this.scene, this.camera);
  }

  render() {
    return (
      <div style={{
        borderTopLeftRadius: "15px",
        borderTopRightRadius: "15px",
        width: '100%',
        height: '320px',
        overflow: 'hidden',
        position: "relative",
        zIndex: 1
      }} ref={(mount) => { this.mount = mount }}
      />
    );
  }

}
