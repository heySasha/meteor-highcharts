import { Meteor } from 'meteor/meteor';

import { Rates } from '../imports/collections/rates';

Meteor.startup(() => {
    const numberRecords = Rates.find({}).count();

    if (!numberRecords) {
        const currentTime = Date.now();
        const stepTime = 60000 * 60 * 24;
        const times = 500;

        let timestamp = currentTime - stepTime * times;

        for (let i = 0; i < times; i++) {
            const price = Math.random() * (1.2 - 0.5) + 0.5;

            Rates.insert({
                data: [timestamp, price]
            });

            timestamp += stepTime;
        }
    }

    Meteor.publish('rates', function () {
        if (this.userId) {
            return Rates.find({});
        }
    });
});