import Body from "./components/Body";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";


function App() {
  return (
    // provide a appstore here for whole body 
    <Provider store={appStore}>
    <Body/>
    </Provider>
  );
}

export default App;
