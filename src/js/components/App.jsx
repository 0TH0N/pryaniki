import React from 'react';
import _ from 'lodash';
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

        return (
            <div>
                {sortedWorkers.map(worker => <div key={worker.id}>{`${worker.displayName} : ${worker.value}`}</div>)}
            </div>
        );
    }
}


export default App;