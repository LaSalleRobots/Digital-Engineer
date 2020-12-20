import React from 'react';
import {useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  FlatList,
  Button,
} from 'react-native';

import {QueryClient, QueryClientProvider, useQueryClient} from 'react-query';

import {useAuthor, useMutateNote, useNotes} from '../api/hooks';
import {SuperSafeView} from './helpers';

const fmt = JSON.stringify;

const MakeNote = () => {
  const mutation = useMutateNote();

  const [name, changeName] = useState('');
  const [author, changeAuthor] = useState('');
  const [body, changeBody] = useState('');

  if (mutation.isLoading) {
    return <Text>Loading...</Text>;
  }
  if (mutation.isError) {
    console.error(mutation.error);
    return <Text>Error!: {fmt(mutation.error.message)}</Text>;
  }
  if (mutation.isSuccess) {
    return <Text>Success! {JSON.stringify(mutation.data)}</Text>;
  }

  return (
    <View>
      <Text style={{fontSize: 20, fontWeight: 'bold'}}>Make Note</Text>
      <TextInput
        placeholder={'Name'}
        value={name}
        onChange={(event) => {
          changeName(event.nativeEvent.text);
        }}
        style={{
          height: 40,
          borderColor: 'black',
          borderBottomWidth: 2,
          width: 300,
        }}
      />
      <TextInput
        placeholder={'Author'}
        value={author}
        onChange={(event) => {
          changeAuthor(event.nativeEvent.text);
        }}
        style={{
          height: 40,
          borderColor: 'black',
          borderBottomWidth: 2,
          width: 300,
        }}
      />
      <TextInput
        placeholder={'Body'}
        value={body}
        onChange={(event) => {
          changeBody(event.nativeEvent.text);
        }}
        style={{
          height: 40,
          borderColor: 'black',
          borderBottomWidth: 2,
          width: 300,
        }}
      />
      <Button
        title={'Submit'}
        onPress={() => {
          mutation.mutate({
            author: author,
            name: name,
            body: body,
          });
        }}
      />
    </View>
  );
};

const NoteItemView = ({name, date, authors}) => {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
      }}>
      <Text style={{flex: 1}}>{name}</Text>
      <Text style={{flex: 1}}>{date}</Text>
      <Text style={{flex: 2}}>
        {authors
          .map((t) => {
            return t.name;
          })
          .join(', ')}
      </Text>
    </View>
  );
};

const NoteListTest = () => {
  const queryClient = useQueryClient();
  const {isLoading, isError, data, error} = useNotes();
  const renderItem = ({item}) => (
    <NoteItemView name={item.name} date={item.date} authors={item.authors} />
  );
  if (isError) {
    return <Text>{fmt(error)}</Text>;
  }
  return isLoading ? (
    <Text>Loading...</Text>
  ) : (
    <>
      <Text style={{fontSize: 20, fontWeight: 'bold'}}>Notes</Text>
      <FlatList
        renderItem={renderItem}
        data={data?.notes}
        keyExtractor={(item) => item.Id}
        refreshing={isLoading}
        onRefresh={() => {
          queryClient.invalidateQueries('notes');
        }}
      />
    </>
  );
};

const Test = () => {
  const [name, changeName] = useState('Lukas');
  const [request, setRequest] = useState('Lukas');
  const {isLoading, isError, data, error} = useAuthor(request);
  return (
    <SuperSafeView
      safeStyle={{
        flex: 1,
        alignContent: 'stretch',
        margin: 15,
      }}>
      <Text style={{fontSize: 20, fontWeight: 'bold'}}>Test View</Text>
      {isLoading || isError ? (
        <Text>Loading...</Text>
      ) : (
        <>
          <Text>Name: {data?.author[0]?.name}</Text>
          <Text>Position: {data?.author[0]?.position}</Text>
          <Text>Notes: {data?.author[0]?.notes?.join(', ')}</Text>
          <Text>Error: {fmt(error)}</Text>
        </>
      )}
      <TextInput
        placeholder={'Search names...'}
        value={name}
        onSubmitEditing={(event) => setRequest(event.nativeEvent.text)}
        onChange={(text) => {
          changeName(text);
        }}
        style={{
          height: 40,
          borderColor: 'black',
          borderBottomWidth: 2,
          width: 300,
        }}
      />
      <NoteListTest />
      <MakeNote />
    </SuperSafeView>
  );
};

const App = () => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Test />
    </QueryClientProvider>
  );
};

export default App;
