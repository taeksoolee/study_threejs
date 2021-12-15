
* ***이 예제는 three.js-master 파일 내부에 위치하여 동작함.***
---
## Geometry : 형상을 정의
### 02-geomatry
* 구성
1. *Vertex*: 정접 (x, y, z 좌표)
2. *Vertext Index* : 정접 인덱스
3. *Normal Vector* : 수직 벡터
4. *Vertex Color* : 정접 색상
5. 텍스쳐 맵핑을위한 *UV좌표*
5. 사용자 정의 데이터

* 구현체
> BufferGeometry
> > BoxGeometry : 큐브(width, height, depth, segmentx=1, segmenty=1, segmentz=1)
> > CircleGeometry : 원(반지름=1, segment=8, 시작각(radian)=0, 연장각=MATH.PI*2)
> > GoneGeometry : 원기둥(반지름=1, 높이=1, 둘레(분할)=8, 높이(분할)=1, 밑면비활성=false, 시작각=0, 연장각=Math.PI*2)
> > CylinderGeometry : 원기둥 (윗면반지름=1, 밑면반지름=1, 높이=1, 뚜껑(분할)=8, 옆면(분할)=8, 뚜껑비활성=false, 시작각=0, 연장=Math.PI*2)
> > SphereGeometry : 구 (반지름=1, 수평방향(분할수)=32, 수직방향(분할수)=16, (수직)시작각=0, (수직)연장각=Math.PI*2, (수평)시작각=0, (수평)연장각=Math.PI)
> > RingGeometry: 링(내부 반지름=0.5, 외부반지름=1, 외부방향(가장자리) 분할수=8, 내부방향 분할수=1, 시작각=0, 연장각=Math.PI*2)
> > PlaneGeometry: 평면(너비길이=1, 높이길이=1, 너비방향 분할수=1, 높이방향 분할수=1)
> > TorusGeometry: 튜브(3차원 반지) (반지름=1, 원통의 반지름=1, 방사방향 분할수=8, 원통분할수=6, 연장각=Math.PI*2)
> > TorusGeometry: 튜브(3차원 반지) (반지름=1, 원통의 반지름=1, 방사방향 분할수=8, 원통분할수=6, 반복수)
> >
> > ExtrudeGeometry
> > > TextGeometry
> >
> > LatheGeometry
> > TubeGeometry
> > ShapeGeometry : 2차원 도형
> > WireframeGeometry
> >
> > ParametricGeometry : 수학적 함수식에 두개의 값을 이용하여 좌표를 얻음
> > EdgesGeometry : 인접면에 각도에 따라 좌표를 재구성
> >
> > PolyhedronGeometry : 다면체
> > > IcosahedronGeometry : 20면체
> > > DodecahedronGeometry : 12면체
> > > OctahedronGeometry : 8면체
> > > TetrahedronGeometry : 4면체
---
## Material
### 04-material
> Material
> > PointsMaterial
> > LineBasicMaterial
> > > LineDashedMaterial
> > MeshBasicMaterial
> > MeshLambertMaterial
> > MeshPhongMaterial
> > MeshStandardMaterial
> > > MeshPhysicalMaterial
> > MeshDepthMaterial
> > MeshNormalMaterial
> > MeshToonMaterial

---
## Scene Graph
### 03-scenegraph
> Renederer
> > Scene
> > > Light
> > > Mesh(extends Object3D)
> > > > Geometry : 3차원 객체의 형상 등을 정의
> > > > Material : 색상이나 투명도 정의
> > Camera

> Object3D (position(x=0,y=0,z=0), rotation(x=0,y=0,z=0), scale(x=1,y=1,z=1))
> > Mesh
> > Line
> > Point


