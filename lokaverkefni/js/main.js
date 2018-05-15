let concertsJson = $.ajax({
  'url': 'http://apis.is/concerts',
  'type': 'GET',
  'dataType': 'json',
  'success': function(response) {
    console.log(response);
  }
});

let mainFeatures = document.getElementById("mainFeatures");

let concerts = JSON.parse(concertsJson);

let htmlCode = "";

for(let key in concerts.results){
    
    htmlCode += '<li class="item"><a href="/tonleikar/" class="feature" itemscope itemtype="http://schema.org/MusicEvent"><div class="artwork"><div id="1_10185" class="zoom" style="background-image:url(';
    htmlCode += concerts.results[key].imageSource;
    htmlCode += ');"></div></div><div class="caption"><div class="type music">T&#243;nleikar</div><div class="title"><h2 itemprop="name">';
    htmlCode += concerts.results[key].eventDateName;
    htmlCode += '</h2></div><div class="venue" itemprop="location">';
    htmlCode += concerts.results[key].eventHallName;
    htmlCode += '</div></div></a></li>';
}

mainFeatures.innerHTML = htmlCode;

