import React, { Component } from 'react';
import axios from "axios";
import TwilioMessageComponent from './TwilioMessageComponent/TwilioMessageComponent';

class TwilioComponent extends Component {

    constructor() {
        super();
        this.state = {
            twilioMessages: [],
        }
    }
    // When component loads, will get the last 15 twilio messages from the DB
    componentDidMount = () => {
        this.getTwilio();
    }
    // Axior request to retrieve twilio messages from teh server
    getTwilio = () => {
        axios({
            method: 'get',
            url: 'api/twilio/getTwilioMessages',
        }).then((response) => {
            console.log('response from twilio', response.data);
            this.setState({
                twilioMessages: response.data,
            })
        }).catch(function (error) {
            console.log(error);
        });
    }

    render() {
        return (
            <div>
                {/* Will create a new component for each of the messages */}
                {this.state.twilioMessages.map((message, i) => {
                    return (
                        <div key={i}>
                            <TwilioMessageComponent data={message}/>
                        </div>
                    )
                })}
            </div>
        );
    }
}

// this allows us to use <App /> in index.js
export default TwilioComponent;
