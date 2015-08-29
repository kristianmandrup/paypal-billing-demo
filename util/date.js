//utlity functions to make generating the start date above easier
function PadZeros(value, desiredStringLength) {
    var num = value + "";
    while (num.length < desiredStringLength) {
        num = "0" + num;
    }
    return num;
}
function toIsoString(d){
    return d.getUTCFullYear() + '-' + PadZeros(d.getUTCMonth() + 1, 2) + '-' + PadZeros(d.getUTCDate(), 2) + 'T' + PadZeros(d.getUTCHours(), 2) + ':' + PadZeros(d.getUTCMinutes(), 2) + ':' + PadZeros(d.getUTCSeconds(), 2) + 'Z';
}

module.exports.startDate = function () {
    var start_date = new Date();
    start_date.setMinutes(start_date.getMinutes() + 5);
    return toIsoString(start_date);
}
