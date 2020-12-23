import React from 'react';
import {useState} from 'react';
import {RNCamera} from 'react-native-camera';

const App = () => {
  let [camera, setCamera] = useState(null);
  return (
    <RNCamera
      style={{flex: 1, alignItems: 'center'}}
      ref={(ref) => setCamera(ref)}
      captureAudio={false} //important so it doesent crash
    />
  );
};

export default App;
export {App};
