var schedule = require('node-schedule'),
    jobSchedule = (require('./jobSchedule.js')).rule,
    test = require('./test.js').testFunction;

var job = schedule.scheduleJob(jobSchedule, function(){
  console.log('Running testFunction per schedule in jobSchedule.js!');
  test();
});
