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
        var days      = countdown.element('time-unit').modifier('days');
        var hours     = countdown.element('time-unit').modifier('hours');
        var minutes   = countdown.element('time-unit').modifier('minutes');
        var seconds   = countdown.element('time-unit').modifier('seconds');

        // Calculate time remaining
        var diff = this.props.countdownEnd.diff(this.state.currentDate);
        var duration = moment.duration(diff);

        return (
            <div className={countdown}>
                <h1 className={title}>{this.props.title}</h1>
                <p className={timer}>
                    <span className={days}>{Math.floor(duration.asDays())}</span>
                    <span className={hours}>{duration.hours()}</span>
                    <span className={minutes}>{duration.minutes()}</span>
                    <span className={seconds}>{duration.seconds()}</span>
                </p>
            </div>
        );
    }
}

React.render(<CountdownTimer title="React Europe" countdownEnd={moment('2015-07-01, 08:30 AM', 'YYYY-MM-DD, hh:mm a')} />, document.body);
