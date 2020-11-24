import React           from 'react'; // eslint-disable-line
import { Provider }    from 'react-redux';
import store           from '../../redux/index';
import AvailableFields from './available-fields';
import SelectedFields  from './selected-fields';
import BuilderActions  from './builder-actions';
import Instructions    from './instructions';
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
