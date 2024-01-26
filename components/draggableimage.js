import React from 'react';
import { View, Image, StyleSheet, Animated, } from 'react-native';
import { PanGestureHandler, PinchGestureHandler, State } from 'react-native-gesture-handler';

class ImageEditor extends React.Component {
  constructor(props) {
    super(props);
    this.baseScale = new Animated.Value(1);
    this.pinchScale = new Animated.Value(1);
    this.scale = Animated.multiply(this.baseScale, this.pinchScale);
    this.translateX = new Animated.Value(0);
    this.translateY = new Animated.Value(0);
    this.lastScale = 1;
    this.lastX = 0;
    this.lastY = 0;
    this.onPinchGestureEvent = Animated.event(
      [{ nativeEvent: { scale: this.pinchScale } }],
      { useNativeDriver: true }
    );
    this.onPanGestureEvent = Animated.event(
      [
        {
          nativeEvent: {
            translationX: this.translateX,
            translationY: this.translateY,
          },
        },
      ],
      { useNativeDriver: true }
    );
  }

  onPinchHandlerStateChange = (event) => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      this.lastScale *= event.nativeEvent.scale;
      this.baseScale.setValue(this.lastScale);
      this.pinchScale.setValue(1);
    }
  };

  onPanHandlerStateChange = (event) => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      this.lastX += event.nativeEvent.translationX;
      this.lastY += event.nativeEvent.translationY;
      this.translateX.setOffset(this.lastX);
      this.translateX.setValue(0);
      this.translateY.setOffset(this.lastY);
      this.translateY.setValue(0);
    }
  };

  render() {
    const { source } = this.props;
    return (
      <View style={styles.container}>
        <PinchGestureHandler
          onGestureEvent={this.onPinchGestureEvent}
          onHandlerStateChange={this.onPinchHandlerStateChange}>
          <Animated.View style={styles.imageContainer}>
            <PanGestureHandler
              onGestureEvent={this.onPanGestureEvent}
              onHandlerStateChange={this.onPanHandlerStateChange}>
              <Animated.Image
                source={{uri: source}}
                style={[
                  styles.image,
                  {
                    transform: [
                      { scale: this.scale },
                      { translateX: this.translateX },
                      { translateY: this.translateY },
                    ],
                  },
                ]}
              />
            </PanGestureHandler>
          </Animated.View>
        </PinchGestureHandler>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    zIndex:2,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 200, // Initial width
    height: 200, // Initial height
    resizeMode: 'contain',
  },
});

export default ImageEditor;
