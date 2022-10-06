import React from 'react';
import { Button } from 'reactstrap';

class StopwatchDisplay extends React.Component {
    render() {
        return (
            <div className={'stopwatch__display'}>
            <br/>
        <Button color="secondary" outline disabled  style={{"fontSize":"100px"}} >
          {this.props.formatTime(this.props.currentTimeMin)}:
            {this.props.formatTime(this.props.currentTimeSec)}:
            {this.props.formatTime(this.props.currentTimeMs, 'ms')}
        </Button>

            </div>
        );
    }
}

export default StopwatchDisplay;
