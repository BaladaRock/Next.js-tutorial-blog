import { RealmProvider } from "../services/Realm";
import { ApolloProvider } from "../services/Apollo";
import { CacheProvider } from "../services/cache";

const Providers = ({ args, children }) => {
  console.log(args);

  return (
    <RealmProvider {...args.realm}>
      <ApolloProvider apollo={args.apollo.state}>
        <CacheProvider>{children}</CacheProvider>
      </ApolloProvider>
    </RealmProvider>
  );
};

export default Providers;
