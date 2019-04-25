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
        const workersRating = sortedWorkers.reduce((acc, worker, i, workers) => {
            if (i === 0) {
                acc.push(1);
                return acc;
            }
            worker.curValue === workers[i - 1].curValue ? acc.push(acc[acc.length - 1]) : acc.push(acc[acc.length - 1] + 1);
            return acc;
        }, []);
        const valuesOfLines = [0, 2, 6, 10, 20];
        const screenMaxHeight = window.screen.height;

        return (
            <div className='flex-items-field'>
                <div className='flex-item-wrap flex-item-wrap-first'></div>
                {sortedWorkers.map((worker, i) =>
                    <Item key={worker.id} id={worker.id} name={worker.displayName} value={worker.value}
                        photo={worker.imgId} curValue={worker.curValue} maxValue={firstWorker.curValue}
                        valuesOfLines={valuesOfLines} workerRating={workersRating[i]} />)}

                <div className='horizontal-lines-field'>
                    <div className='horizontal-line' style={{ height: screenMaxHeight * 0.15 }}>
                        <div id='line-zero'></div>
                    </div>
                    {valuesOfLines.map(value => <div className='horizontal-line' key={`${value}`}>
                        <div id={`line-${value} `}>{value}</div>
                    </div>)}
                </div>
            </div>
        );
    }
}


export default App;