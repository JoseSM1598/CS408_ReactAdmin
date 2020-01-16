export default function filterResults(searchText, maxResults, data) {
    return data
        .filter(item => {
            if (item.name.toLowerCase().includes(searchText.toLowerCase())) {
                return true;
            }
            return false;
        })
        .slice(0, maxResults);
}
