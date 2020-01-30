// show top scorers
function showTopScorer(data) {

    if (data.season.winner == null) {
        data.season.winner = "-"
    };

    // header
    let header_scorers = `
    <div class="col s6">
        <h5>Competition:</h5>
        Name : ${data.competition.name}<br>
        Area : ${data.competition.area.name}<br><br>
        Winner : ${data.season.winner}
    </div>
    <div class="col s6">
        <h5>Season:</h5>
        Start Time : ${data.season.startDate}<br>
        End Time : ${data.season.endDate}<br>
        Current Matchday : ${data.season.currentMatchday}<br>
    </div>`;

    // table
    let table_scorers = `
    <table class="striped responsive-table">
        <thead>
            <tr>
                <th>Name</th>
                <th>Team</th>
                <th>Goals</th>
                <th>Action</th>
            </tr>
        </thead>

        <tbody>
        `;

    // looping scorer
    data.scorers.forEach(function (scorer) {
        table_scorers += `
            <tr>
                <td>${scorer.player.name}</td>
                <td>${scorer.team.name}</td>
                <td>${scorer.numberOfGoals}</td>
                <td><a class="waves-effect waves-light btn-small" href="./players.html?id=${scorer.player.id}">detail</a></td>
            </tr>
          `;

    });
    table_scorers += `</tbody></table>`;

    // Sisipkan komponen card ke dalam elemen dengan id #content
    document.getElementById("header-scorers").innerHTML = header_scorers;
    document.getElementById("table-scorers").innerHTML = table_scorers;
}

// show detail player
function showDetailPlayer(data) {

    if (data.lastName == null) {
        data.lastName = "-"
    };
    if (data.shirtNumber == null) {
        data.shirtNumber = "-"
    };

    let player_detail = `
    <h4 class="center-align">${data.name}</h4>

    <div class="card-content">
        <table class="row">
            <tr class="">
                <th>First Name</th>
                <td>:</td>
                <td>${data.firstName}</td>
            </tr>
            <tr class="">
                <th>Last Name</th>
                <td>:</td>
                <td>${data.lastName}</td>
            </tr>
         
            <tr class="">
                <th>Date of Birth</th>
                <td>:</td>
                <td>${data.dateOfBirth}</td>
            </tr>
            <tr class="">
                <th>Country of Birth</th>
                <td>:</td>
                <td>${data.countryOfBirth}</td>
            </tr>
            </tr>
            <tr class="">
                <th>Nationality</th>
                <td>:</td>
                <td>${data.nationality}</td>
            </tr>
            </tr>
            <tr class="">
                <th>Position</th>
                <td>:</td>
                <td>${data.position}</td>
            </tr>
            <tr class="">
                <th>Shirt Number</th>
                <td>:</td>
                <td>${data.shirtNumber}</td>
            </tr>
           
        </table>
    </div>
    `;

    document.getElementById("body-content").innerHTML += player_detail;
}

// show daftar league
function showLeague(leagues) {

    let header_league = `
    <div class="col s6">
    <h5>Competition:</h5>
    Name : ${leagues.competition.name}<br>
    Area : ${leagues.competition.area.name}<br>

    </div>
    <div class="col s6">
        <h5>Season: </h5>
        Start Time : ${leagues.season.startDate}<br>
        End Time : ${leagues.season.endDate}<br>
        Current Matchday : ${leagues.season.currentMatchday}<br><br>
    </div>`;

    let table_league = `
    
        <thead>
        <tr>
            <th class="center-align">Pos.</th>
            <th>Team</th>
            <th class="center-align">Played</th>
            <th class="center-align">Won</th>
            <th class="center-align">Draw</th>
            <th class="center-align">Lost</th>
            <th class="center-align">Action</th>
        </tr>
    </thead>

    <tbody>
    `;

    leagues.standings[0].table.forEach(function (league) {

        // ganti url http menjadi https
        league.team.crestUrl = league.team.crestUrl.replace(/^http:\/\//i, 'https://');

        table_league += `
            <tr>
                <th class="center-align">${league.position}</th>
                <td>
                <div class="hide-on-small-only">
                    <img class = "show-on-medium-and-up show-on-medium-and-down" src=${league.team.crestUrl} style="float:left; width:30px; height:30px; margin-right:20px">
                    ${league.team.name}
                </div>
               
                    <img src="${league.team.crestUrl}"  class="hide-on-med-and-up" style="width:25px;height:25px;">
                
                </td>
                <td class="center-align">${league.playedGames}</td>
                <td class="center-align">${league.won}</td>
                <td class="center-align">${league.draw}</td>
                <td class="center-align">${league.lost}</td>
                <td class="center-align">
                    <a href="./teams.html?id=${league.team.id}"class="btn-small">Detail</a>
                </td>
            </tr>`;


    });

    table_league += `</tbody>`;

    document.getElementById("header-league").innerHTML = header_league;
    document.getElementById("table-league").innerHTML = table_league;

}

// show detail team
function showDetailTeam(team) {

    // ganti url http menjadi https
    team.crestUrl = team.crestUrl.replace(/^http:\/\//i, 'https://');

    let detail_team = ``;
    detail_team = `
    <div class="center-align"> 
        <img class="center-align" width="130" src="${team.crestUrl}" style="margin-top:20px;">
        <h6>${team.name}</h6>
        <hr>
    </div>
    <table>
          <tr>
              <th>Name</th>
              <td>:</td>
              <td>${team.name}</td>
          </tr>
          <tr>
              <th>Short Name</th>
              <td>:</td>
              <td>${team.shortName}</td>
          </tr>
          <tr>
              <th>Address</th>
              <td>:</td>
              <td>${team.address}</td>
          </tr>
          <tr>
              <th>Phone</th>
              <td>:</td>
              <td>${team.phone}</td>
          </tr>
          <tr>
              <th>Website</th>
              <td>:</td>
              <td>${team.website}</td>
          </tr>
          <tr>
              <th>Email</th>
              <td>:</td>
              <td>${team.email}</td>
          </tr>
          <tr>
              <th>Founded</th>
              <td>:</td>
              <td>${team.founded}</td>
          </tr>
          <tr>
              <th>Club Colors</th>
              <td>:</td>
              <td>${team.clubColors}</td>
          </tr>
          <tr>
              <th>Venue</th>
              <td>:</td>
              <td>${team.venue}</td>
          </tr>
      </table>
      <br>
    `;

    document.getElementById('body-content').innerHTML = detail_team;

}