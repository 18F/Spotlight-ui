import React from 'react'; // eslint-disable-line
import { Provider } from 'react-redux';
import store from '../redux/index';
import AvailableFilters from '../components/modules/available-filters';
import AvailableFields from '../components/modules/available-fields';
import SelectedFilters from '../components/modules/selected-filters';
import SelectedFields from '../components/modules/selected-fields';

const styles = {
    main: {
        display: 'flex'
    },
    left: {
        backgroundColor: '#ddd',
        width: '30%',
        height: '100vh',
        borderRight: '#ddd 1px solid',
    },
    right: {
        backgroundColor: 'white',
        flex: 1,
    }
}

const CsvBuilder = () => {
    return (
        <Provider store={store}>
            <main style={styles.main}>
                <div style={styles.left}>
                    <AvailableFilters />
                    <AvailableFields />
                </div>
                <div style={styles.right}>
                    <SelectedFilters />
                    <SelectedFields />
                </div>
            </main>
        </Provider>
    );
};

export default CsvBuilder;
