import React from 'react';
import {useState} from 'react';
import {Button, SafeAreaView, Text, View} from 'react-native';
import {SketchCanvas} from '@terrylinla/react-native-sketch-canvas';
import ColorPalette from 'react-native-color-palette';
import Slider from '@react-native-community/slider';

const App = () => {
  let [color, setColor] = useState('#ff5959');
  let [strokeWidth, setStrokeWidth] = useState(0);
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
          title={'Clear'}
          onPress={() => {
            canvasRef.clear();
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
              if (err) {
                console.warn(err);
                return;
              }
              var request = new XMLHttpRequest();
              request.open(
                'POST',
                'http://192.168.86.21:5000/api/v1/save',
                true,
              );
              request.setRequestHeader(
                'Content-Type',
                'text/plain charset=utf-8',
              );
              request.send(res);
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
        />
      </View>
      <ColorPalette
        onChange={(c) => setColor(c)}
        value={color}
        colors={['#ff5959', '#ffad5a', '#4f9da6', '#1a0841', '#00000000']}
        icon={<Text style={{color: 'white'}}>✔</Text>}
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
    </SafeAreaView>
  );
};

export default App;
export {App};
