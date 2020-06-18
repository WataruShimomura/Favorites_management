const listTitleFormatter = (listTitle: String) => {
  return listTitle.length > 17 ? listTitle.substr(0, 17) + '...' : listTitle;
};

export default listTitleFormatter;
