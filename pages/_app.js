//Add global style
import "../styles/global.css";
//Import the ApolloClient
import useApollo from "../lib/apolloClient";
import { ApolloProvider } from "@apollo/client";

const App = ({ Component, pageProps }) => {
  const apolloClient = useApollo(pageProps.initialApolloState);

  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />;
    </ApolloProvider>
  );
};

export default App;
