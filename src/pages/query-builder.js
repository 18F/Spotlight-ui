import React           from 'react'; // eslint-disable-line
import { Provider }    from 'react-redux';
import store           from '../redux/index';
import AvailableFields from '../components/modules/available-fields';
import SelectedFields  from '../components/modules/selected-fields';
import BuilderActions  from '../components/modules/builder-actions';
import Instructions    from '../components/modules/instructions';
import './query-builder.css';

const QueryBuilder = () => {
    return (
        <Provider store={store}>
            <main className='main'>
                <div className='left'>
                    <AvailableFields />
                </div>
                <div className='right'>
                    <Instructions />
                    <SelectedFields />
                    <BuilderActions />
                </div>
            </main>
        </Provider>
    );
};

export default QueryBuilder;
