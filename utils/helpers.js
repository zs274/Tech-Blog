// edit 

module.exports = {
    format_date: (data) => {
        return `${new Date(date).getMonth() + 1}/${new Date(data).getDate()}/${new Date(date).getFullYear()}`
    }
};