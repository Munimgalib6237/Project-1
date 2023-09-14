

// Date formate with AM/PM
const formatDateWithAMPM = date => {
    date = new Date(date)
    const cdate = date.toDateString();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = cdate + ' ' + hours + ':' + minutes + ' ' + ampm;
    return strTime;
}

module.exports = {
    formatDateWithAMPM
}