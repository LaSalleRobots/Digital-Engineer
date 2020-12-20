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
      const resp = await request('http://localhost:5000/graphql', query);
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
          date
          authors {
            name
          }
        }
      }
    `;
    try {
      const resp = await request('http://localhost:5000/graphql', query);
      return resp;
    } catch (error) {
      console.warn(error);
      throw error;
    }
  });
}

function useMutateNote() {
  return useMutation(async (newNote) => {
    console.log(JSON.stringify(newNote));
    const query = gql`
      mutation {
        note(
          author: "${String(newNote.author)}"
          noteData: {body: "${String(newNote.body)}", name: "${String(
      newNote.name,
    )}"}
        ) {
          ok
        }
      }
    `;
    try {
      const resp = await request('http://localhost:5000/graphql', query);
      return resp;
    } catch (error) {
      console.warn(error);
      throw error;
    }
  });
}

export {useAuthor, useNotes, useMutateNote};
