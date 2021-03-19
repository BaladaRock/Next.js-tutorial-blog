// Add global style
import "../styles/global.css";
// Provide the backend and User model wrappers
import Members from "members/provider";
import Providers from "provider";

const App = ({ Component, pageProps }) => {
  return (
    <Providers
      args={{
        realm: {
          appId: process.env.NEXT_PUBLIC_APP_ID,
        },
        apollo: {
          state: pageProps.initialApolloState,
        },
      }}
    >
      <Members>
        <Component {...pageProps} />
      </Members>
    </Providers>
  );
};

export default App;
