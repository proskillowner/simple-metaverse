import React from "react";
import * as THREE from "three";
import CameraController from "./controller/CameraController";
import PlayerController from "./controller/PlayerController"

class Game extends React.Component {

	constructor(props) {
		super(props);
	}

	componentDidMount() {
		const scene = new THREE.Scene();
		scene.background = new THREE.Color(0xa0a0a0);
		scene.fog = new THREE.Fog(0xa0a0a0, 10, 50);

		const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444);
		hemiLight.position.set(0, 20, 0);
		scene.add(hemiLight);

		const dirLight = new THREE.DirectionalLight(0xffffff);
		dirLight.position.set(10, 10, 10);
		dirLight.castShadow = true;
		dirLight.shadow.camera.top = 10;
		dirLight.shadow.camera.bottom = -10;
		dirLight.shadow.camera.left = -10;
		dirLight.shadow.camera.right = 10;
		dirLight.shadow.camera.near = 0.1;
		dirLight.shadow.camera.far = 100;
		scene.add(dirLight);

		const renderer = new THREE.WebGLRenderer({ antialias: true });
		renderer.setPixelRatio(window.devicePixelRatio);
		renderer.setSize(window.innerWidth, window.innerHeight);
		renderer.outputEncoding = THREE.sRGBEncoding;
		renderer.shadowMap.enabled = true;
		document.body.appendChild(renderer.domElement);

		const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
		camera.position.y = 2;
		camera.position.z = -3;

		const mesh = new THREE.Mesh(new THREE.PlaneGeometry(100, 100), new THREE.MeshPhongMaterial({ color: 0x999999, depthWrite: false }));
		mesh.rotation.x = - Math.PI / 2;
		mesh.receiveShadow = true;
		scene.add(mesh);

		const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
		const boxMaterial = new THREE.MeshStandardMaterial({ color: 0x333333 });

		const box1 = new THREE.Mesh(boxGeometry, boxMaterial);
		box1.position.copy(new THREE.Vector3(2, 1, 2));
		scene.add(box1);

		const box2 = new THREE.Mesh(boxGeometry, boxMaterial);
		box2.position.copy(new THREE.Vector3(-2, 1, 2));
		scene.add(box2);

		const box3 = new THREE.Mesh(boxGeometry, boxMaterial);
		box3.position.copy(new THREE.Vector3(2, 1, -2));
		scene.add(box3);

		const box4 = new THREE.Mesh(boxGeometry, boxMaterial);
		box4.position.copy(new THREE.Vector3(-2, 1, -2));
		scene.add(box4);

		const playerController = new PlayerController();
		playerController.onPlayerCreate = () => {
			scene.add(playerController.getModel());
			const cameraController = new CameraController(playerController.getModel(), camera);

			const clock = new THREE.Clock();

			const animate = () => {
				requestAnimationFrame(animate);

				const deltaTime = clock.getDelta();

				box1.rotateY(deltaTime);
				box2.rotateY(deltaTime);
				box3.rotateY(deltaTime);
				box4.rotateY(deltaTime);

				playerController.update(deltaTime);
				if (cameraController) {
					cameraController.update(deltaTime);
					playerController.update(deltaTime);
				}
				renderer.render(scene, camera);
			}

			animate();
		}
	}

	render() {
		return (
			<div ref={ref => (this.mount = ref)} />
		)
	}
}

export default Game;