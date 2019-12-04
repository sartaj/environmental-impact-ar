'use strict';

import React, { Component } from 'react';

import {
  ViroARScene,
  ViroConstants,
  Viro3DObject,
  ViroAmbientLight
} from 'react-viro';

var createReactClass = require('create-react-class');

var WasteRealitySceneAR = createReactClass({

  render: function() {
    return (
      <ViroARScene onTrackingUpdated={this._onInitialized} >
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
  }
});

module.exports = WasteRealitySceneAR;