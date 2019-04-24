import React from 'react';
import _ from 'lodash';
import Item from './Item';
import connect from '../utils/connect';


const mapStateToProps = ({ workers }) => {
    const props = {
        workers,
    };
    return props;
}

@connect(mapStateToProps)
class App extends React.Component {

    downloadJsonOnce = async () => {
        const { downloadJson } = this.props;
        await downloadJson();
    }

    componentDidMount() {
        this.downloadJsonOnce();
    }

    render() {
        const { workers: { byId, allIds } } = this.props;
        const arrayOfWorkers = allIds.map(id => byId[id]);
        const sortedWorkers = _.reverse(_.sortBy(arrayOfWorkers, [(worker) => worker.curValue]));
        const firstWorker = sortedWorkers[0];

        return (
            <div className='flex-items-field'>
                {sortedWorkers.map(worker =>
                    <Item key={worker.id} id={worker.id} name={worker.displayName} value={worker.value}
                        photo={worker.imgId} curValue={worker.curValue} maxValue={firstWorker.curValue} />)}
            </div>
        );
    }
}


export default App;