import React, { useState, useRef } from 'react';
import { View, TouchableOpacity, StyleSheet, Dimensions, } from 'react-native';
import { Camera } from 'expo-camera';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import DraggableImage from '../components/draggableimage';
import saveImageToGallery from '../components/saveimage';
import ViewShot from 'react-native-view-shot';

const CamOverlay = (img) => {
  const navigation = useNavigation();
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flashMode, setFlashMode] = useState(Camera.Constants.FlashMode.off);
  const viewShotRef = useRef(null);

  const takeScreenshot = async () => {
    if (!viewShotRef.current) {
      return;
    }

    try {
      const uri = await viewShotRef.current.capture();
      console.log('Screenshot URI:', uri);
      saveImageToGallery(uri);
    } catch (error) {
      console.error('Error taking screenshot:', error);
    }
  };

  // const takePicture = async () => {
  //   if (cameraRef) {
  //     const photo = await cameraRef.takePictureAsync();
  //     console.log('Photo:', photo);
  //   }
  // };

  const toggleCameraType = () => {
    setType(
      type === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };

  const toggleFlashMode = () => {
    setFlashMode(
      flashMode === Camera.Constants.FlashMode.off
        ? Camera.Constants.FlashMode.on
        : Camera.Constants.FlashMode.off
    );
  };

  const uri = img.route.params.temp;

  const brushPress = () => {
    navigation.navigate("OverlayEdit");
  }

  const backPress = () => {
    navigation.navigate("Home");
  }


  return (
    <View style={styles.container}>
        

        <TouchableOpacity onPress={backPress} style={styles.backarrow}>
          <Icon name="arrow-back" size={30} color="white" />
        </TouchableOpacity>

        <TouchableOpacity onPress={brushPress} style={styles.brushIcon}>
          <Icon name="brush-sharp" size={30} color="white" />
        </TouchableOpacity>


        <ViewShot ref={viewShotRef} style={{ flex: 1 }}>
          <Camera
            // ref={(ref) => setCameraRef(ref)}
            style={styles.camera}
            // type={type}
            // flashMode={flashMode}
          ></Camera>
          <View style={[styles.imagecontainer]}>
            <DraggableImage source={uri} style={styles.image} />
          </View>
        </ViewShot>

        
        <View style={styles.controls}>
          <TouchableOpacity style={styles.flashButton} onPress={toggleFlashMode}>
          <Icon
              name={flashMode === Camera.Constants.FlashMode.off ? 'flash-off' : 'flash'}
              size={30}
              color={flashMode === Camera.Constants.FlashMode.off ? 'white' : 'yellow'}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.takePictureButton} onPress={takeScreenshot}></TouchableOpacity>
          <TouchableOpacity style={styles.toggleButton} onPress={toggleCameraType}>
            <Icon
              name={type === Camera.Constants.Type.back ? 'camera-reverse' : 'camera'}
              size={30}
              color="white"
            />
          </TouchableOpacity>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backarrow: {
    position: 'absolute',
    top: 10, 
    left: 10,
    zIndex: 1,
  },
  brushIcon: {
    position: 'absolute',
    top: 10, 
    right: 10,
    zIndex: 1,
  },
  camera: {
    flex: 1,
    aspectRatio: 0.72,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0, 
    width: '100%',
    paddingVertical: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  takePictureButton: {
    backgroundColor: 'white',
    paddingHorizontal: 30,
    paddingVertical: 30,
    marginHorizontal: 30,
    marginVertical: 10,
    borderRadius: 50,
  },
  toggleButton: {
    paddingHorizontal: 30,
    paddingVertical: 30,
    marginHorizontal: 10,
    borderRadius: 50,
  },
  flashButton: {
    paddingHorizontal: 30,
    paddingVertical: 30,
    marginHorizontal: 10,
    borderRadius: 50,
  },
  imagecontainer: {
    position: "absolute",
    top: 0,
    left:0,
    height: '100%',
    width: '100%',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: '100%',
    width: '100%',
    // resizeMode: 'contain',
  },
});

export default CamOverlay;
