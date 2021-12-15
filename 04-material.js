import * as THREE from '../build/three.module.js';
import { OrbitControls } from '../examples/jsm/controls/OrbitControls.js';


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
		this._setupControls();

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

		camera.position.z = 7;
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
		// 1. pointsMaterial
		// const vertices = [];
		// for(let i=0; i<10000; i++) {
		// 	const x = THREE.Math.randFloatSpread(5); //-5~5 사이의 난수값 생성
		// 	const y = THREE.Math.randFloatSpread(5); //-5~5 사이의 난수값 생성
		// 	const z = THREE.Math.randFloatSpread(5); //-5~5 사이의 난수값 생성

		// 	vertices.push(x,y,z);
		// }

		// const geometry = new THREE.BufferGeometry();
		// geometry.setAttribute(
		// 	'position',
		// 	new THREE.Float32Attribute(vertices, 3), // 3개가 하나의 좌표라는 의미
		// );

		// const sprite = new THREE.TextureLoader().load('../examples/textures/sprites/disc.png');
		// const material = new THREE.PointsMaterial({
		// 	map: sprite,
		// 	alphaTest: 0.1, // alphaTest 값보다 클때만 픽셀이 렌더링
		// 	color: '#00ffff', // 포인트 색상값 (#hex, 0xhex, colortext 값으로 표현)
		// 	size: 0.1,
		// 	sizeAttenuation: true, // 카메라의 거리에의해 렌더링 크기 변경 여부
		// });

		// const points = new THREE.Points(geometry, material);
		// this._scene.add(points);

		// 2. LineMaterial
		// const vertices = [
		// 	-1, 1, 0,
		// 	1, 1, 0,
		// 	-1, -1, 0,
		// 	1, -1, 0,
		// ]

		// const geometry = new THREE.BufferGeometry();
		// geometry.setAttribute(
		// 	'position',
		// 	new THREE.Float32Attribute(vertices, 3)
		// );

		// // const material = new THREE.LineBasicMaterial({
		// // 	color: 0xff0000,
		// // });

		// const material = new THREE.LineDashedMaterial({
		// 	color: 0xffff00,
		// 	dashSize: 0.2,
		// 	gapSize: 0.1,
		// 	scale: 1,
		// })

		// const line = new THREE.Line(geometry, material); // 점을 연결함
		// const line = new THREE.LineSegments(geometry, material); // 2개씩 짝지어짐
		// const line = new THREE.LineLoop(geometry, material); // 마지막 점을 첫번째 점과 연결함
		// this._scene.add(line);

		// 3. MeshMaterial

		// 3-1. MeshBasicMaterial
		// const material = new THREE.MeshBasicMaterial({
		// 	// Material class default props : 모든 Material 클래스에서 사용가능 옵션
		// 	visible: true,
		// 	transparent: true, // 불투명도 사용 여부
		// 	opacity: .1,
		// 	/*
		// 		* depth-buffer = z-buffer
		// 			: 3차원 객체를 카메라를 통해 자표 변환시켜 화면 상에 렌더링 될 때
		// 			해당 3차원 객체를 구성하는 각 픽셀에 대한 z 좌표값을 0~1로 정규화
		// 			이 때 정규화된 z 값이 저장된 버퍼가 z-buffer
		// 			이 값이 작을수록 카메라에서 가까운 3차원 객체의 픽셀
		// 	*/
		// 	depthTest: true, // z-buffer를 이용할지
		// 	depthWrite: true, // z-buffer를 기록할지
		// 	side: THREE.FrontSide, // 광원이 있을 경우 렌더링 방향
		// 	/* THREE.BackSide, THREE.DoubleSide  */
		//	// end Material class default props
		// 	color: 0xffff00,
		// 	wireframe: true, // default is false
		// });

		// 3-2. MeshLambertMaterial
		// const material = new THREE.MeshLambertMaterial({
		// 	// material class props
		// 	visible: true,
		// 	transparent: true, // 불투명도 사용 여부
		// 	opacity: .5,
		// 	depthTest: true, // z-buffer를 이용할지
		// 	depthWrite: true, // z-buffer를 기록할지
		// 	side: THREE.DoubleSide, // 광원이 있을 경우 렌더링 방향
		// 	/* THREE.BackSide, THREE.DoubleSide  */

		// 	color: 'red',
		// 	emissive: 0x555500, // 다른 광원에 영향을 받지않는 색 default is black
		// 	wireframe: true, // default is false
		// });

		// 3-3. MeshPhoneMaterial
		// mesh가 렌더링 되는 픽셀 단위로 관원의 영향을 계산하는 재질
		// const material = new THREE.MeshPhongMaterial({
		// 	color: 0xff0000,
		// 	emssive: 0x000000, // 다른 광원에 영향을 받지않는 색 default is black
		// 	specular: 0xffff00, // 광원에 영향을 받는 색 default is lightgray
		// 	shininess: 10,
		// 	flatShading: true,
		// 	wrieframe: false,
		// });

		// 3-4. PBR(물리를 위한 재질)
		// 속도는 느리나 고품질의 렌더링 가능
		// const material = new THREE.MeshStandardMaterial({
		// 	color: 0xff0000,
		// 	emissive: 0x000000,
		// 	roughness: 0.25, // 거칠기 (거울과같은 상태) : 1이 되면 반사하지 않음
		// 	metalness: 0.8, // 금속성 재질을 부여
		// 	wrieframe: false,
		// 	flatShading: false,
		// });

		const material = new THREE.MeshPhysicalMaterial({
			color: 0xff0000,
			emissive: 0x00ffff,
			roughness: .25, // 거칠기 (거울과같은 상태) : 1이 되면 반사하지 않음
			metalness: .8, // 금속성 재질을 부여
			clearcoat: 1, // 코팅값 (최소: 0, 최대: 1)
			clearcoatRoughness: 0, // 코팅에 대한 거칠기 값(최소 : 0, 최대: 1)
			wrieframe: false,
			flatShading: false,
		});



		const box = new THREE.Mesh(new THREE.BoxGeometry(1,1,1), material);
		box.position.set(-1,0,0)
		this._scene.add(box);

		const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.7, 32, 32), material);
		sphere.position.set(1,0,0)
		this._scene.add(sphere);
	}

	resize() {
		const width = this._divConainer.clientWidth;
		const height = this._divConainer.clientHeight;

		this._camera.aspect = width / height;
		this._camera.updateProjectionMatrix();

		this._renderer.setSize(width, height);
	}

	_setupControls() {
		new OrbitControls(this._camera, this._divConainer);
	}

	render(time) {
		this._renderer.render(this._scene, this._camera);
		this.update(time);
		requestAnimationFrame(this.render.bind(this));
	}

	update(time) {
		time *= 0.001 // second unit

	}
}

window.onload = function() {
	new App();
}
