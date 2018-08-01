module.exports = {

    formatPhoneNumber: function (phone) {
        phone = phone.replace(/\D/g,"");
        phone = phone.replace(/^(\d{2})(\d)/g,"($1) $2");
        phone = phone.replace(/(\d)(\d{4})$/,"$1-$2");
        return phone;
    },

    validateEmail: function (email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    },

    dateFormatter: function (date){
        var newDate = new Date(date);

        var day = newDate.getDate();
        if (day.toString().length == 1) day = "0"+day;
        
        var month = newDate.getMonth()+1;
        if (month.toString().length == 1) month = "0"+month;
        
        var year = newDate.getFullYear();  
        return day+"/"+month+"/"+year;
    },

    buildSqlWhereClause: function (items) {

        if (!Array.isArray(items)) return 'Type is not an Array';
        
        var conditions = new Array();
        items.forEach(function (value) {
            conditions.push(value);
        });

        return conditions == "" ? "" : " WHERE " + conditions.join(" AND "); 
    },

};