var moment = require("moment");

function queDiaFue(dias){
    return moment().subtract(dias, 'days').calendar()
}

module.exports =  {queDiaFue : queDiaFue} 