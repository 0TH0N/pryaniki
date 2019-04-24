import React from 'react';
import $ from 'jquery';
import { callbackify } from 'util';


class Item extends React.Component {
    constructor(props) {
        super(props);
        const { curValue, maxValue } = props;
        const vh100 = window.screen.height;
        const maxRatio = ((vh100 - 300) / vh100) * 0.5 * curValue / maxValue * 100 + 25;
        const ratio = 25;
        this.state = {
            ratio,
            maxRatio,
        };
    }

    renderOneStepRatioToMax = () => {
        const { ratio, maxRatio } = this.state;
        if (maxRatio > ratio) {
            this.setState({ ratio: ratio + 1 });
            setTimeout(this.renderOneStepRatioToMax, 20);
        }
    }

    componentDidMount() {
        this.renderOneStepRatioToMax();
    }

    render() {
        const { id, name, value, curValue, maxValue } = this.props;
        const className = curValue < maxValue ? 'flex-item' : 'flex-item flex-item-first';
        const { ratio } = this.state;
        return (
            <div className='flex-item-wrap'>
                <div className={className} id={id} style={{ height: `${ratio}vh` }}>
                    <div className='photo'><img /></div>
                    <div>{name}</div >
                    <div>{value}</div>
                </div >
            </div>
        )
    }
}


export default Item;