import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Context from './components/Context';
import { Client } from './generated/graphql';
 
const root = ReactDOM.createRoot(document.getElementById('root') as Element)

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        clients: {
          merge(existing: Client[] = [] , incoming: Client[] = []) {
            return incoming
          }
        },
        projects: {
          merge(existing: Client[] = [] , incoming: Client[] = []) {
            return incoming
          }
        }
      }
    }
  }
})

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  cache,
})

root.render(
  <React.StrictMode>
    <Context>
      <ApolloProvider client={client} >
        <App />
      </ApolloProvider>
    </Context>
  </React.StrictMode>
)