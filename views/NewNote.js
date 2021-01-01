import React from 'react';
import {useState, useRef} from 'react';
import {
  View,
  Modal,
  TouchableOpacity,
  Text,
  SafeAreaView,
  TextInput,
  Button,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Camera} from './CameraView';
import {SketchCanvas} from '@terrylinla/react-native-sketch-canvas';
import {DrawingView} from './DrawingView';
import {useMutateNote} from '../api/hooks';

const NewNote = ({mutation}) => {
  let [camera, setCamera] = useState(null);
  let [base64Img, setBase64Img] = useState('');
  let [base64Drawing, setBase64Drawing] = useState('');
  let [cameraVisible, setCameraVisible] = useState(false);
  let [drawingVisible, setDrawingVisible] = useState(false);

  let [noteTitle, setNoteTitle] = useState('');
  let [noteAuthor, setNoteAuthor] = useState('');
  let [noteBody, setNoteBody] = useState('');

  return (
    <View
      style={{
        flex: 1,
        margin: 15,
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          borderBottomWidth: 1,
          paddingBottom: 10,
          marginBottom: 10,
        }}>
        <View>
          <TextInput
            placeholder={'New Note'}
            fontSize={30}
            autoFocus={!true}
            style={{fontWeight: 'bold'}}
            placeholderTextColor={'grey'}
            onChange={(e) => {
              setNoteTitle(e.nativeEvent.text);
            }}
            value={noteTitle}
          />
          <TextInput
            placeholder={'Author'}
            fontSize={20}
            placeholderTextColor={'grey'}
            onChange={(e) => {
              setNoteAuthor(e.nativeEvent.text);
            }}
            value={noteAuthor}
          />
        </View>
        <TouchableOpacity
          onPress={() => {
            if (noteAuthor !== '' && noteTitle !== '') {
              mutation.mutate({
                author: noteAuthor,
                body: noteBody,
                name: noteTitle,
                photo: base64Img,
                drawing: base64Drawing,
              });
            }
          }}>
          <Icon name={'cloud-upload-outline'} size={40} color={'#83b2d0'} />
        </TouchableOpacity>
      </View>

      <View
        style={{
          backgroundColor: '#fefefe',
          borderRadius: 10,
          padding: 10,
        }}>
        <TextInput
          placeholder={'Body'}
          fontSize={20}
          multiline={true}
          placeholderTextColor={'grey'}
          style={{
            minHeight: 100,
          }}
          onChange={(e) => {
            setNoteBody(e.nativeEvent.text);
          }}
          value={noteBody}
        />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={() => {
              setCameraVisible(true);
            }}
            style={{margin: 5}}>
            <Icon name={'camera-outline'} size={30} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setDrawingVisible(true);
            }}
            style={{margin: 5}}>
            <Icon name={'brush-outline'} size={25} />
          </TouchableOpacity>
          <Image
            source={{
              uri: `data:image/png;base64,${base64Img}`,
            }}
            style={{
              height: 50,
              width: 50,
              margin: 5,
            }}
          />
          <Image
            source={{
              uri: `data:image/png;base64,${base64Drawing}`,
            }}
            style={{
              height: 50,
              width: 50,
              margin: 5,
            }}
          />
        </View>
      </View>

      <Modal
        visible={cameraVisible}
        style={{
          elevation: 5,
          flex: 1,
        }}
        animationType="slide">
        <Camera
          setRef={setCamera}
          onPress={() => {
            camera
              .takePictureAsync({
                quality: 0.5,
                base64: true,
              })
              .then((data) => {
                setBase64Img(data.base64);
              })
              .then(() => {
                setCameraVisible(false);
              });
          }}
        />
        <Button
          title={'Dismiss'}
          onPress={() => {
            setCameraVisible(false);
          }}
          style={{
            flex: 1,
          }}
        />
      </Modal>

      <Modal visible={drawingVisible} animationType="slide">
        <DrawingView
          onSave={(err, res) => {
            if (err != null) {
              console.warn(err);
              return;
            }
            setBase64Drawing(res);
            setDrawingVisible(false);
          }}
        />
        <Button
          title={'Dismiss'}
          onPress={() => {
            setDrawingVisible(false);
          }}
          style={{
            flex: 1,
          }}
        />
      </Modal>
    </View>
  );
};

const App = () => {
  let mutation = useMutateNote();
  if (mutation.isSuccess) {
    mutation.reset();
  }
  return (
    <SafeAreaView style={{flex: 1}}>
      {mutation.isLoading ? (
        <Text>Loading...</Text>
      ) : (
        <NewNote mutation={mutation} />
      )}
    </SafeAreaView>
  );
};

export {App, NewNote};
