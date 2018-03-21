import React, { Component } from 'react';
import ReactHighstock from 'react-highcharts/ReactHighstock';
import { withTracker } from 'meteor/react-meteor-data';

import { Rates } from "../../imports/collections/rates";

class Highcharts extends Component {
    render() {
        const data = this.props.rates.map(item => item.data);

        const config = {
            rangeSelector: {
                selected: 1
            },
            title: {
                text: 'XYZ Price'
            },
            series: [{
                name: 'XYZ',
                data,
                tooltip: {
                    valueDecimals: 2
                }
            }]
        };

        return (
            <div className="container">
                <ReactHighstock config={config} />
            </div>
        );
    }
}

export default withTracker(() => {
    Meteor.subscribe('rates');

    return { rates: Rates.find({}).fetch() }
})(Highcharts);