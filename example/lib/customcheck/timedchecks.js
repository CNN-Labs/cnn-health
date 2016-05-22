/* global fetch */
'use strict';
let lastCheckOk = false;

let lastCheckOutput = 'Waiting for check';
let lastCheckTime
let panicGuide = `Don't panic`;
const debug = require('debug')('timedcheck'),
    INTERVAL = 1000 * 3,
    statuses = {
        testURL: false
    };

function pingServices() {
    fetch('http://api.platform.cnn.com/health')
    .then((res) => {
        statuses.testURL = res.ok;
        lastCheckOutput='Valid JSON was returned'
        debug('Ping');
    })
    .catch(() => {
        statuses.testURL = false;
    });
}


debug('Starting Pinging of HealthChecks');
pingServices();
setInterval(pingServices, INTERVAL);
module.exports = {
    getStatus: () => ({
        id :"api Client",
        name: 'api.client.cnn.com responded successfully.',
        ok: statuses.testURL,
        businessImpact: 'Users may not see data',
        checkOutput: lastCheckOutput,
        lastUpdated: lastCheckTime,
        severity: 3,
        panicGuide: panicGuide,
        technicalSummary: 'Fetches the session-user-data call used on the client side to initialise comments'
    })
};
