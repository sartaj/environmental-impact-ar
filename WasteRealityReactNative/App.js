/**
 * Copyright (c) 2015-present, Viro Media, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */
'use strict';

import React, { Component } from 'react';

import {
  AppRegistry,
} from 'react-native';

import {
  ViroVRSceneNavigator,
  ViroARSceneNavigator,
} from 'react-viro';

/*
 * TODO: Add your API key below!!
 */
var apiKey = "YOUR_API_KEY_HERE";

var arScenes = {
  'AR3DRender': require('./js/AR3DRender/WasteRealitySceneAR.js'),
  'ARPhysicsAnchor': require('./js/ARPhysicsAnchor/ARPhysicsAnchor.js'),
}

export default class ViroCodeSamplesSceneNavigator extends Component {
  constructor() {
    super();
  }

  render()  {
    return (
      <ViroARSceneNavigator
        initialScene={{
          scene: arScenes['AR3DRender'],
        }}
        apiKey={apiKey} />
    );
  }
}

module.exports = ViroCodeSamplesSceneNavigator;
