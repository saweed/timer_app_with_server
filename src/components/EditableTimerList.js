import React, { Component } from 'react'
import EditableTimer from './EditableTimer'
export default class EditableTimerList extends Component {
    render() {
        const timers = this.props.timers.map((timer) => (
            <EditableTimer
            key = {timer.id}
            id = {timer.id}
            title = {timer.title}
            description = {timer.description}
            elapsed = {timer.elapsed}
            passed = {timer.passed}
            onFormSubmit={this.props.onFormSubmit}
            onTrashClick={this.props.onTrashClick}
            onStopClick={this.props.onStopClick}
            onStartClick={this.props.onStartClick} />
        ))
        return (
            <div id='timers'>
                {timers}
            </div>
        )
    }
}
