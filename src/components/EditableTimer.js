import React, { Component } from 'react'
import TimerForm from './TimerForm'
import Timer from './Timer'

export default class EditableTimer extends Component {
    state = {
        editForm : false
    }
    handleEditClick = () => {
        this.openForm();
    };
    handleFormClose = () => {
        this.closeForm();
    };
    handleSubmit = (timer) => {
        this.props.onFormSubmit(timer);
        this.closeForm();
    };
    closeForm = () => {
        this.setState({ editForm: false });
    };
    openForm = () => {
        this.setState({ editForm: true });
    };
    render() {
        if(this.state.editForm){
            return (
                <TimerForm
                    id = {this.props.id}
                    title={this.props.title}
                    description={this.props.description}
                    onFormSubmit={this.handleSubmit}
                    onFormClose={this.handleFormClose}
                />
            )
        } else {
            return (
                <Timer
                    id = {this.props.id}
                    title={this.props.title}
                    description={this.props.description}
                    elapsed={this.props.elapsed}
                    passed={this.props.passed}
                    onEditClick={this.handleEditClick}
                    onTrashClick={this.props.onTrashClick}
                    onStopClick={this.props.onStopClick}
                    onStartClick={this.props.onStartClick}
                />
            )
        }
    }
}
