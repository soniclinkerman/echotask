const moment = require("moment");

const formatDate = (date) => {
  return moment(date).format("MM/DD/YYYY");
};

export default formatDate;
