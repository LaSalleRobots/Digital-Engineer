import React from 'react';
import {useState} from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {RNCamera} from 'react-native-camera';
import Icon from 'react-native-vector-icons/Ionicons';

const App = () => {
  let [camera, setCamera] = useState(null);
  let [photoPath, setPhotoPath] = useState('blank');
  return (
    <View
      style={{
        flex: 1,
      }}>
      <RNCamera
        style={{flex: 9, alignItems: 'center'}}
        ref={(ref) => setCamera(ref)}
        captureAudio={false} //important so it doesent crash
      />
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          backgroundColor: 'black',
        }}>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
          }}
          onPress={() => {
            camera
              .takePictureAsync({
                quality: 0.5,
                base64: true,
              })
              .then((data) => {
                setPhotoPath(data.uri.replace('file://', ''));
              });
          }}>
          <Icon name={'camera'} size={60} color={'white'} />
          <Text style={{color: 'white'}}>{photoPath}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default App;
export {App};
