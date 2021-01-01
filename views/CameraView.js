import React from 'react';
import {useState} from 'react';
import {View, TouchableOpacity, Text, Pressable, Button} from 'react-native';
import {RNCamera} from 'react-native-camera';
import Icon from 'react-native-vector-icons/Ionicons';
import {PinchGestureHandler} from 'react-native-gesture-handler';

const CameraButton = ({onPress, style, onPressIn, onTouchEnd}) => {
  let [innerButton, setInnerButton] = useState({
    size: 45,
    color: 'white',
  });
  let parentStyle = {
    borderColor: innerButton.color,
    borderRadius: 100,
    borderWidth: 5,
    margin: 10,
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    ...style,
  };
  return (
    <View style={parentStyle}>
      <Pressable
        onPressIn={() => {
          onPressIn != undefined ? onPressIn() : null;
          setInnerButton({
            size: 40,
            color: '#b2b2b2',
          });
        }}
        onTouchEnd={() => {
          onTouchEnd != undefined ? onTouchEnd() : null;
          setInnerButton({
            size: 45,
            color: 'white',
          });
        }}
        onPress={onPress}>
        <View
          style={{
            backgroundColor: innerButton.color,
            margin: 10,
            borderRadius: 100,
            width: innerButton.size,
            height: innerButton.size,
          }}>
          <Text></Text>
        </View>
      </Pressable>
    </View>
  );
};

const Camera = ({setRef, onPress}) => {
  let [flash, setFlash] = useState(false);
  let [snaping, setSnapping] = useState(false);
  let [cameraView, setCameraView] = useState(RNCamera.Constants.Type.back);
  return (
    <View
      style={{
        flex: 1,
      }}>
      <RNCamera
        style={{flex: 1, alignItems: 'center'}}
        ref={(ref) => {
          setRef(ref);
        }}
        flashMode={
          flash
            ? RNCamera.Constants.FlashMode.torch
            : RNCamera.Constants.FlashMode.off
        }
        captureAudio={false} //important so it doesent crash
        type={cameraView}
      />
      {snaping ? (
        <View
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            alignItems: 'center',
            backgroundColor: 'black',
          }}></View>
      ) : null}
      <View
        style={{
          position: 'absolute',
          bottom: 5,
          left: 0,
          right: 0,
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        <TouchableOpacity
          onPress={() => {
            if (cameraView == RNCamera.Constants.Type.back) {
              setCameraView(RNCamera.Constants.Type.front);
            } else {
              setCameraView(RNCamera.Constants.Type.back);
            }
          }}>
          <Icon size={35} name={'sync'} color={'white'} />
        </TouchableOpacity>
        <CameraButton
          onPress={onPress}
          onPressIn={() => {
            setSnapping(true);
          }}
          onTouchEnd={() => {
            setSnapping(false);
          }}
        />
        <TouchableOpacity
          onPress={() => {
            setFlash(!flash);
          }}>
          <Icon
            name={flash ? 'flash-outline' : 'flash-off-outline'}
            color={'white'}
            size={35}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const CameraTester = () => {
  let [camera, setCamera] = useState(null);
  let [_, setPhotoPath] = useState('');
  return (
    <Camera
      setRef={setCamera}
      onPress={() => {
        camera != null
          ? camera
              .takePictureAsync({
                quality: 0.5,
                base64: true,
              })
              .then((data) => {
                setPhotoPath(data.uri.replace('file://', ''));
              })
          : null;
      }}
    />
  );
};

export default Camera;
export {Camera, CameraTester};
