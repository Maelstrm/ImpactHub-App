import React, { Component } from 'react';
import { Pie } from 'react-chartjs-2';
import axios from 'axios';
import {Typography} from '@material-ui/core'


class CurrentMemberVSVisitor extends Component {
    constructor() {
        super();
        this.state = {
            currentVisitors: null, 
            currentMembers: null, 
        }

    }

    //gets the amount of members currently in the space from the database and sets state value
    getCurrentMembers = () => {
        console.log('in getCurrentMembers');
        axios({
            method: 'GET',
            url:'/api/admin/currentMemberCount',
        }).then((response)=>{
            console.log(response.data);
            this.setState({
                currentMembers: Number(response.data[0].sum),
            })
        }).catch((error)=>{
                console.log(error, 'Error getting current members');
                alert('Current members could\'t be obtained');
        })
    }
    //gets the amount of guests in the space from the database and sets the state value
    getTodaysVisitors = () => {
        console.log('in getTodaysVisitors');
        axios({
            method: 'GET',
            url:'/api/admin/todayGuestCount',
        }).then((response)=>{
            console.log(response.data.sum);
            this.setState({
                currentVisitors: Number(response.data[0].sum),
            })
        }).catch((error)=> {
            console.log(error, 'Error getting today\'s visitors');
            alert ('Today\'s visitors could not be obtained');
        })
    }
    // put functions here that should happen on page load
    componentDidMount(){
        this.getCurrentMembers();
        this.getTodaysVisitors();
    }
    render() {
        const data = {
            labels: [
                'Visitors',
                'Members'
            ],
            datasets: [{
                data: [this.state.currentVisitors, this.state.currentMembers],
                backgroundColor: [
                    '#ffab91',
                    '#b2dfdb'
                ],
                hoverBackgroundColor: [
                    '#ffab91',
                    '#b2dfdb'
                ]
            }]
        };
        const dataHere = this.state.currentMembers;
        return (
            <div className="viewContainer">
                {dataHere && < Pie
                    options={{
                        title: {
                            display: true,
                            text: 'Current Guests',
                            fontSize: 18
                        }
                    }}

                    data={data}
                />}
                <Typography>{(this.state.currentVisitors + this.state.currentMembers)} current guests</Typography> {/*Adding visitors and members together to get the total number of people in the space*/} 
            </div>
        );
    }
}

export default CurrentMemberVSVisitor;