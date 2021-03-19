import { RealmProvider } from "../services/Realm";
import { ApolloProvider } from "../services/Apollo";
import { CacheProvider } from "../services/Cache";

const Providers = ({ args, children }) => {
  return (
    <RealmProvider {...args.realm}>
      <ApolloProvider apollo={args.apollo.state}>
        <CacheProvider>{children}</CacheProvider>
      </ApolloProvider>
    </RealmProvider>
  );
};

export default Providers;
