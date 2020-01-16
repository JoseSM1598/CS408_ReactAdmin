export default function filterResults(searchText, maxResults, data, searchBy) {
  function checkName(item) {
    if (
      item
        .getSpace()
        .getName()
        .toLowerCase()
        .includes(searchText.toLowerCase())
    ) {
      return true;
    }
  }

  function checkAlias(item) {
    var word;
    for (word of item.getAliasList()) {
      if (word.toLowerCase().includes(searchText.toLowerCase())) {
        return true;
      }
    }
    return false;
  }

  function checkID(item) {
    if (
      item
        .getSpace()
        .getSpaceId()
        .toLowerCase()
        .includes(searchText.toLowerCase())
    ) {
      return true;
    }
  }

  return data
    .filter(item => {
      if (searchBy == "searchbyname") {
        if (checkName(item)) {
          return true;
        }
        if (checkAlias(item)) {
          return true;
        }
      }
      if (searchBy == "searchbyID") {
        if (checkID(item)) {
          return true;
        }
      }
      return false;
    })
    .slice(0, maxResults);
}
