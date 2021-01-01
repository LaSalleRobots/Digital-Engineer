import React from 'react';
import {useState} from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {RNCamera} from 'react-native-camera';
import Icon from 'react-native-vector-icons/Ionicons';
import {SketchCanvas} from '@terrylinla/react-native-sketch-canvas';

const App = () => {
  let [camera, setCamera] = useState(null);
  let [photoPath, setPhotoPath] = useState('');
  let [color, setColor] = useState('#ff5959');
  let [strokeWidth, setStrokeWidth] = useState(10);
  let [canvasRef, setCanvasRef] = useState(null);
  return (
    <View
      style={{
        flex: 1,
      }}>
      <View style={{flex: 1}}>
        <TouchableOpacity
          style={{
            flex: 1,
          }}
          onPress={() => {
            camera
              .takePictureAsync({
                quality: 0.5,
                base64: true,
              })
              .then((data) => {
                setPhotoPath(data.uri.replace('file://', ''));
              })
              .then(() => {
                canvasRef.clear();
              });
          }}>
          <RNCamera
            style={{flex: 1, alignItems: 'center'}}
            ref={(ref) => setCamera(ref)}
            captureAudio={false} //important so it doesent crash
          />
        </TouchableOpacity>
        <SketchCanvas
          localSourceImage={{
            filename: photoPath,
            directory: null,
            mode: 'AspectFit',
          }}
          ref={(ref) => {
            setCanvasRef(ref);
          }}
          style={{flex: 1}}
          strokeColor={color}
          strokeWidth={strokeWidth}
        />
      </View>
    </View>
  );
};

export default App;
export {App};
