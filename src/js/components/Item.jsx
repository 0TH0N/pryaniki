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
            const nextRatio = ratio + 1;
            this.setState({ ratio: nextRatio });
            setTimeout(this.renderOneStepRatioToMax, 20);
        }
    }

    componentDidMount() {
        this.renderOneStepRatioToMax();
    }

    render() {
        const { id, name, value, curValue, photo, maxValue } = this.props;
        const { ratio } = this.state;
        return (
            <div className='flex-item' id={id} style={{ height: `${ratio}vh` }}>
                <div className='photo'><img /></div>
                <div>{name}</div >
                <div>{value}</div>
            </div >
        )
    }
}


export default Item;