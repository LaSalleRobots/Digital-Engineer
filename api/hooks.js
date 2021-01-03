import {useQuery, useMutation} from 'react-query';

import {request, gql} from 'graphql-request';
import {useState} from 'react';
import {SERVER} from './endpoint';

function useAuthor(name) {
  return useQuery(['author', name], async () => {
    const query = gql`
      query {
        author(name: "${String(name)}") {
          name
          position
          notes 
        }
      }
    `;
    try {
      const resp = await request('http://192.168.86.247:5000/graphql', query);
      return resp;
    } catch (error) {
      console.warn(error);
      throw error;
    }
  });
}

function useSearchNotes(term) {
  return useQuery(['searchNotes', term], async () => {
    const query = gql`
      query searchQuery($term: String!) {
        search(query: $term) {
          notes {
            Id
            name
            body
            photo
            drawing
            authors {
              name
            }
          }
        }
      }
    `;
    const variables = {
      term: term,
    };
    try {
      const resp = await request(
        'http://192.168.86.247:5000/graphql',
        query,
        variables,
      );
      return resp;
    } catch (error) {
      console.warn(error);
      throw error;
    }
  });
}

function useNotes() {
  return useQuery('notes', async () => {
    const query = gql`
      query {
        notes {
          Id
          name
          body
          photo
          drawing
          authors {
            name
          }
        }
      }
    `;
    try {
      const resp = await request('http://192.168.86.247:5000/graphql', query);
      return resp;
    } catch (error) {
      console.warn(error);
      throw error;
    }
  });
}

function useFeed() {
  return useQuery('feed', async () => {
    const query = gql`
      query {
        feed {
          Id
          name
          body
          photo
          drawing
          authors {
            name
          }
        }
      }
    `;
    try {
      const resp = await request('http://192.168.86.247:5000/graphql', query);
      return resp;
    } catch (error) {
      console.warn(error);
      throw error;
    }
  });
}

function useMutateNote() {
  return useMutation(async (newNote) => {
    //console.log(JSON.stringify(newNote));

    if (newNote.photo != '' && newNote.drawing != '') {
      const query = gql`
        mutation Images($photo: String, $drawing: String) {
          note(
            author: "${String(newNote.author)}"
            noteData: {
              name: "${String(newNote.name)}"
              body: "${String(newNote.body)}"
              photo: $photo
              drawing: $drawing
            }
          ) {
            ok
          }
        }
      `;
      const variables = {
        photo: `data:image/png;base64,${newNote.photo}`,
        drawing: `data:image/png;base64,${newNote.drawing}`,
      };
      try {
        const resp = await request(
          'http://192.168.86.247:5000/graphql',
          query,
          variables,
        );
        return resp;
      } catch (error) {
        console.warn(error);
        throw error;
      }
    } else if (newNote.photo != '') {
      const query = gql`
        mutation Images($photo: String) {
          note(
            author: "${String(newNote.author)}"
            noteData: {
              name: "${String(newNote.name)}"
              body: "${String(newNote.body)}"
              photo: $photo
            }
          ) {
            ok
          }
        }
      `;
      const variables = {
        photo: `data:image/png;base64,${newNote.photo}`,
      };
      try {
        const resp = await request(
          'http://192.168.86.247:5000/graphql',
          query,
          variables,
        );
        return resp;
      } catch (error) {
        console.warn(error);
        throw error;
      }
    } else if (newNote.drawing != '') {
      const query = gql`
        mutation Images($drawing: String) {
          note(author: "${String(newNote.author)}", 
          noteData: {
            name: "${String(newNote.name)}", 
            body: "${String(newNote.body)}", 
            drawing: $drawing}) {
            ok
          }
      }`;
      const variables = {
        drawing: `data:image/png;base64,${String(newNote.drawing)}`,
      };
      try {
        const resp = await request(
          'http://192.168.86.247:5000/graphql',
          query,
          variables,
        );
        return resp;
      } catch (error) {
        console.warn(error);
        throw error;
      }
    } else {
      const query = gql`
          mutation {
            note(author: "${String(newNote.author)}", 
            noteData: {
              name: "${String(newNote.name)}", 
              body: "${String(newNote.body)}"}) {
              ok
            }
        }`;
      try {
        const resp = await request('http://192.168.86.247:5000/graphql', query);
        return resp;
      } catch (error) {
        console.warn(error);
        throw error;
      }
    }
  });
}

export {useAuthor, useNotes, useMutateNote, useFeed, useSearchNotes};
