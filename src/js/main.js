(() => {
  var jsonPre = document.querySelector('.json-file');
  var xhr = new XMLHttpRequest();
  xhr.open('GET', '/package.json');
  xhr.send(null);
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      jsonPre.innerHTML = xhr.responseText;
    }
  }
})();
