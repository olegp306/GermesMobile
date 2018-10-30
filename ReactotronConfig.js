//npm i --save-dev reactotron-react-nativei
import Reactotron from 'reactotron-react-native' 
import { reactotronRedux } from 'reactotron-redux'

// Reactotron
//   .configure() // controls connection & communication settings
//   .useReactNative() // add all built-in react native plugins
//   .connect() // let's connect!

const reactotron = Reactotron
  .configure({ name: 'React Native Demo' })
  .use(reactotronRedux()) //  <- here i am!
  .connect() //Don't forget about me!

  export default reactotron