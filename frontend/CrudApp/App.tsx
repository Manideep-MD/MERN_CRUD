import React from 'react';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {ThemeProvider} from './src/theme/ThemeContext';
import './src/bottomSheets/sheets';
import AppNavigation from './src/navigations/AppNavigation';
import {Provider} from 'react-redux';
import {persistor, store} from './src/Redux/Store/store';
import {PersistGate} from 'redux-persist/integration/react';
import Loader from './src/Components/Loader/Loader';


const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider>
          <SafeAreaProvider>
            <SafeAreaView style={{flex: 1}}>
              <AppNavigation />
              <Loader />
            </SafeAreaView>
          </SafeAreaProvider>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
