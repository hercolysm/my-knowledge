let result = [
    { "teamid": "111" },
    { "teamid": "111" },
    { "teamid": "222" },
];

let teams = [];

for (var i = 0; i < result.length; i++) {

    let teamid = result[i].teamid;

    if (teams.indexOf(teamid) === -1) {
        teams.push(teamid);
    }
}

console.log(teams); // Result: ['111', '222']
