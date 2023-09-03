import MainComponent from "./src/components/main/mainComponent";
import { AuthProvider } from "./src/contexts/AuthContext";
import { RootSiblingParent } from "react-native-root-siblings";

const App = () => {
  return (
    <AuthProvider>
      <RootSiblingParent>
        <MainComponent />
      </RootSiblingParent>
    </AuthProvider>
  );
};

export default App;
