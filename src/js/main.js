var bem = require('bem-class');
var moment = require('moment');

class CountdownTimer extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            currentDate: moment()
        };

        setInterval(() => {
            this.setState({
                currentDate: moment()
            })
        }, 1000);
    }

    render () {
        // BEM Elements
        var countdown = bem.block('countdown-timer');
        var title     = countdown.element('title');
        var timer     = countdown.element('timer');
        var timeUnit  = countdown.element('time-unit');

        // Calculate time remaining
        var diff = this.props.countdownEnd.diff(this.state.currentDate);
        var duration = moment.duration(diff);

        return (
            <div className={countdown}>
                <h1 className={title}>{this.props.title}</h1>
                <p className={timer}>
                    <span className={timeUnit}>{Math.floor(duration.asDays())} days</span>
                    <span className={timeUnit}>{duration.hours()} hours</span>
                    <span className={timeUnit}>{duration.minutes()} minutes</span>
                    <span className={timeUnit}>{duration.seconds()} seconds</span>
                </p>
            </div>
        );
    }
}

React.render(<CountdownTimer title="React Europe" countdownEnd={moment.parseZone('2015-07-02T08:30:00+02:00')} />, document.body);
