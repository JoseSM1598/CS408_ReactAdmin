export default function getCoordinates(searchText) {
  function apiCall() {
    fetch("https://mywebsite.com/endpoint/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        firstParam: "yourValue",
        secondParam: "yourOtherValue"
      })
    });
  }

  return;
}
