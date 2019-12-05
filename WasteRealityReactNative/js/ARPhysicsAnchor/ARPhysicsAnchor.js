'use strict';

import React, { useState, useRef } from 'react';
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

export default function ARPhysicsAnchor() {
  const [foundPlane, setFoundPlane] = useState(false)
  const [planePosition, setPlanePosition] = useState([0,0,0])
  const [planeRotation, setPlaneRotation] = useState([0,0,0])
  const [totalCubes, setTotalCubes] = useState(0)
  let   arPlaneRef = useRef()
  let   floorSurface= useRef()


  return (
    <ViroARScene physicsWorld={{ gravity:[0,-9.81,0]}}>
      <ViroAmbientLight color={"#FFFFFF"} intensity={10}/>
      <ViroLightingEnvironment source={require('./res/ibl_envr.hdr')}/>

      {/* ViroARPlaneSelector to detect for placing our "floor" plane and physics scene. */}
      <ViroARPlane
        key={"firstPlane"}
        ref={(component)=>{arPlaneRef = component}}
        onAnchorFound={_onAnchorFound}>

        {/* Create our physics group node example, at the location of user-selected plane */}
        {_getPhysicsGroup()}

      </ViroARPlane>
    </ViroARScene>
  );

  function _onAnchorFound(anchorMap){
    if (anchorMap.type != "plane"){
      return;
    }

    var worldCenterPosition = [anchorMap.position[0] + anchorMap.center[0],
                               anchorMap.position[1] + anchorMap.center[1],
                               anchorMap.position[2] + anchorMap.center[2]];
    arPlaneRef.setNativeProps({"pauseUpdates":true});
    setFoundPlane(true);
    setPlanePosition(worldCenterPosition);
    setPlaneRotation(anchorMap.rotation);
  }

  function _getPhysicsGroup() {
    if (!foundPlane){
      return;
    }

    return (
      <ViroNode position={planePosition}>

        {/* Create menu button */}
        {_getHUDControl()}

        {/* Bind controls for interacting with the scene.*/}
        <ViroController/>

        {/* Render cube object in the scene, if any.*/}
        {_renderCubes()}

        {/* Quad representing the ground. */}
        <ViroQuad position={[0,0,0]} scale={[6.0, 8.0, 1.0]} rotation={[-90, 0, 0]} physicsBody={{ type:'Static', restitution:0.75 }}
          ref={(component)=>{floorSurface = component}} onCollision={_onFloorCollide} materials={'ground'}/>
      </ViroNode>
    );
  }
  function _getHUDControl(){
    return (
      <ViroNode position={[0, 1.5, -7.75]} transformBehaviors={["billboardX", "billboardY"]}>
        <ViroFlexView style={{flexDirection: 'column'}} width={1} height={0.8} materials="hud_text_bg" position={[1,1,0]} onClick={_addCube}>
          <ViroText style={styles.hud_text}  text={"Add Box"} />
        </ViroFlexView>
      </ViroNode>
    )
  }

  function _onFloorCollide(collidedTag, collidedPoint, collidedNormal){
    console.log("Viro box has collided on the " + collidedTag);
    if (collidedTag == "BallTag"){
      floorSurface.setNativeProps({materials:["ground_hit"]});
    }
  }

  function _renderCubes(){
    var views = [];
    for (var i = 0; i < totalCubes; i ++){
      var cubeKey = "CubeTag_" + i;
      views.push((<ViroBox scale={[0.3, 0.3, 0.3]}
                        position={[-0.5, 1, -1.3]}
                        rotation={[0, 0, 0]}
                        physicsBody={{type:'Dynamic', mass:25, enabled:true, useGravity:true, restitution:0.35, friction:0.75}}
                        materials="cube_color"
                        key={cubeKey}
                        onDrag={()=>{}}
                        />));
    }
    return views;
  }

  function _addCube(){
    setTotalCubes(totalCubes + 1);
  }
}

var styles = StyleSheet.create({
  hud_text: {
       fontSize: 18,
       fontFamily: 'Arial',
       color: '#0000ff',
       flex: 1,
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
