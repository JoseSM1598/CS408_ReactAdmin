export default function parseAddress(str, area) {
  var http = "https://maps.googleapis.com/maps/api/geocode/json?address=";
  var key = "AIzaSyDQKkNsepBOaIiSSp4OUIFZGKmCOFTrho4";

  str.replace(" ", "+");
  var request = http.concat(str, area, "&key=", key);

  return request;
}
