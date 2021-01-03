import React from 'react';
import {View, Text, SafeAreaView, Image} from 'react-native';

const NoteCardView = ({name, authors, body, photo, drawing, key}) => {
  return (
    <View
      style={{
        borderRadius: 15,
        padding: 10,
        margin: 10,
        backgroundColor: 'white',
        flexGrow: 1,
        flex: 1,
      }}
      key={key}>
      <Text
        style={{
          fontSize: 36,
          fontWeight: 'bold',
        }}>
        {name}
      </Text>
      <View
        style={{
          flexDirection: 'row',
          marginBottom: 10,
        }}>
        {authors != undefined
          ? authors.map((a, i, arr) => (
              <Text
                style={{
                  margin: 2,
                  fontSize: 15,
                }}>
                {a.name + (i < arr.length - 1 ? ', ' : '')}
              </Text>
            ))
          : null}
      </View>
      <Text
        style={{
          marginBottom: 15,
        }}>
        {body}
      </Text>
      <View
        style={{
          flexDirection: 'row',
        }}>
        {drawing != undefined ? (
          <Image
            source={{
              uri: drawing,
            }}
            style={{
              width: 100,
              height: 100,
              borderRadius: 10,
              marginTop: 5,
              marginBottom: 5,
              marginRight: 5,
            }}
          />
        ) : null}
        {photo != undefined ? (
          <Image
            source={{
              uri: photo,
            }}
            style={{
              width: 100,
              height: 100,
              borderRadius: 10,
              marginTop: 5,
              marginBottom: 5,
              marginRight: 5,
            }}
          />
        ) : null}
      </View>
    </View>
  );
};

const App = () => {
  return (
    <SafeAreaView
      style={{
        backgroundColor: '#fefefe',
      }}>
      <NoteCardView
        name="Test Note"
        authors={[{name: 'Lukas Werner'}, {name: 'Sam Luft'}]}
        body="Begin testing ... jklsadfj lafsdsljkas fdafsdljksdfljk afsdlkjasdfljk asfdasdflsadflkj asdfkjsadfkjasf kjbgakhjagkj  asgl;sag  ag ;lhasg ljsag lsdg ;klags  ljkags jl ga lj ag aggaags ;l l ags l asg l ags  "
      />
      <NoteCardView
        name="Another Note"
        authors={[{name: 'Lukas Werner'}]}
        body="This is boring..."
      />
    </SafeAreaView>
  );
};

export default NoteCardView;
export {NoteCardView, App};
