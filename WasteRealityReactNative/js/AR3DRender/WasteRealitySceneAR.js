'use strict';

import React from 'react';

import {
  ViroARScene,
  Viro3DObject,
  ViroAmbientLight
} from 'react-viro';

export default function WasteRealitySceneAR() {
  return (
    <ViroARScene>
      {/* show garbage image */}
      <ViroAmbientLight color="#ffffff" />
      <Viro3DObject source={require('./res/garbage_bag_obj.obj')}
        resources={[require('./res/garbage_bag_obj.mtl'),
                require('./res/bag.jpg')]}
                position={[0.0, 0.0, -10]}
                scale={[0.1, 0.1, 0.1]}
                type="OBJ"
                />
    </ViroARScene>
  );
};

module.exports = WasteRealitySceneAR;