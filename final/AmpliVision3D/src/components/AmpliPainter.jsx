import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { COLOR_MAP } from '../constants';


var blocks = [];
// for saving and loading.
var blocksMap =Array.from(Array(10), () => new Array(10))

var alternateBlock = false;
var concaveBlock = null;
var convexBlock = null;
var grid = null;

var eraserMode = false;
var rotation = 0;
var blockType = 1;

export default function AmpliPainter() {
  const containerRef = useRef();
  const sceneRef = useRef(new THREE.Scene());
  const rendererRef = useRef();
  const cameraRef = useRef();
  const controlsRef = useRef();
  const painterBlockRef = useRef();

  // 3D models
  const loader = new GLTFLoader();
  var moveDistance = 0;
  loader.load('/assets/AmpliGrid.glb', (gltf) => {
    grid = gltf.scene;
    grid.scale.set(.08, .08, .08);
    grid.position.set(-2, 0, -1.5);

    // setting the block move distance according to the size of the grid
    const box = new THREE.Box3().setFromObject(grid);
    const size = box.getSize(new THREE.Vector3());
    moveDistance = size.x / 10;

    sceneRef.current.add(grid);
  },
  );


  // "painter" block
  loader.load('/assets/concave_block.glb', (gltf) => {
    concaveBlock = gltf.scene;
    concaveBlock.scale.set(.08, .08, .08);
    concaveBlock.position.set(1.75, 0, 1.85);
    painterBlockRef.current = concaveBlock;
  },
  );
  loader.load('/assets/convex_block.glb', (gltf) => {
    convexBlock = gltf.scene;
  }
  );

  useEffect(() => {
    // config
    const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 300);
    camera.position.set(0, 15, 0);

    const target = new THREE.Vector3(0, 0, 0);
    camera.position.x = Math.sin(Math.PI);
    camera.position.z = Math.cos(Math.PI);
    camera.lookAt(target);


    cameraRef.current = camera;


    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enableZoom = false;
    controlsRef.current = controls;

    // lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    sceneRef.current.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xff0000, 1);
    directionalLight.position.set(4, 10, -1);
    sceneRef.current.add(directionalLight);

    const directionalLight2 = new THREE.DirectionalLight(0x0000ff, 1);
    directionalLight.position.set(4, 10, -1);
    sceneRef.current.add(directionalLight2);

    // animation
    function animate() {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(sceneRef.current, camera);
    }
    animate();

    // handlers
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };


    const handleKeyDown = (e) => {
      const block = painterBlockRef.current;
      sceneRef.current.add(block);

      const gridBox = new THREE.Box3().setFromObject(grid);
      let s = gridBox.getSize(new THREE.Vector3());
      if (!block) return;

      //console.log(block.position);
      switch (e.key.toUpperCase()) {

        // Movement
        case 'A':
          if (block.position.x + moveDistance > 6) return;
          block.position.x += moveDistance;
          break;
        case 'D':
          if (block.position.x + moveDistance < -4) return;
          block.position.x -= moveDistance;
          break;
        case 'S':
          if (block.position.z + moveDistance < -3.8) return;
          block.position.z -= moveDistance;
          break;
        case 'W':
          if (block.position.z + moveDistance > 6) return;
          block.position.z += moveDistance;
          break;
        case 'E':
          block.rotation.y += Math.PI / 2;
          rotation = (rotation + 1) % 4;
          break;
        case 'Q':
          block.rotation.y -= Math.PI / 2;
          rotation = (rotation + 3) % 4;
          break;

        // download blocksMap
        case 'K':
          let a = document.createElement('a');
          a.href = URL.createObjectURL(new Blob([JSON.stringify(blocksMap)], { type: 'application/json' }));
          a.download = 'blocksMap.json';
          a.click();
          break;
        
        // load blocksMap
        case 'L':
          let input = document.createElement('input');
          input.type = 'file';
          input.accept = '.json';
          input.onchange = (e) => {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onload = (e) => {
              let _blocksMap = JSON.parse(e.target.result);

              // check if blocksMap is different from _blocksMap
              if (JSON.stringify(blocksMap) == JSON.stringify(_blocksMap)) return;
              blocksMap = _blocksMap;

              // remove all blocks from scene
              blocks = [];
              sceneRef.current.children.forEach(child => {
                if (child.type == "Group" && child != grid) {
                  sceneRef.current.remove(child);
                }
              });

              // add blocks from blocksMap
              const gridBox = new THREE.Box3().setFromObject(grid);
              let s = gridBox.getSize(new THREE.Vector3());
              for (let i = 0; i < 10; i++) {
                for (let j = 0; j < 10; j++) {
                  if (blocksMap[i][j] != null) {
                    // load block from json
                    let block = new THREE.ObjectLoader().parse(blocksMap[i][j]["Block"]);
                    block.position.set(-i * moveDistance + 5.2, 0, -j * moveDistance + 5.3);
                    block.rotation.y = blocksMap[i][j]["Rotation"] * Math.PI / 2;
                    sceneRef.current.add(block);
                    blocks.push(block);
                  }
                }
              }
            };

            reader.readAsText(file);
          };
          input.click();
          break;


        case ' ':
          sceneRef.current = placeBlock(block, sceneRef);
          break;

        default:
          const index = parseInt(e.key);
          if (!isNaN(index) && index > 0 && index <= 6) {

            blockType = index;

            // color pins
            for (let i = 0; i < 4; i++) {
              const n = i == 0 ? `VertexGroups` : `VertexGroups_${i}`;
              const pin = block.getObjectByName(n);
              const [r, g, b] = COLOR_MAP[index][i];
              pin.material.color.setRGB(r, g, b);
            }

            // show pad or not
            const pad = block.getObjectByName('VertexGroups_5');
            pad.material.visible = COLOR_MAP[index][4];
          }
          if (index == 0) {
            eraserMode = !eraserMode;
            let rgb = eraserMode ? [.5, 0, 0] : [.7, .7, .7];
            block.getObjectByName("VertexGroups_4").material.color.setRGB(...rgb);
          }
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('keydown', handleKeyDown);
      renderer.dispose();
      containerRef.current?.removeChild(renderer.domElement);
    };
  }, []);


  // ** Helper functions **

  const placeBlock = (block, sceneRef) => {
    // independent block colors
    const newBlock = block.clone();
    newBlock.traverse((child) => {
      if (child.isMesh) {
        child.material = child.material.clone();
      }
    });

    // swap concavity
    let concavity = alternateBlock ?
      convexBlock.getObjectByName("VertexGroups_4").geometry :
      concaveBlock.getObjectByName("VertexGroups_4").geometry;
    newBlock.getObjectByName("VertexGroups_4").geometry = concavity;
    alternateBlock = !alternateBlock;

    // Check foor overlaps
    let overlap = false;
    const newBox = new THREE.Box3().setFromObject(newBlock);
    let oldBlockRef = [];
    blocks.forEach(oldBlock => {
      const oldBox = new THREE.Box3().setFromObject(oldBlock);

      // shrink oldbox to avoid false positives
      oldBox.expandByScalar(-0.25);

      if (newBox.intersectsBox(oldBox)) {
        overlap = true;
        oldBlockRef.push(oldBlock);
      }
    });

    if (overlap) {
      oldBlockRef.forEach(oldBlock => {
        sceneRef.current.remove(oldBlock);
        blocks.splice(blocks.indexOf(oldBlock), 1);
      });
    }

    // add to scene
    if (!eraserMode) {
      sceneRef.current.add(newBlock);
      blocks.push(newBlock);
    

      // save to blocksMap
      let i = getBlockGridIndex(newBlock);
      let toSave = {
        "Block": newBlock.toJSON(),
        "Rotation": rotation,
        "Concavity": alternateBlock,
        "Type": blockType
      };
      blocksMap[i[0]][i[1]] = toSave;  
    }

    return sceneRef.current;
  };


  return (
    <>
      <div ref={containerRef} / >
    </>
  );
}



const getBlockGridIndex = (block) => {
  const gridBox = new THREE.Box3().setFromObject(grid);
  let s = gridBox.getSize(new THREE.Vector3());
  let x = Math.round(-block.position.x / (s.x / 10)) + 5;
  let y = Math.round(-block.position.z / (s.z / 10)) + 5;

  return [x, y];
}

