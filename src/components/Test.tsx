import axios from 'axios';
import React from 'react';
import ApolloClient from "apollo-boost";
import gql from "graphql-tag";

function Test() {

    const client = axios.create({
        baseURL: 'https://api.github.com/',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer d2b0858f0a5db5bf71887fba1452e72178ca4915`,
        },
    })

    const query = `
    query {    
        user(login: "WataruShimomura") {
          avatarUrl
          url
          login
    starredRepositories{
      totalCount
      edges {
        node {
          id
          name
          resourcePath
          owner {
            login
            avatarUrl
            url
          }
          primaryLanguage{
            name
          }
        }
      }
    }
  }
}`

    const response = client.post('graphql', { query }).then(function (result) { console.log(result.data) })
}

export default Test;
