import React from 'react';


class Item extends React.Component {
    constructor(props) {
        super(props);
        const { curValue, valuesOfLines } = props;
        const indexFromLines = valuesOfLines.findIndex((item) => item >= curValue);
        const difference = valuesOfLines[indexFromLines] - valuesOfLines[indexFromLines - 1];
        const restSize = (curValue - valuesOfLines[indexFromLines - 1]) / difference;
        const floatRest = (indexFromLines - 1 + restSize) > 0 ? 100 * (indexFromLines - 1 + restSize) : 0;
        const maxRatio = 0.15 * window.screen.height + floatRest + 45;
        const ratio = 0;
        this.state = {
            ratio,
            maxRatio,
        };
    }

    renderOneStepRatioToMax = () => {
        const { ratio, maxRatio } = this.state;
        if (maxRatio > ratio) {
            const nextRatio = ratio + 5 < maxRatio ? ratio + 5 : maxRatio;
            this.setState({ ratio: nextRatio });
            setTimeout(this.renderOneStepRatioToMax, 1);
        }
    }

    componentDidMount() {
        this.renderOneStepRatioToMax();
    }

    render() {
        const { id, name, value, curValue, maxValue, workerRating } = this.props;
        const className = curValue < maxValue ? 'flex-item' : 'flex-item flex-item-first';
        const { ratio } = this.state;
        return (
            <div className='flex-item-wrap'>
                <div className={className} id={id} style={{ height: `${ratio}px` }}>
                    <div className='photo'><img /></div>
                    <div className='place'>{workerRating}</div>
                    <div>{name}</div >
                    <div>{value}</div>
                </div >
            </div>
        )
    }
}


export default Item;