import React, {Component} from 'react';
import './App.css';
import 'semantic-ui-css/semantic.min.css';
import EditableTimerList from './components/EditableTimerList';
import ToggleableTimerForm from './components/ToggleableTimerForm';
import { newTimer } from './helpers';
import { v4 as uuidv4 } from 'uuid';

export default class App extends Component {
    state = {
        timers: [
            {
                title: "First Timer" ,
                description: "1st test timer" ,
                elapsed: Date.now(),
                passed: null,
                id: uuidv4()
            },
            {
                title: "Second Timer" ,
                description: "2nd test timer" ,
                elapsed: null,
                passed: null,
                id: uuidv4()
            }
        ]
    };

    handleCreateFormSubmit = (timer) => {
        this.createTimer(timer);
    };
    createTimer = (timer) => {
        const t = newTimer(timer);
        this.setState({timers: this.state.timers.concat(t)});
    };
    handleEditFormSubmit = (attrs) => {
        this.updateTimer(attrs);
    };
    updateTimer = (attrs) => {
        this.setState({
            timers: this.state.timers.map((timer) => {
                if (timer.id === attrs.id) {
                    return Object.assign({}, timer, {
                        title: attrs.title,
                        description: attrs.description
                    });
                }
                else
                {
                    return timer;
                }
            })
        });
    };
    handleTrashClick = (timerId) => {
        this.deleteTimer(timerId);
    };
    deleteTimer = (timerId) => {
        this.setState({
            timers: this.state.timers.filter(t => t.id !== timerId)
        });
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
    };
    stopTimer = (timerId) => {
        const now = Date.now();
        this.setState({
            timers: this.state.timers.map((timer) => {
                if (timer.id === timerId) {
                    const lastElapsed = now - timer.passed;
                    return Object.assign({}, timer, {
                        elapsed: timer.elapsed + lastElapsed,
                        passed: null,
                    });
                } else {
                    return timer;
                }
            }),
        });
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
