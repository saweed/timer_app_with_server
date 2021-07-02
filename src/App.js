import React, {Component} from 'react';
import './App.css';
import 'semantic-ui-css/semantic.min.css';
import EditableTimerList from './components/EditableTimerList';
import ToggleableTimerForm from './components/ToggleableTimerForm';
import { newTimer } from './helpers';
import { v4 as uuidv4 } from 'uuid';
import client from './client';

export default class App extends Component {
    state = {
        timers: []
    };

    componentDidMount() {
        this.loadTimersFromServer();
        //setInterval(this.loadTimersFromServer, 15000);
    }

    loadTimersFromServer = () => {
        client.getTimers((serverTimers) => (
            this.setState({ timers: serverTimers })
        ));
    };

    handleCreateFormSubmit = (timer) => {
        this.createTimer(timer);
    };
    createTimer = (timer) => {
        const t = newTimer(timer);
        client.createTimer(t).then(this.loadTimersFromServer);
        //this.setState({timers: this.state.timers.concat(t)});
    };
    handleEditFormSubmit = (attrs) => {
        this.updateTimer(attrs);
    };
    updateTimer = (attrs) => {
        client.updateTimer(attrs).then(this.loadTimersFromServer);
    };
    handleTrashClick = (timerId) => {
        this.deleteTimer(timerId);
    };
    deleteTimer = (timerId) => {
        client.deleteTimer({id: timerId}).then(this.loadTimersFromServer);
        // this.setState({
        //     timers: this.state.timers.filter(t => t.id !== timerId)
        // });
    };
    handleStartClick = (timerId) => {
        this.startTimer(timerId);
    };
    handleStopClick = (timerId) => {
        this.stopTimer(timerId);
    };
    startTimer = (timerId) => {
        const now = Date.now();
        this.setState({
            timers: this.state.timers.map((timer) => {
                if (timer.id === timerId) {
                    return Object.assign({}, timer, {
                    passed: now,
                    });
                } else {
                    return timer;
                }
            })
        });
        client.startTimer(
            { id: timerId, start: now }
        );
    };
    stopTimer = (timerId) => {
        const now = Date.now();
        client.stopTimer(
            { id: timerId, stop: now }
        ).then(this.loadTimersFromServer);
    };
    render() {
        return (
            <div className='ui three column centered grid'>
                <div className='column'>
                    <EditableTimerList timers= {this.state.timers}
                        onFormSubmit={this.handleEditFormSubmit}
                        onTrashClick={this.handleTrashClick}
                        onStartClick={this.handleStartClick}
                        onStopClick={this.handleStopClick}
                        />
                    <ToggleableTimerForm
                        onFormSubmit={this.handleCreateFormSubmit}
                        isOpen={false}
                    />
                </div>
            </div>
        );
    }
}
