import * as MediaLibrary from 'expo-media-library';

export default saveImageToGallery = async (uri) => {
  try {
    const { status } = await MediaLibrary.requestPermissionsAsync();

    if (status === 'granted') {
      const asset = await MediaLibrary.createAssetAsync(uri);
      await MediaLibrary.createAlbumAsync('YourAlbumName', asset, false);
      console.log('Image saved to gallery');
    } else {
      console.log('Permission to access media library not granted');
    }
  } catch (error) {
    console.error('Error saving image to gallery:', error);
  }
};
