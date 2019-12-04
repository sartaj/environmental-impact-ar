'use strict';

import React, { Component } from 'react';
import {StyleSheet} from 'react-native';

import {
  ViroARScene,
  ViroAmbientLight,
  ViroText,
  ViroMaterials,
  ViroBox,
  ViroQuad,
  ViroController,
  ViroNode,
  ViroARPlane,
  ViroFlexView,
  ViroLightingEnvironment

} from 'react-viro';

var createReactClass = require('create-react-class');

var ARPhysicsAnchor = createReactClass({

  getInitialState() {
    return {
      foundPlane:false,
      planePosition:[0,0,0],
      planeRotation:[0,0,0],
      totalCubes:0
    };
  },

  render: function() {
    return (
      <ViroARScene physicsWorld={{ gravity:[0,-9.81,0]}} ref={(component)=>{this.sceneRef = component}}>
        <ViroAmbientLight color={"#FFFFFF"} intensity={10}/>
        <ViroLightingEnvironment source={require('./res/ibl_envr.hdr')}/>

        {/* ViroARPlaneSelector to detect for placing our "floor" plane and physics scene. */}
        <ViroARPlane
          key={"firstPlane"}
          ref={(component)=>{this.arPlaneRef = component}}
          onAnchorFound={this._onAnchorFound}>

          {/* Create our physics group node example, at the location of user-selected plane */}
          {this._getPhysicsGroup()}

        </ViroARPlane>
      </ViroARScene>
    );
  },

  _onAnchorFound(anchorMap){
    if (anchorMap.type != "plane"){
      return;
    }

    var worldCenterPosition = [anchorMap.position[0] + anchorMap.center[0],
                               anchorMap.position[1] + anchorMap.center[1],
                               anchorMap.position[2] + anchorMap.center[2]];
    this.arPlaneRef.setNativeProps({"pauseUpdates":true});
    this.setState({foundPlane:true, planePosition:worldCenterPosition, planeRotation:anchorMap.rotation});
  },

  _getPhysicsGroup(){
    if (!this.state.foundPlane){
      return;
    }

    return (
      <ViroNode position={this.state.planePosition}>

        {/* Create menu button */}
        {this._getHUDControl()}

        {/* Bind controls for interacting with the scene.*/}
        <ViroController ref={(component)=>{this.controllerRef = component}} />

        {/* Render cube object in the scene, if any.*/}
        {this._renderCubes()}

        {/* Quad representing the ground. */}
        <ViroQuad position={[0,0,0]} scale={[6.0, 8.0, 1.0]} rotation={[-90, 0, 0]} physicsBody={{ type:'Static', restitution:0.75 }}
          ref={(component)=>{this.floorSurface = component}} onCollision={this._onFloorCollide} materials={'ground'}/>
      </ViroNode>
    );
  },

  _getHUDControl(){
    return (
      <ViroNode position={[0, 1.5, -7.75]} transformBehaviors={["billboardX", "billboardY"]}>
        <ViroFlexView style={{flexDirection: 'column'}} width={1} height={0.8} materials="hud_text_bg" position={[1,0,0]} onClick={this._addCube}>
          <ViroText style={styles.hud_text}  text={"Add Box"} />
        </ViroFlexView>
      </ViroNode>
    )
  },

  _onFloorCollide(collidedTag, collidedPoint, collidedNormal){
    console.log("Viro box has collided on the " + collidedTag);
    if (collidedTag == "BallTag"){
      this.floorSurface.setNativeProps({materials:["ground_hit"]});
    }
  },

  _renderCubes(){
    var views = [];
    for (var i = 0; i < this.state.totalCubes; i ++){
      var cubeKey = "CubeTag_" + i;
      views.push((<ViroBox scale={[0.2, 0.2, 0.2]}
                        position={[-0.5, 1, -1.3]}
                        rotation={[0, 0, 0]}
                        physicsBody={{type:'Dynamic', mass:25, enabled:true, useGravity:true, restitution:0.35, friction:0.75}}
                        materials="cube_color"
                        key={cubeKey}
                        onDrag={()=>{}}
                        />));
    }
    return views;
  },

  _addCube(){
    this.setState({totalCubes:this.state.totalCubes + 1});
  },
});

var styles = StyleSheet.create({
  hud_text: {
       fontSize: 18,
       fontFamily: 'Arial',
       color: '#0000ff',
       flex: 1,
  },
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 50,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});

ViroMaterials.createMaterials({
  hud_text_bg: {
    diffuseColor: "#00ffff"
  },
  ground:{
    diffuseColor: "#007CB6E6"
  },
  ground_hit:{
    diffuseColor: "#008141E6"
  },
  cube_color:{
    diffuseColor: "#0021cbE6"
  }
 });

module.exports = ARPhysicsAnchor;
