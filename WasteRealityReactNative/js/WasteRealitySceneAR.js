'use strict';

import React, { Component } from 'react';

import {
  ViroARScene,
  ViroConstants,
  Viro3DObject,
  ViroAmbientLight
} from 'react-viro';

export default class WasteRealitySceneAR extends Component {

  constructor() {
    super();

    // Set initial state here
    this.state = {
      text : "Initializing AR..."
    };

    // bind 'this' to functions
    this._onInitialized = this._onInitialized.bind(this);
  }

  render() {
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

  _onInitialized(state, reason) {
    if (state == ViroConstants.TRACKING_NORMAL) {
      this.setState({
        text : "Waste Reality"
      });
    } else if (state == ViroConstants.TRACKING_NONE) {
      // Handle loss of tracking
    }
  }
}

module.exports = WasteRealitySceneAR;
