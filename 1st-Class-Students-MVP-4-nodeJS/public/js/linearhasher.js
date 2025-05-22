function linearHashingSort(tasksArray, newTasks) {
    const period = 2400;
    const sortedMap = new Array(period).fill(null);
    var timeIndex = {
                    hour: 0,
                    minutes: 0,
                    timeFull: 0
                    };

    // populate the array with filler elements that will block out periods within a schedule
    for (const tasks of tasksArray) {
        // get mods of task timeslots to hashmap
        const hourIndex = tasks.hour;
        const minIndex = tasks.minutes;
        // convert from 24 & 60 based times into 10 base
        const timeDec = Math.round(hoursIndex * 100 + minIndex/60*100);
        // split duration -- measured in minutes -- into hours and minutes;
        const durationHours = Math.floor(tasks.duration/60);
        const durationMins = tasks.duration % 60;
        // also put into the hashmap the duration of a task
        const minEnd = minIndex + durationMins;
        const hourEndIndex = hourIndex + durationHours + Math.floor(minEnd/60);
        const minEndIndex = minEnd % 60;
        const endDec = Math.round(hourEndIndex * 100 + minEndIndex/60*100);
        const endDuration = endDec - timeDec;
        const id = tasks.idtasks;
        
        // sort into hashmap
        // No probing is conducted as overwrite is just fine :D
        // this is because these are to mark out periods that cannot be autoscheduled into
        sortedMap[timeDec] = id;
        // fill the hours and/or minutes that make up task duration period
        if (endDuration > 0) {
            for (i = timeDec + 1; i <= endDec; i++) {
                sortedMap[i] = id;
            }
        }
    }

    // now we autoschedule tasks
    const durationHours = Math.floor(newTasks.duration/60);
    const durationMins = newTasks.duration % 60;
    let duration = Math.round(durationHours * 100 + durationMins/60*100)
    timeIndex.timeFull = linearHashProbing(timeIndex.timeFull, duration, tasks.idtasks, 0);

    // if a slot could not be found, give back -1
    if (timeIndex.timeFull == -1) {
        return -1;
    }

    // else convert decimal into 24 hour time
    timeIndex.hour = Math.floor(timeIndex.timeFull / 100); // Extract hours
    timeIndex.minutes = timeIndex.timeFull % 100; // Extract minutes
    timeIndex.timeFull =  timeIndex.hours * 100 + Math.round(timeIndex.minutes / 100 * 60); // put it all together
    
    return timeIndex; // return time slot
}

// fair warning: this came to me in a dream
function linearHashProbing(timeIndex, duration, idtasks, loops) {
    // ensure the loop doesn't go on forever
    if (loops > 4800) {
        return -1;
    }
    // variables to maintain checks on whether vacancy over task duration period is available
    var timeCheck = true;
    var lastIndex = 0;
    durationEnd = (duration + timeIndex) % period;
    for (i = timeIndex; i <= durationEnd; i++) {
        if (sortedMap[i] !== null) {
            timeCheck = false;
            lastIndex = i + 1;
            break;
        }
    }
    if (timeCheck) {
        // just return the start time index of the task
        return timeIndex;
    } else {
        if (loops > 4800) {
            return -1;
        } else {
        // recur
        linearHashProbing(lastIndex, durationHour, durationMin, idtasks, loops + 1)
        }
    }
}
