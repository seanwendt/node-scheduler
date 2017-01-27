## node-scheduler 

This framework is for scheduling a node app that needs to run on a date/time-based interval (similar to a cron job).

## Usage

### Installation

Install the node-schedule dependency into your project using [npm](https://www.npmjs.com/package/node-schedule).

```
npm install node-schedule --save
```

### Overview

Node Schedule is for time-based scheduling.

It is designed for in-process scheduling, i.e. scheduled jobs
will only fire as long as your script is running, and the schedule will disappear
when execution completes.  Use a node process manager such as `pm2` or `forever`
to persistently run index.js.

### Jobs and Scheduling

Every scheduled job in Node Schedule is represented by a `Job` object. You can
create jobs manually, then execute the `schedule()` method to apply a schedule,
or use the convenience function `scheduleJob()` as demonstrated below.

`Job` objects are `EventEmitter`'s, and emit a `run` event after each execution.
They also emit a `scheduled` event each time they're scheduled to run, and a
`canceled` event when an invocation is canceled before it's executed (both events
receive a JavaScript date object as a parameter). Note that jobs are scheduled the
first time immediately, so if you create a job using the `scheduleJob()`
convenience method, you'll miss the first `scheduled` event. Also note that
`canceled` is the single-L American spelling.

### Cron-style Scheduling

The cron format consists of:
```
*    *    *    *    *    *
┬    ┬    ┬    ┬    ┬    ┬
│    │    │    │    │    |
│    │    │    │    │    └ day of week (0 - 7) (0 or 7 is Sun)
│    │    │    │    └───── month (1 - 12)
│    │    │    └────────── day of month (1 - 31)
│    │    └─────────────── hour (0 - 23)
│    └──────────────────── minute (0 - 59)
└───────────────────────── second (0 - 59, OPTIONAL)
```

Examples with the cron format:

```js
var schedule = require('node-schedule');

var job = schedule.scheduleJob('42 * * * *', function(){
  console.log('It's the 42nd second of the minute!');
});
```


### Date-based Scheduling

Say you very specifically want a function to execute at 5:30am on December 21, 2012.
Remember - in JavaScript - 0 - January, 11 - December.

```js
var schedule = require('node-schedule');
var date = new Date(2012, 11, 21, 5, 30, 0);

var job = schedule.scheduleJob(date, function(){
  console.log('The world is going to end today.');
});
```

You can invalidate the job with the `cancel()` method:

```js
job.cancel();
```

### Recurrence Rule Scheduling

You can build recurrence rules to specify when a job should recur. For instance,
this rule executes the function every hour at 30 minutes after the hour:

```js
var schedule = require('node-schedule');

var rule = new schedule.RecurrenceRule();
rule.minute = 30;

var job = schedule.scheduleJob(rule, function(){
  console.log('It's half-past the hour!);
});
```

#### RecurrenceRule properties (can be set in jobSchedule.js)

- `second`
- `minute`
- `hour`
- `date`
- `month`
- `year`
- `dayOfWeek`

> **Note**: It's worth noting that the default value of a component of a recurrence rule is
> `null` (except for second, which is 0 for familiarity with cron).

#### Object Literal Syntax

To make things a little easier, an object literal syntax is also supported, like
in this example which will log a message every Sunday at 2:30pm:

```js
var j = schedule.scheduleJob({hour: 14, minute: 30, dayOfWeek: 0}, function(){
  console.log('Time for tea!');
});
```

You should use jobSchedule.js to modularize and define the object: 

```js
exports.rule = {
    // dayOfWeek: ,
    // date: ,
    // hour: ,
    // minute: 30,
    second : 10,
};
```

... then require it in your index.js, and pass it into the function:


```js
var mySchedule = (require('./jobSchedule.js')),
var job = schedule.scheduleJob(mySchedule, function(){
    console.log('Running per jobSchedule.js!  It's half-past the hour!);
});
```

### Copyright and license

Copyright 2015 Matt Patenaude.

Licensed under the MIT License.
