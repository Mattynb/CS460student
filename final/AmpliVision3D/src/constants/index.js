
/** Information about block blender hierarchy:
 * 
 * AmpliBlock ( Three.js Object3D )
 *    - VertexGroups   ( Pin1 )
 *    - VertexGroups_1 ( Pin2 )
 *    - VertexGroups_2 ( Pin3 )
 *    - VertexGroups_3 ( Pin4 )
 *    - VertexGroups_4 ( body )
 *    - VertexGroups_5 ( pad  )
 *    - VertexGroups_6 ( test strip )
 * 
*/


const COLOR_MAP = {
    // Sample Block
    1: [
      [0, 0, 1], // Pin1
      [0, 0, 1], // Pin2
      [1, 0, 0], // Pin3
      [0, 1, 0], // Pin4
      true,      // Pad visible
    ],
  
    // Test Block 1 
    2: [
      [0, 0, 1], 
      [0, 0, 1],
      [0, 0, 1],
      [1, 0, 0],
      false,
    ],
  
    // Test Block 2
    3: [
      [1, 0, 0],
      [1, 0, 0],
      [1, 0, 0],
      [0, 0, 1],
      false,
    ],
  
    // Test Block 3
    4: [
      [0, 1, 0],
      [0, 1, 0],
      [0, 1, 0],
      [1, 0, 0],
      false,
    ],
  
    // Control Block
    5:  [
      [0, 0, 1],
      [0, 0, 1],
      [0, 0, 1],
      [0, 1, 0],
      false,
    ],
  
    // Wick Block 
    6:  [
      [1, 0, 0],
      [1, 0, 0],
      [0, 1, 0],
      [1, 0, 0],
      true,
    ],
};
  



export { COLOR_MAP };