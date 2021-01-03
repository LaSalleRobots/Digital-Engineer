import React from 'react';
import {useState} from 'react';
import {
  View,
  Modal,
  TouchableOpacity,
  Text,
  SafeAreaView,
  TextInput,
  Button,
  Image,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import NoteCardView from './NoteCardView';
import {useFeed, useSearchNotes} from '../api/hooks';
import {useQueryClient} from 'react-query';

const SearchView = () => {
  const queryClient = useQueryClient();
  const {isLoading, isError, data, error} = useFeed();
  const Cell = ({item, key}) => <NoteCardView {...item} key={key} />;

  const modes = [
    {icon: 'chevron-up', mode: 'normal'},
    {icon: 'chevron-down', mode: 'reversed'},
  ];
  let [mode, setMode] = useState(modes[1]);
  console.log(data);

  if (isError) {
    return (
      <SafeAreaView
        style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Icon name="warning-outline" size={80} />
        <Text style={{fontSize: 40}}>Error</Text>
        <Text style={{fontSize: 20}}>{JSON.stringify(error)}</Text>
      </SafeAreaView>
    );
  }

  let results = data != null ? data.feed : null;

  return (
    <SafeAreaView style={{flex: 1}}>
      <View
        style={{
          flexDirection: 'row',
          margin: 10,
          borderBottomWidth: 1,
          alignItems: 'center',
          flex: 1,
        }}>
        <Text
          style={{
            flex: 6,
            fontSize: 35,
            fontWeight: 'bold',
          }}>
          DigitalEngineer
        </Text>

        <TouchableOpacity
          style={{flex: 1}}
          onPress={() => {
            if (mode.mode == 'normal') {
              setMode(modes[1]);
            } else {
              setMode(modes[0]);
            }
            results.reverse();
          }}>
          <Icon name={mode.icon} size={35} />
        </TouchableOpacity>
      </View>
      <View
        style={{
          flex: 9,
        }}>
        {isLoading ? (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              flex: 1,
            }}>
            <Icon name="sync-circle-outline" size={80} />
            <Text
              style={{
                fontSize: 30,
              }}>
              Loading...
            </Text>
          </View>
        ) : (
          <FlatList
            data={results}
            keyExtractor={(e) => e.Id}
            renderItem={Cell}
            refreshing={isLoading}
            onRefresh={() => {
              queryClient.refetchQueries('feed');
            }}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default SearchView;
export {SearchView};
