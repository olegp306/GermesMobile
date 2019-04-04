//npm i --save-dev reactotron-react-nativei
import { NativeModules } from "react-native";
import Reactotron from "reactotron-react-native";
import { reactotronRedux } from "reactotron-redux";

// Reactotron
//   .configure() // controls connection & communication settings
//   .useReactNative() // add all built-in react native plugins
//   .connect() // let's connect!

let scriptHostname;

if (__DEV__) {
  const scriptURL = NativeModules.SourceCode.scriptURL;
  scriptHostname = scriptURL.split("://")[1].split(":")[0];
}

const reactotron = __DEV__
  ? Reactotron.configure({ host: scriptHostname })
      .use(reactotronRedux())
      .connect()
  : Reactotron.configure({ name: "React Native Demo" })
      .use(reactotronRedux())
      .connect();

export default reactotron;
