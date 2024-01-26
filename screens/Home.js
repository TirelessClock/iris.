import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import {saveImage} from '../components/saveimage';
import { useNavigation } from '@react-navigation/native';


const Home = ({ navigation }) => {
  const openImagePicker = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
  
    if (!result.canceled) {
      // saveImage(result.assets[0].uri);
      const temp = result.assets[0].uri;
      // console.log(temp);
      setTimeout(() => {
        navigation.navigate('CamOverlay', {temp}); 
      }, 1);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        iris.
      </Text>
      <Text style={styles.text}>Pick an image and overlay it onto a live camera!
      </Text>
      <View style={styles.buttonContainer}>
        <Button
          style={styles.button}
          title="Pick from Gallery"
          onPress={openImagePicker}
        />
        <View style={{ marginTop: 20 }} />
        <Button
          style={styles.button}
          title="Take a Picture"
          onPress={() => navigation.navigate('CameraScreen')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    paddingHorizontal: 20,
  },
  text: {
    marginBottom: 30,
    fontSize: 40
  },
  title: {
    fontSize: 80,
    fontWeight: "bold"
  },
  buttonContainer: {
    width: '100%',
  },
  button: {
    
  },
});

export default Home;
