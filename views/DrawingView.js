import React from 'react';
import {useState} from 'react';
import {
  Button,
  SafeAreaView,
  Text,
  View,
  Modal,
  TouchableOpacity,
} from 'react-native';
import {SketchCanvas} from '@terrylinla/react-native-sketch-canvas';
import {Camera} from './CameraView';
import ColorPalette from 'react-native-color-palette';
import Slider from '@react-native-community/slider';
import Icon from 'react-native-vector-icons/Ionicons';

const DrawingView = ({onSave}) => {
  let [color, setColor] = useState('#ff5959');
  let [strokeWidth, setStrokeWidth] = useState(10);
  let [camera, setCamera] = useState(null);
  let [photoPath, setPhotoPath] = useState('');
  let [showCamera, setShowCamera] = useState(false);
  let [canvasRef, setCanvasRef] = useState(null);
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
      }}>
      <View
        style={{
          flexDirection: 'row',
        }}>
        <Button
          title={'Take Photo'}
          onPress={() => {
            setShowCamera(true);
          }}
        />
        <Button
          title={'Clear'}
          onPress={() => {
            canvasRef.clear();
            setPhotoPath('null');
          }}
        />
        <Button
          title={'Undo'}
          onPress={() => {
            canvasRef.undo();
          }}
        />
        <Button
          title={'Save'}
          onPress={() => {
            canvasRef.getBase64('png', false, true, true, true, (err, res) => {
              onSave != undefined ? onSave(err, res) : null;
            });
          }}
        />
      </View>
      <View style={{flex: 1, flexDirection: 'row'}}>
        <SketchCanvas
          ref={(ref) => {
            setCanvasRef(ref);
          }}
          style={{flex: 1}}
          strokeColor={color}
          strokeWidth={strokeWidth}
          localSourceImage={{
            filename: photoPath,
            directory: null,
            mode: 'AspectFit',
          }}
        />
      </View>
      <ColorPalette
        onChange={(c) => setColor(c)}
        value={color}
        colors={['#ff5959', '#ffad5a', '#4f9da6', '#1a0841', '#00000000']}
        icon={<Icon name={'checkmark'} size={25} color={'black'} />}
        title={''}
      />
      <View
        style={{
          flexDirection: 'row',
        }}>
        <Slider
          value={strokeWidth}
          onValueChange={(e) => {
            setStrokeWidth(e);
          }}
          style={{width: 200, height: 40}}
          minimumValue={0}
          maximumValue={30}
          minimumTrackTintColor="#4f9da6"
          maximumTrackTintColor="#1a0841"
        />
      </View>
      <Modal
        visible={showCamera}
        style={{
          elevation: 10,
        }}>
        <Camera
          setRef={setCamera}
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
                setShowCamera(false);
              });
          }}
        />
        <Button
          title={'Dismiss'}
          onPress={() => {
            setShowCamera(false);
          }}
          style={{
            flex: 1,
          }}
        />
      </Modal>
    </SafeAreaView>
  );
};

export default DrawingView;
export {DrawingView};
