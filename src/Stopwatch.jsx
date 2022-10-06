import React from 'react';
import ReactDOM from 'react-dom';
import StopwatchDisplay from './StopwatchDisplay.jsx';
import StopwatchHistory from './StopwatchHistory.jsx';
import { Button } from 'reactstrap';


class Stopwatch extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            running: false,
            currentTimeMs: 0,
            currentTimeSec: 0,
            currentTimeMin: 0,
        };
    }
    
    
    formatTime = (val, ...rest) => {
        let value = val.toString();
        if (value.length < 2) {
            value = '0' + value;
        }
        if (rest[0] === 'ms' && value.length < 3) {
            value = '0' + value;
        }
        return value;
    };

    start = () => {
        if (!this.state.running) {
            this.setState({ running: true });
            this.watch = setInterval(() => this.pause(), 10);
        }
    };

    stop = () => {
        this.setState({ running: false });
        clearInterval(this.watch);
    };

    pause = () => {
        this.setState({ currentTimeMs: this.state.currentTimeMs + 10 });
        if (this.state.currentTimeMs >= 1000) {
            this.setState({ currentTimeSec: this.state.currentTimeSec + 1 });
            this.setState({ currentTimeMs: 0 });
        }
        if (this.state.currentTimeSec >= 60) {
            this.setState({ currentTimeMin: this.state.currentTimeMin + 1 });
            this.setState({ currentTimeSec: 0 });
        }
    };

    reset = () => {
       
        this.setState({
            currentTimeMs: 0,
            currentTimeSec: 0,
            currentTimeMin: 0,
        });
    };

    render() {
        return (
            <div className={'stopwatch'} >

                <h1 ref="header" style={{
                    color: "white",
                    backgroundColor: "DodgerBlue",
                    padding: "10px",
                    fontFamily: "Sans-Serif"

                }}>Time Tracking Application</h1>
                {this.state.running === false && (
                    <Button color="primary" size="lg"
                             onClick={this.start}>START</Button>
                )}
                {this.state.running === true && (
                    <Button color="primary"  size="lg"
                             onClick={this.stop}>STOP</Button>
                )} {' '}
                    <Button  color="primary" size="lg"
                              onClick={this.stop}>PAUSE</Button>
                {' '}
                <Button color="primary"  size="lg"
                         onClick={this.reset}>RESET</Button>
                <StopwatchDisplay
                    ref="display"
                    {...this.state}
                    formatTime={this.formatTime}
                />
                <StopwatchHistory {...this.state} formatTime={this.formatTime} />
            </div>
        );
    }
}

export default Stopwatch;
