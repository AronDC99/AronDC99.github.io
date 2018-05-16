

function loadDataStuff(){
    var concertsJson = $.ajax({
      'url': 'https://apis.is/concerts',
      'type': 'GET',
      'dataType': 'json',
      'success': function(response) {
        let mainFeatures = document.getElementById("mainFeatures");

        let htmlCode = '';



        for(let i = 0; i < 16;i++ ){

            let concert = concertsJson.responseJSON.results[i];
            let li = '<li class="item"><a href="/tonleikar/" class="feature" itemscope itemtype="http://schema.org/MusicEvent"><div class="artwork"><div id="1_10185" class="zoom" style="background-image:url(';
            li += concert.imageSource;
            li += ');"></div></div><div class="caption"><div class="type music">T&#243;nleikar</div><div class="title"><h2 itemprop="name">';
            li += concert.eventDateName;
            li += '</h2></div><div class="venue" itemprop="location">';
            li += concert.eventHallName;
            li += '</div></div></a></li>';

            htmlCode += li;
        }

        mainFeatures.innerHTML = htmlCode;
      }
    }
)}
                  
    
loadDataStuff();
    