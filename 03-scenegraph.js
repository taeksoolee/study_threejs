import * as THREE from '../build/three.module.js';

class App {
	constructor() {
		const divContainer = document.querySelector('#webgl-container')

		this._divConainer = divContainer;

		// antialias=true : 3D 모델의 계단 현상을지움
		const renderer = new THREE.WebGL1Renderer({antialias : true})
		renderer.setPixelRatio(window.devicePixelRatio); //
		divContainer.appendChild(renderer.domElement);

		this._renderer = renderer;

		const scene = new THREE.Scene();
		this._scene=scene;

		this._setupCamera();
		this._setupLight();
		this._setupModel();

		window.onresize = this.resize.bind(this);
		this.resize();

		requestAnimationFrame(this.render.bind(this));
	}

	_setupCamera() {
		const width = this._divConainer.clientWidth;
		const height = this._divConainer.clientHeight;
		const camera = new THREE.PerspectiveCamera(
			75,
			width / height,
			0.1,
			100
		);

		camera.position.z= 50;
		this._camera = camera;
	}

	_setupLight() {
		const color = 0xffffff;
		const intensity = 1;
		const light = new THREE.DirectionalLight(color, intensity);
		light.position.set(-1, 2, 4);
		this._scene.add(light);
	}

	_setupModel() {
		const solarSystem = new THREE.Object3D();
		this._scene.add(solarSystem);

		const radius =1;
		const widthSegments = 12;
		const heightSegments = 12;
		const sphereGeometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments);

		const sunMatrial = new THREE.MeshPhongMaterial({
			emissive: 0xffff00, flatShading: true
		});

		const sunMesh = new THREE.Mesh(sphereGeometry, sunMatrial);
		sunMesh.scale.set(3,3,3);
		solarSystem.add(sunMesh);

		const earthOrbit = new THREE.Object3D();
		earthOrbit.position.x = 10;
		solarSystem.add(earthOrbit);

		const earthMaterial = new THREE.MeshPhongMaterial({
			color: 0x22233ff, emissive: 0x112244, flatShading: true
		});
		const earthMesh = new THREE.Mesh(sphereGeometry, earthMaterial);
		earthOrbit.add(earthMesh);

		const moonOrbit = new THREE.Object3D();
		moonOrbit.position.x = 2;
		earthOrbit.add(moonOrbit);

		const moonMaterial = new THREE.MeshPhongMaterial({
			color: 0x8888, emissive: 0x2222, flatShading: true,
		});

		const moonMesh = new THREE.Mesh(sphereGeometry, moonMaterial);
		moonMesh.scale.set(.5,.5,.5);
		moonOrbit.add(moonMesh)


		this._solarSystem = solarSystem;
		this._earthOrbit = earthOrbit;
		this._moonOrbit = moonOrbit;
	}

	resize() {
		const width = this._divConainer.clientWidth;
		const height = this._divConainer.clientHeight;

		this._camera.aspect = width / height;
		this._camera.updateProjectionMatrix();

		this._renderer.setSize(width, height);
	}

	render(time) {
		this._renderer.render(this._scene, this._camera);
		this.update(time);
		requestAnimationFrame(this.render.bind(this));
	}

	update(time) {
		time *= 0.001 // second unit

		this._solarSystem.rotation.y = time / 2;
		this._earthOrbit.rotation.y = time * 2;
		this._moonOrbit.rotation.y = time * 5;
	}
}

window.onload = function() {
	new App();
}
