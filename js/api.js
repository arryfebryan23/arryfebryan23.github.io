const api_key = "7aa24b80e1fa43c4a5db74df99977c57";

// end point footbal.org
const ep_player = "https://api.football-data.org/v2/players/";
const ep_top_scorer = "https://api.football-data.org/v2/competitions/SA/scorers";
const ep_league_germany = 'https://api.football-data.org/v2/competitions/2002/standings';
const ep_team = 'https://api.football-data.org/v2/teams/';

// fetch API dengan headers
var fetchApi = url => {
  return fetch(url, {
    headers: {
      'X-Auth-Token': api_key
    }
  });
}

// Blok kode yang akan di panggil jika fetch berhasil
function status(response) {
  if (response.status !== 200) {
    console.log("Error : " + response.status);
    return Promise.reject(new Error(response.statusText));
  } else {
    return Promise.resolve(response);
  }
}

// Blok kode untuk memparsing json menjadi array JavaScript
function json(response) {
  return response.json();
}

// Blok kode untuk meng-handle kesalahan di blok catch
function error(error) {
  console.log("Error : " + error);
}

/////////////////////////////////////////////////////////////////////////////////////////

// Get Top 10 Scorers
function getTopScorers() {
  // Jika ada data dalam chace ambil chace
  if ('caches' in window) {
    caches.match(ep_top_scorer).then(function (response) {
      if (response) {
        response.json().then(function (data) {
          showTopScorer(data);
        })
      }
    })
  }

  // Jika data tidak ada dalam chace request url
  fetchApi(ep_top_scorer)
    .then(status)
    .then(json)
    .then(function (data) {
      showTopScorer(data)
    })
    .catch(error);
}

// Get detail player
function getDetailPlayerById() {
  return new Promise(function (resolve, reject) {
    // Ambil nilai query parameter (?id=)
    var urlParams = new URLSearchParams(window.location.search);
    var idParam = urlParams.get("id");

    if ('caches' in window) {
      caches.match(ep_player + idParam).then(function (response) {
        if (response) {
          response.json().then(function (data) {
            resolve(data)
          });
        }
      });
    }

    fetchApi(ep_player + idParam)
      .then(status)
      .then(json)
      .then(function (data) {
        showDetailPlayer(data);
        resolve(data);
      })
      .catch(error);
  });
}

// Get saved player from indexed DB
function getSavedPlayers() {
  getAll('players').then(function (players) {
    let cardPlayerHTML = '<h4 class="center-align"> Saved Players </h4>';

    if (players == '') {
      cardPlayerHTML += '<br><p class="center-align">Kamu belum menyimpan data apapun</p>'
      document.getElementById('players').innerHTML = cardPlayerHTML;
      return;
    }

    players.forEach(function (player) {
      player = player.value;

      cardPlayerHTML += `
     
      <div class="card horizontal">

          <div class="card-stacked">
              <div class="card-content">
                ${player.name}
                <a href="./players.html?id=${player.id}&saved=true" class="secondary-content btn-small">detail</a>
              </div> 
          </div>

        </div>
     
      `;
    })
    document.getElementById('players').innerHTML = cardPlayerHTML;
    console.log('Data didapatkan dari indexed DB..')
  });

}

// Get saved player from indexed DB
function getSavedPlayerById() {
  return new Promise(function (resolve, reject) {

    var urlParams = new URLSearchParams(window.location.search);
    var idParam = urlParams.get("id");

    idParam = parseInt(idParam);

    getById(idParam, 'players').then(function (data) {
      data = data.value;
      showDetailPlayer(data);
      console.log('Data didapatkan dari indexed DB..')
      resolve(data);
    });
  });
}

/////////////////////////////////////////////////////////////////////////////////////////

function getLeague() {
  // Jika ada data dalam chace ambil chace
  if ('caches' in window) {
    caches.match(ep_league_germany).then(function (response) {
      if (response) {
        response.json().then(function (data) {
          console.log('Data didapat dari chace');
          showLeague(data);
        })
      }
    })
  }

  // Jika data tidak ada dalam chace request url
  fetchApi(ep_league_germany)
    .then(status)
    .then(json)
    .then(function (data) {
      console.log('Data didapat dari fetch url');
      showLeague(data);
    })
    .catch(error);
}



// Get detail player
function getTeamById() {
  return new Promise(function (resolve, reject) {
    // Ambil nilai query parameter (?id=)
    var urlParams = new URLSearchParams(window.location.search);
    var idParam = urlParams.get("id");


    if ('caches' in window) {
      caches.match(ep_team + idParam).then(function (response) {
        if (response) {
          response.json().then(function (data) {
            showDetailTeam(data);
            resolve(data)
          });
        }
      });
    }

    fetchApi(ep_team + idParam)
      .then(status)
      .then(json)
      .then(function (data) {
        showDetailTeam(data);
        resolve(data);
      })
      .catch(error);

  });
}


// Get saved player from indexed DB
function getSavedTeams() {
  getAll('teams').then(function (teams) {
    let cardTeamHTML = '<h4 class="center-align"> Saved Teams </h4>';

    if (teams == '') {
      cardTeamHTML += '<br><p class="center-align">Kamu belum menyimpan data apapun</p>'
      document.getElementById('teams').innerHTML = cardTeamHTML;
      return;
    }

    teams.forEach(function (team) {
      team = team.value;

      cardTeamHTML += `
     
      <div class="card horizontal">

          <div class="card-stacked">
              <div class="card-content">
              <img class="center-align" width="55" src="${team.crestUrl}" style="float:left; margin-right:20px;">
                ${team.name}
                <a href="./teams.html?id=${team.id}&saved=true" class="secondary-content btn-small">detail</a>
              </div> 
          </div>

        </div>
     
      `;
    })
    document.getElementById('teams').innerHTML = cardTeamHTML;
    console.log('Data didapatkan dari indexed DB..')
  });

}

// Get saved player from indexed DB
function getSavedTeamById() {
  return new Promise(function (resolve, reject) {

    var urlParams = new URLSearchParams(window.location.search);
    var idParam = urlParams.get("id");

    idParam = parseInt(idParam);

    getById(idParam, 'teams').then(function (team) {
      team = team.value;
      showDetailTeam(team);
      console.log('Data didapatkan dari indexed DB..')
      resolve(team);
    });
  });
}
