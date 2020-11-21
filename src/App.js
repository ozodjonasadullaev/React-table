import { Provider } from 'react-redux';

import store from './redux/store';

import BasicTable from './components/BasicTable';
import TextInput from './components/TextInput';

import './App.css';

function App() {
    return (
        <Provider store={store}>
            <div className='App'>
                <TextInput />
                <BasicTable />
            </div>
        </Provider>
    );
}

export default App;
