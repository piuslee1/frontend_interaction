import React from 'react';
import * as THREE from 'three';
import { MTLLoader, OBJLoader } from 'three-obj-mtl-loader';
import { PCDLoader } from '../lib/PCDLoader';

export default class RobotOrientation extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      rotation: Math.PI/2
    };
  }

  componentDidMount() {
    let width = this.mount.clientWidth;
    let height = this.mount.clientHeight;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    
    let geometry = new THREE.BoxGeometry(1, 1, 1);
    let material = new THREE.MeshNormalMaterial();
    this.rover = new THREE.Mesh(geometry, material);
    this.scene.add(this.rover);

    var pointLight = new THREE.PointLight(0xffffff, 10, 100, 1);
    pointLight.position.set(0, 10, 0);
    this.scene.add(pointLight);

    var ambientLight = new THREE.AmbientLight(0x404040, 1);
    this.scene.add(ambientLight);

    var mtlLoader = new MTLLoader();
    mtlLoader.setTexturePath('models/curiosity/texture');
    mtlLoader.load('models/curiosity/curiosity.mtl',
      (materials) => {
        materials.preload();

        var objLoader = new OBJLoader();
        // this doesn't work :\
        // objLoader.setMaterials(materials);
        objLoader.load('models/curiosity/curiosity.obj',
          (object) => {
            this.scene.remove(this.rover);
            this.rover = object;
            this.rover.rotation.y = Math.PI;
            this.scene.add(object);
          }
        );
      }
    );

    var pcdLoader = new PCDLoader();
    pcdLoader.load('bunny.pcd', (mesh) => {
      let meshTransform = new THREE.Matrix4()
        .makeTranslation(0, -2, 1)
        .scale(new THREE.Vector3(10, 10, 10));
      mesh.applyMatrix(meshTransform);

      this.scene.add(mesh);
      this.pointCloud = mesh;
    });

    this.camera.position.y = 3;
    this.camera.position.z = 3;
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
    this.scene.rotation.y = this.state.rotation - Math.PI/2;

    this.renderScene();
    this.frameId = window.requestAnimationFrame(this.animate);
  }

  renderScene() {
    let width = this.mount.clientWidth;
    let height = this.mount.clientHeight;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(width, height);
    this.renderer.render(this.scene, this.camera);
  }

  render() {
    return (
      <div style={{
        width: '100%',
        height: '320px',
        borderTopLeftRadius: '10px',
        borderTopRightRadius: '10px',
        overflow: 'hidden',
        position: "relative",
        zIndex: 1
      }} ref={(mount) => { this.mount = mount }}
      />
    );
  }

}
