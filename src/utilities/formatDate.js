const formatDate = (date) => {
  return !date ? "" : date.getFullYear() + "-" + (date.getMonth()+1).toString().padStart(2, '0') + "-" + (date.getDate()).toString().padStart(2, '0');
};

export default formatDate;