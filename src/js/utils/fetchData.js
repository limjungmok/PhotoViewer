const fetchData = (path, callback) => {   
  const xObj = new XMLHttpRequest();
  xObj.open('GET', path, true);
  xObj.onreadystatechange = () => {
    if (xObj.readyState == 4 && xObj.status == "200") {
      callback(xObj.responseText);
    }
  };
  xObj.send();  
};

export default fetchData;