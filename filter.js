url = chrome.runtime.getURL('brands.json');
var data = "";

fetch(url)
  .then(
    function(response) {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' +
          response.status);
        return;
      }

      // Examine the text in the response
      response.json().then(function(json) {
        for (brand of json.brands) {
          data = data.concat(brand, ",");
        }

        data = data.substring(0, data.length - 1);
      });
    }
  )
  .catch(function(err) {
    console.log('Fetch Error :-S', err);
  });

var filterOptions = document.getElementsByClassName("vertical-filters-filters header-container");
if (filterOptions) {
  var button = document.createElement("SPAN");
  button.setAttribute("id", "premium-button");
  button.innerHTML = "PREMIUM";
  filterOptions[0].appendChild(button);
  button.addEventListener("click", function() {
    var searchParams = new URLSearchParams(window.location.search);
    if ('URLSearchParams' in window) {
      if (searchParams.has('f')) {
        var fields = searchParams.get("f");
        if (fields.includes("Brand")) {
          if (fields.length > 2000) {
            data = "".concat(":", data);
            fields = fields.replace(/:[^:]*/, data);
          }
          else {
            data = "".concat(":", data, ",");
            fields = fields.replace(/:/, data);
          }
        }
        else {
          data = "".concat("Brand:", data, "::");
          fields = fields.replace(/^/, data);
        }
      }
      else {
        fields = "".concat("Brand:", data);
      }
      searchParams.set("f", fields);
      window.location.search = searchParams.toString();
    }
    else {
      alert("URLSearchParams error!");
    }
  });
}
