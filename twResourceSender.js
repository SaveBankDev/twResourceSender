/*
* Script Name: Resource Sender
* Version: v1.0.0
* Last Updated: 2024-11-26
* Author: SaveBank
* Author Contact: Discord: savebank
* Contributor:  
* Approved: 
* Approved Date: 
* Mod: 
*/

/*
    NAME: Tribal Wars Scripts Library
    VERSION: 1.1.8 (beta version)
    LAST UPDATED AT: 2024-05-15
    AUTHOR: RedAlert (redalert_tw)
    AUTHOR URL: https://twscripts.dev/
    CONTRIBUTORS: Shinko to Kuma; Sass, SaveBankDev, DSsecundum, suilenroc
    HELP: https://github.com/RedAlertTW/Tribal-Wars-Scripts-SDK
    STATUS: Work in progress. Not finished 100%.

    This software is provided 'as-is', without any express or implied warranty.
    In no event will the author/s be held liable for any damages arising from the use of this software.
    It is allowed to clone, rehost, re-distribute and all other forms of copying this code without permission from the author/s, for as long as it is not used on commercial products.
    This notice may not be removed or altered from any source distribution.
 */

scriptUrl = document.currentScript.src;

window.twSDK = {
    // variables
    scriptData: {},
    translations: {},
    allowedMarkets: [],
    allowedScreens: [],
    allowedModes: [],
    enableCountApi: true,
    isDebug: false,
    isMobile: jQuery('#mobileHeader').length > 0,
    delayBetweenRequests: 200,
    // helper variables
    market: game_data.market,
    units: game_data.units,
    village: game_data.village,
    buildings: game_data.village.buildings,
    sitterId: game_data.player.sitter > 0 ? `&t=${game_data.player.id}` : '',
    coordsRegex: /\d{1,3}\|\d{1,3}/g,
    dateTimeMatch:
        /(?:[A-Z][a-z]{2}\s+\d{1,2},\s*\d{0,4}\s+|today\s+at\s+|tomorrow\s+at\s+)\d{1,2}:\d{2}:\d{2}:?\.?\d{0,3}/,
    worldInfoInterface: '/interface.php?func=get_config',
    unitInfoInterface: '/interface.php?func=get_unit_info',
    buildingInfoInterface: '/interface.php?func=get_building_info',
    worldDataVillages: '/map/village.txt',
    worldDataPlayers: '/map/player.txt',
    worldDataTribes: '/map/ally.txt',
    worldDataConquests: '/map/conquer_extended.txt',
    // game constants
    // https://help.tribalwars.net/wiki/Points
    buildingPoints: {
        main: [
            10, 2, 2, 3, 4, 4, 5, 6, 7, 9, 10, 12, 15, 18, 21, 26, 31, 37, 44,
            53, 64, 77, 92, 110, 133, 159, 191, 229, 274, 330,
        ],
        barracks: [
            16, 3, 4, 5, 5, 7, 8, 9, 12, 14, 16, 20, 24, 28, 34, 42, 49, 59, 71,
            85, 102, 123, 147, 177, 212,
        ],
        stable: [
            20, 4, 5, 6, 6, 9, 10, 12, 14, 17, 21, 25, 29, 36, 43, 51, 62, 74,
            88, 107,
        ],
        garage: [24, 5, 6, 6, 9, 10, 12, 14, 17, 21, 25, 29, 36, 43, 51],
        chuch: [10, 2, 2],
        church_f: [10],
        watchtower: [
            42, 8, 10, 13, 14, 18, 20, 25, 31, 36, 43, 52, 62, 75, 90, 108, 130,
            155, 186, 224,
        ],
        snob: [512],
        smith: [
            19, 4, 4, 6, 6, 8, 10, 11, 14, 16, 20, 23, 28, 34, 41, 49, 58, 71,
            84, 101,
        ],
        place: [0],
        statue: [24],
        market: [
            10, 2, 2, 3, 4, 4, 5, 6, 7, 9, 10, 12, 15, 18, 21, 26, 31, 37, 44,
            53, 64, 77, 92, 110, 133,
        ],
        wood: [
            6, 1, 2, 1, 2, 3, 3, 3, 5, 5, 6, 8, 8, 11, 13, 15, 19, 22, 27, 32,
            38, 46, 55, 66, 80, 95, 115, 137, 165, 198,
        ],
        stone: [
            6, 1, 2, 1, 2, 3, 3, 3, 5, 5, 6, 8, 8, 11, 13, 15, 19, 22, 27, 32,
            38, 46, 55, 66, 80, 95, 115, 137, 165, 198,
        ],
        iron: [
            6, 1, 2, 1, 2, 3, 3, 3, 5, 5, 6, 8, 8, 11, 13, 15, 19, 22, 27, 32,
            38, 46, 55, 66, 80, 95, 115, 137, 165, 198,
        ],
        farm: [
            5, 1, 1, 2, 1, 2, 3, 3, 3, 5, 5, 6, 8, 8, 11, 13, 15, 19, 22, 27,
            32, 38, 46, 55, 66, 80, 95, 115, 137, 165,
        ],
        storage: [
            6, 1, 2, 1, 2, 3, 3, 3, 5, 5, 6, 8, 8, 11, 13, 15, 19, 22, 27, 32,
            38, 46, 55, 66, 80, 95, 115, 137, 165, 198,
        ],
        hide: [5, 1, 1, 2, 1, 2, 3, 3, 3, 5],
        wall: [
            8, 2, 2, 2, 3, 3, 4, 5, 5, 7, 9, 9, 12, 15, 17, 20, 25, 29, 36, 43,
        ],
    },
    unitsFarmSpace: {
        spear: 1,
        sword: 1,
        axe: 1,
        archer: 1,
        spy: 2,
        light: 4,
        marcher: 5,
        heavy: 6,
        ram: 5,
        catapult: 8,
        knight: 10,
        snob: 100,
    },
    // https://help.tribalwars.net/wiki/Timber_camp
    // https://help.tribalwars.net/wiki/Clay_pit
    // https://help.tribalwars.net/wiki/Iron_mine
    resPerHour: {
        0: 2,
        1: 30,
        2: 35,
        3: 41,
        4: 47,
        5: 55,
        6: 64,
        7: 74,
        8: 86,
        9: 100,
        10: 117,
        11: 136,
        12: 158,
        13: 184,
        14: 214,
        15: 249,
        16: 289,
        17: 337,
        18: 391,
        19: 455,
        20: 530,
        21: 616,
        22: 717,
        23: 833,
        24: 969,
        25: 1127,
        26: 1311,
        27: 1525,
        28: 1774,
        29: 2063,
        30: 2400,
    },
    watchtowerLevels: [
        1.1, 1.3, 1.5, 1.7, 2, 2.3, 2.6, 3, 3.4, 3.9, 4.4, 5.1, 5.8, 6.7, 7.6,
        8.7, 10, 11.5, 13.1, 15,
    ],

    // internal methods
    _initDebug: function () {
        const scriptInfo = this.scriptInfo();
        console.debug(`${scriptInfo} It works 🚀!`);
        console.debug(`${scriptInfo} HELP:`, this.scriptData.helpLink);
        if (this.isDebug) {
            console.debug(`${scriptInfo} Market:`, game_data.market);
            console.debug(`${scriptInfo} World:`, game_data.world);
            console.debug(`${scriptInfo} Screen:`, game_data.screen);
            console.debug(
                `${scriptInfo} Game Version:`,
                game_data.majorVersion
            );
            console.debug(`${scriptInfo} Game Build:`, game_data.version);
            console.debug(`${scriptInfo} Locale:`, game_data.locale);
            console.debug(
                `${scriptInfo} PA:`,
                game_data.features.Premium.active
            );
            console.debug(
                `${scriptInfo} LA:`,
                game_data.features.FarmAssistent.active
            );
            console.debug(
                `${scriptInfo} AM:`,
                game_data.features.AccountManager.active
            );
        }
    },

    // public methods
    addGlobalStyle: function () {
        return `
            /* Table Styling */
            .ra-table-container { overflow-y: auto; overflow-x: hidden; height: auto; max-height: 400px; }
            .ra-table th { font-size: 14px; }
            .ra-table th label { margin: 0; padding: 0; }
            .ra-table th,
            .ra-table td { padding: 5px; text-align: center; }
            .ra-table td a { word-break: break-all; }
            .ra-table a:focus { color: blue; }
            .ra-table a.btn:focus { color: #fff; }
            .ra-table tr:nth-of-type(2n) td { background-color: #f0e2be }
            .ra-table tr:nth-of-type(2n+1) td { background-color: #fff5da; }

            .ra-table-v2 th,
            .ra-table-v2 td { text-align: left; }

            .ra-table-v3 { border: 2px solid #bd9c5a; }
            .ra-table-v3 th,
            .ra-table-v3 td { border-collapse: separate; border: 1px solid #bd9c5a; text-align: left; }

            /* Inputs */
            .ra-textarea { width: 100%; height: 80px; resize: none; }

            /* Popup */
            .ra-popup-content { width: 360px; }
            .ra-popup-content * { box-sizing: border-box; }
            .ra-popup-content input[type="text"] { padding: 3px; width: 100%; }
            .ra-popup-content .btn-confirm-yes { padding: 3px !important; }
            .ra-popup-content label { display: block; margin-bottom: 5px; font-weight: 600; }
            .ra-popup-content > div { margin-bottom: 15px; }
            .ra-popup-content > div:last-child { margin-bottom: 0 !important; }
            .ra-popup-content textarea { width: 100%; height: 100px; resize: none; }

            /* Elements */
            .ra-details { display: block; margin-bottom: 8px; border: 1px solid #603000; padding: 8px; border-radius: 4px; }
            .ra-details summary { font-weight: 600; cursor: pointer; }
            .ra-details p { margin: 10px 0 0 0; padding: 0; }

            /* Helpers */
            .ra-pa5 { padding: 5px !important; }
            .ra-mt15 { margin-top: 15px !important; }
            .ra-mb10 { margin-bottom: 10px !important; }
            .ra-mb15 { margin-bottom: 15px !important; }
            .ra-tal { text-align: left !important; }
            .ra-tac { text-align: center !important; }
            .ra-tar { text-align: right !important; }

            /* RESPONSIVE */
            @media (max-width: 480px) {
                .ra-fixed-widget {
                    position: relative !important;
                    top: 0;
                    left: 0;
                    display: block;
                    width: auto;
                    height: auto;
                    z-index: 1;
                }

                .ra-box-widget {
                    position: relative;
                    display: block;
                    box-sizing: border-box;
                    width: 97%;
                    height: auto;
                    margin: 10px auto;
                }

                .ra-table {
                    border-collapse: collapse !important;
                }

                .custom-close-button { display: none; }
                .ra-fixed-widget h3 { margin-bottom: 15px; }
                .ra-popup-content { width: 100%; }
            }
        `;
    },
    arraysIntersection: function () {
        var result = [];
        var lists;

        if (arguments.length === 1) {
            lists = arguments[0];
        } else {
            lists = arguments;
        }

        for (var i = 0; i < lists.length; i++) {
            var currentList = lists[i];
            for (var y = 0; y < currentList.length; y++) {
                var currentValue = currentList[y];
                if (result.indexOf(currentValue) === -1) {
                    var existsInAll = true;
                    for (var x = 0; x < lists.length; x++) {
                        if (lists[x].indexOf(currentValue) === -1) {
                            existsInAll = false;
                            break;
                        }
                    }
                    if (existsInAll) {
                        result.push(currentValue);
                    }
                }
            }
        }
        return result;
    },
    buildUnitsPicker: function (
        selectedUnits = [],
        unitsToIgnore,
        type = 'checkbox'
    ) {
        let unitsTable = ``;

        let thUnits = ``;
        let tableRow = ``;

        game_data.units.forEach((unit) => {
            if (!unitsToIgnore.includes(unit)) {
                let checked = '';
                if (selectedUnits.includes(unit)) {
                    checked = `checked`;
                }

                thUnits += `
                    <th class="ra-tac">
                        <label for="unit_${unit}">
                            <img src="/graphic/unit/unit_${unit}.png">
                        </label>
                    </th>
                `;

                tableRow += `
                    <td class="ra-tac">
                        <input name="ra_chosen_units" type="${type}" ${checked} id="unit_${unit}" class="ra-unit-selector" value="${unit}" />
                    </td>
                `;
            }
        });

        unitsTable = `
            <table class="ra-table ra-table-v2" width="100%" id="raUnitSelector">
                <thead>
                    <tr>
                        ${thUnits}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        ${tableRow}
                    </tr>
                </tbody>
            </table>
        `;

        return unitsTable;
    },
    calculateCoinsNeededForNthNoble: function (noble) {
        return (noble * noble + noble) / 2;
    },
    calculateDistanceFromCurrentVillage: function (coord) {
        const x1 = game_data.village.x;
        const y1 = game_data.village.y;
        const [x2, y2] = coord.split('|');
        const deltaX = Math.abs(x1 - x2);
        const deltaY = Math.abs(y1 - y2);
        return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    },
    calculateDistance: function (from, to) {
        const [x1, y1] = from.split('|');
        const [x2, y2] = to.split('|');
        const deltaX = Math.abs(x1 - x2);
        const deltaY = Math.abs(y1 - y2);
        return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    },
    calculatePercentages: function (amount, total) {
        if (amount === undefined) amount = 0;
        return parseFloat((amount / total) * 100).toFixed(2);
    },
    calculateTimesByDistance: async function (distance) {
        const _self = this;

        const times = [];
        const travelTimes = [];

        const unitInfo = await _self.getWorldUnitInfo();
        const worldConfig = await _self.getWorldConfig();

        for (let [key, value] of Object.entries(unitInfo.config)) {
            times.push(value.speed);
        }

        const { speed, unit_speed } = worldConfig.config;

        times.forEach((time) => {
            let travelTime = Math.round(
                (distance * time * 60) / speed / unit_speed
            );
            travelTime = _self.secondsToHms(travelTime);
            travelTimes.push(travelTime);
        });

        return travelTimes;
    },
    checkValidLocation: function (type) {
        switch (type) {
            case 'screen':
                return this.allowedScreens.includes(
                    this.getParameterByName('screen')
                );
            case 'mode':
                return this.allowedModes.includes(
                    this.getParameterByName('mode')
                );
            default:
                return false;
        }
    },
    checkValidMarket: function () {
        if (this.market === 'yy') return true;
        return this.allowedMarkets.includes(this.market);
    },
    cleanString: function (string) {
        try {
            return decodeURIComponent(string).replace(/\+/g, ' ');
        } catch (error) {
            console.error(error, string);
            return string;
        }
    },
    copyToClipboard: function (string) {
        navigator.clipboard.writeText(string);
    },
    createUUID: function () {
        return crypto.randomUUID();
    },
    csvToArray: function (strData, strDelimiter = ',') {
        var objPattern = new RegExp(
            '(\\' +
                strDelimiter +
                '|\\r?\\n|\\r|^)' +
                '(?:"([^"]*(?:""[^"]*)*)"|' +
                '([^"\\' +
                strDelimiter +
                '\\r\\n]*))',
            'gi'
        );
        var arrData = [[]];
        var arrMatches = null;
        while ((arrMatches = objPattern.exec(strData))) {
            var strMatchedDelimiter = arrMatches[1];
            if (
                strMatchedDelimiter.length &&
                strMatchedDelimiter !== strDelimiter
            ) {
                arrData.push([]);
            }
            var strMatchedValue;

            if (arrMatches[2]) {
                strMatchedValue = arrMatches[2].replace(
                    new RegExp('""', 'g'),
                    '"'
                );
            } else {
                strMatchedValue = arrMatches[3];
            }
            arrData[arrData.length - 1].push(strMatchedValue);
        }
        return arrData;
    },
    decryptString: function (str) {
        const alphabet =
            'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 !"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~';
        let decryptedStr = '';

        for (let i = 0; i < str.length; i++) {
            const char = str[i];
            const index = alphabet.indexOf(char);

            if (index === -1) {
                // Character is not in the alphabet, leave it as-is
                decryptedStr += char;
            } else {
                // Substitue the character with its corresponding shifted character
                const shiftedIndex = (index - 3 + 94) % 94;
                decryptedStr += alphabet[shiftedIndex];
            }
        }

        return decryptedStr;
    },
    encryptString: function (str) {
        const alphabet =
            'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 !"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~';
        let encryptedStr = '';

        for (let i = 0; i < str.length; i++) {
            const char = str[i];
            const index = alphabet.indexOf(char);

            if (index === -1) {
                // Character is not in the alphabet, leave it as-is
                encryptedStr += char;
            } else {
                // Substitue the character with its corresponding shifted character
                const shiftedIndex = (index + 3) % 94;
                encryptedStr += alphabet[shiftedIndex];
            }
        }

        return encryptedStr;
    },
    filterVillagesByPlayerIds: function (playerIds, villages) {
        const playerVillages = [];
        villages.forEach((village) => {
            if (playerIds.includes(parseInt(village[4]))) {
                const coordinate = village[2] + '|' + village[3];
                playerVillages.push(coordinate);
            }
        });
        return playerVillages;
    },
    formatAsNumber: function (number) {
        return parseInt(number).toLocaleString('de');
    },
    formatDateTime: function (dateTime) {
        dateTime = new Date(dateTime);
        return (
            this.zeroPad(dateTime.getDate(), 2) +
            '/' +
            this.zeroPad(dateTime.getMonth() + 1, 2) +
            '/' +
            dateTime.getFullYear() +
            ' ' +
            this.zeroPad(dateTime.getHours(), 2) +
            ':' +
            this.zeroPad(dateTime.getMinutes(), 2) +
            ':' +
            this.zeroPad(dateTime.getSeconds(), 2)
        );
    },
    frequencyCounter: function (array) {
        return array.reduce(function (acc, curr) {
            if (typeof acc[curr] == 'undefined') {
                acc[curr] = 1;
            } else {
                acc[curr] += 1;
            }
            return acc;
        }, {});
    },
    getAll: function (
        urls, // array of URLs
        onLoad, // called when any URL is loaded, params (index, data)
        onDone, // called when all URLs successfully loaded, no params
        onError // called when a URL load fails or if onLoad throws an exception, params (error)
    ) {
        var numDone = 0;
        var lastRequestTime = 0;
        var minWaitTime = this.delayBetweenRequests; // ms between requests
        loadNext();
        function loadNext() {
            if (numDone == urls.length) {
                onDone();
                return;
            }

            let now = Date.now();
            let timeElapsed = now - lastRequestTime;
            if (timeElapsed < minWaitTime) {
                let timeRemaining = minWaitTime - timeElapsed;
                setTimeout(loadNext, timeRemaining);
                return;
            }
            lastRequestTime = now;
            jQuery
                .get(urls[numDone])
                .done((data) => {
                    try {
                        onLoad(numDone, data);
                        ++numDone;
                        loadNext();
                    } catch (e) {
                        onError(e);
                    }
                })
                .fail((xhr) => {
                    onError(xhr);
                });
        }
    },
    getBuildingsInfo: async function () {
        const TIME_INTERVAL = 60 * 60 * 1000 * 24 * 365; // fetch config only once since they don't change
        const LAST_UPDATED_TIME =
            localStorage.getItem('buildings_info_last_updated') ?? 0;
        let buildingsInfo = [];

        if (LAST_UPDATED_TIME !== null) {
            if (Date.parse(new Date()) >= LAST_UPDATED_TIME + TIME_INTERVAL) {
                const response = await jQuery.ajax({
                    url: this.buildingInfoInterface,
                });
                buildingsInfo = this.xml2json(jQuery(response));
                localStorage.setItem(
                    'buildings_info',
                    JSON.stringify(buildingsInfo)
                );
                localStorage.setItem(
                    'buildings_info_last_updated',
                    Date.parse(new Date())
                );
            } else {
                buildingsInfo = JSON.parse(
                    localStorage.getItem('buildings_info')
                );
            }
        } else {
            const response = await jQuery.ajax({
                url: this.buildingInfoInterface,
            });
            buildingsInfo = this.xml2json(jQuery(response));
            localStorage.setItem('buildings_info', JSON.stringify(unitInfo));
            localStorage.setItem(
                'buildings_info_last_updated',
                Date.parse(new Date())
            );
        }

        return buildingsInfo;
    },
    getContinentByCoord: function (coord) {
        let [x, y] = Array.from(coord.split('|')).map((e) => parseInt(e));
        for (let i = 0; i < 1000; i += 100) {
            //x axes
            for (let j = 0; j < 1000; j += 100) {
                //y axes
                if (i >= x && x < i + 100 && j >= y && y < j + 100) {
                    let nr_continent =
                        parseInt(y / 100) + '' + parseInt(x / 100);
                    return nr_continent;
                }
            }
        }
    },
    getContinentsFromCoordinates: function (coordinates) {
        let continents = [];

        coordinates.forEach((coord) => {
            const continent = twSDK.getContinentByCoord(coord);
            continents.push(continent);
        });

        return [...new Set(continents)];
    },
    getCoordFromString: function (string) {
        if (!string) return [];
        return string.match(this.coordsRegex)[0];
    },
    getDestinationCoordinates: function (config, tribes, players, villages) {
        const {
            playersInput,
            tribesInput,
            continents,
            minCoord,
            maxCoord,
            distCenter,
            center,
            excludedPlayers,
            enable20To1Limit,
            minPoints,
            maxPoints,
            selectiveRandomConfig,
        } = config;

        // get target coordinates
        const chosenPlayers = playersInput.split(',');
        const chosenTribes = tribesInput.split(',');

        const chosenPlayerIds = twSDK.getEntityIdsByArrayIndex(
            chosenPlayers,
            players,
            1
        );
        const chosenTribeIds = twSDK.getEntityIdsByArrayIndex(
            chosenTribes,
            tribes,
            2
        );

        const tribePlayers = twSDK.getTribeMembersById(chosenTribeIds, players);

        const mergedPlayersList = [...tribePlayers, ...chosenPlayerIds];
        let uniquePlayersList = [...new Set(mergedPlayersList)];

        const chosenExcludedPlayers = excludedPlayers.split(',');
        if (chosenExcludedPlayers.length > 0) {
            const excludedPlayersIds = twSDK.getEntityIdsByArrayIndex(
                chosenExcludedPlayers,
                players,
                1
            );
            excludedPlayersIds.forEach((item) => {
                uniquePlayersList = uniquePlayersList.filter(
                    (player) => player !== item
                );
            });
        }

        // filter by 20:1 rule
        if (enable20To1Limit) {
            let uniquePlayersListArray = [];
            uniquePlayersList.forEach((playerId) => {
                players.forEach((player) => {
                    if (parseInt(player[0]) === playerId) {
                        uniquePlayersListArray.push(player);
                    }
                });
            });

            const playersNotBiggerThen20Times = uniquePlayersListArray.filter(
                (player) => {
                    return (
                        parseInt(player[4]) <=
                        parseInt(game_data.player.points) * 20
                    );
                }
            );

            uniquePlayersList = playersNotBiggerThen20Times.map((player) =>
                parseInt(player[0])
            );
        }

        let coordinatesArray = twSDK.filterVillagesByPlayerIds(
            uniquePlayersList,
            villages
        );

        // filter by min and max village points
        if (minPoints || maxPoints) {
            let filteredCoordinatesArray = [];

            coordinatesArray.forEach((coordinate) => {
                villages.forEach((village) => {
                    const villageCoordinate = village[2] + '|' + village[3];
                    if (villageCoordinate === coordinate) {
                        filteredCoordinatesArray.push(village);
                    }
                });
            });

            filteredCoordinatesArray = filteredCoordinatesArray.filter(
                (village) => {
                    const villagePoints = parseInt(village[5]);
                    const minPointsNumber = parseInt(minPoints) || 26;
                    const maxPointsNumber = parseInt(maxPoints) || 12124;
                    if (
                        villagePoints > minPointsNumber &&
                        villagePoints < maxPointsNumber
                    ) {
                        return village;
                    }
                }
            );

            coordinatesArray = filteredCoordinatesArray.map(
                (village) => village[2] + '|' + village[3]
            );
        }

        // filter coordinates by continent
        if (continents.length) {
            let chosenContinentsArray = continents.split(',');
            chosenContinentsArray = chosenContinentsArray.map((item) =>
                item.trim()
            );

            const availableContinents =
                twSDK.getContinentsFromCoordinates(coordinatesArray);
            const filteredVillagesByContinent =
                twSDK.getFilteredVillagesByContinent(
                    coordinatesArray,
                    availableContinents
                );

            const isUserInputValid = chosenContinentsArray.every((item) =>
                availableContinents.includes(item)
            );

            if (isUserInputValid) {
                coordinatesArray = chosenContinentsArray
                    .map((continent) => {
                        if (continent.length && $.isNumeric(continent)) {
                            return [...filteredVillagesByContinent[continent]];
                        } else {
                            return;
                        }
                    })
                    .flat();
            } else {
                return [];
            }
        }

        // filter coordinates by a bounding box of coordinates
        if (minCoord.length && maxCoord.length) {
            const raMinCoordCheck = minCoord.match(twSDK.coordsRegex);
            const raMaxCoordCheck = maxCoord.match(twSDK.coordsRegex);

            if (raMinCoordCheck !== null && raMaxCoordCheck !== null) {
                const [minX, minY] = raMinCoordCheck[0].split('|');
                const [maxX, maxY] = raMaxCoordCheck[0].split('|');

                coordinatesArray = [...coordinatesArray].filter(
                    (coordinate) => {
                        const [x, y] = coordinate.split('|');
                        if (minX <= x && x <= maxX && minY <= y && y <= maxY) {
                            return coordinate;
                        }
                    }
                );
            } else {
                return [];
            }
        }

        // filter by radius
        if (distCenter.length && center.length) {
            if (!$.isNumeric(distCenter)) distCenter = 0;
            const raCenterCheck = center.match(twSDK.coordsRegex);

            if (distCenter !== 0 && raCenterCheck !== null) {
                let coordinatesArrayWithDistance = [];
                coordinatesArray.forEach((coordinate) => {
                    const distance = twSDK.calculateDistance(
                        raCenterCheck[0],
                        coordinate
                    );
                    coordinatesArrayWithDistance.push({
                        coord: coordinate,
                        distance: distance,
                    });
                });

                coordinatesArrayWithDistance =
                    coordinatesArrayWithDistance.filter((item) => {
                        return (
                            parseFloat(item.distance) <= parseFloat(distCenter)
                        );
                    });

                coordinatesArray = coordinatesArrayWithDistance.map(
                    (item) => item.coord
                );
            } else {
                return [];
            }
        }

        // apply multiplier
        if (selectiveRandomConfig) {
            const selectiveRandomizer = selectiveRandomConfig.split(';');

            const makeRepeated = (arr, repeats) =>
                Array.from({ length: repeats }, () => arr).flat();
            const multipliedCoordinatesArray = [];

            selectiveRandomizer.forEach((item) => {
                const [playerName, distribution] = item.split(':');
                if (distribution > 1) {
                    players.forEach((player) => {
                        if (
                            twSDK.cleanString(player[1]) ===
                            twSDK.cleanString(playerName)
                        ) {
                            let playerVillages =
                                twSDK.filterVillagesByPlayerIds(
                                    [parseInt(player[0])],
                                    villages
                                );
                            const flattenedPlayerVillagesArray = makeRepeated(
                                playerVillages,
                                distribution
                            );
                            multipliedCoordinatesArray.push(
                                flattenedPlayerVillagesArray
                            );
                        }
                    });
                }
            });

            coordinatesArray.push(...multipliedCoordinatesArray.flat());
        }

        return coordinatesArray;
    },
    getEntityIdsByArrayIndex: function (chosenItems, items, index) {
        const itemIds = [];
        chosenItems.forEach((chosenItem) => {
            items.forEach((item) => {
                if (
                    twSDK.cleanString(item[index]) ===
                    twSDK.cleanString(chosenItem)
                ) {
                    return itemIds.push(parseInt(item[0]));
                }
            });
        });
        return itemIds;
    },
    getFilteredVillagesByContinent: function (
        playerVillagesCoords,
        continents
    ) {
        let coords = [...playerVillagesCoords];
        let filteredVillagesByContinent = [];

        coords.forEach((coord) => {
            continents.forEach((continent) => {
                let currentVillageContinent = twSDK.getContinentByCoord(coord);
                if (currentVillageContinent === continent) {
                    filteredVillagesByContinent.push({
                        continent: continent,
                        coords: coord,
                    });
                }
            });
        });

        return twSDK.groupArrayByProperty(
            filteredVillagesByContinent,
            'continent',
            'coords'
        );
    },
    getGameFeatures: function () {
        const { Premium, FarmAssistent, AccountManager } = game_data.features;
        const isPA = Premium.active;
        const isLA = FarmAssistent.active;
        const isAM = AccountManager.active;
        return { isPA, isLA, isAM };
    },
    getKeyByValue: function (object, value) {
        return Object.keys(object).find((key) => object[key] === value);
    },
    getLandingTimeFromArrivesIn: function (arrivesIn) {
        const currentServerTime = twSDK.getServerDateTimeObject();
        const [hours, minutes, seconds] = arrivesIn.split(':');
        const totalSeconds = +hours * 3600 + +minutes * 60 + +seconds;
        const arrivalDateTime = new Date(
            currentServerTime.getTime() + totalSeconds * 1000
        );
        return arrivalDateTime;
    },
    getLastCoordFromString: function (string) {
        if (!string) return [];
        const regex = this.coordsRegex;
        let match;
        let lastMatch;
        while ((match = regex.exec(string)) !== null) {
            lastMatch = match;
        }
        return lastMatch ? lastMatch[0] : [];
    },
    getPagesToFetch: function () {
        let list_pages = [];

        const currentPage = twSDK.getParameterByName('page');
        if (currentPage == '-1') return [];

        if (
            document
                .getElementsByClassName('vis')[1]
                .getElementsByTagName('select').length > 0
        ) {
            Array.from(
                document
                    .getElementsByClassName('vis')[1]
                    .getElementsByTagName('select')[0]
            ).forEach(function (item) {
                list_pages.push(item.value);
            });
            list_pages.pop();
        } else if (
            document.getElementsByClassName('paged-nav-item').length > 0
        ) {
            let nr = 0;
            Array.from(
                document.getElementsByClassName('paged-nav-item')
            ).forEach(function (item) {
                let current = item.href;
                current = current.split('page=')[0] + 'page=' + nr;
                nr++;
                list_pages.push(current);
            });
        } else {
            let current_link = window.location.href;
            list_pages.push(current_link);
        }
        list_pages.shift();

        return list_pages;
    },
    getParameterByName: function (name, url = window.location.href) {
        return new URL(url).searchParams.get(name);
    },
    getRelativeImagePath: function (url) {
        const urlParts = url.split('/');
        return `/${urlParts[5]}/${urlParts[6]}/${urlParts[7]}`;
    },
    getServerDateTimeObject: function () {
        const formattedTime = this.getServerDateTime();
        return new Date(formattedTime);
    },
    getServerDateTime: function () {
        const serverTime = jQuery('#serverTime').text();
        const serverDate = jQuery('#serverDate').text();
        const [day, month, year] = serverDate.split('/');
        const serverTimeFormatted =
            year + '-' + month + '-' + day + ' ' + serverTime;
        return serverTimeFormatted;
    },
    getTimeFromString: function (timeLand) {
        let dateLand = '';
        let serverDate = document
            .getElementById('serverDate')
            .innerText.split('/');

        let TIME_PATTERNS = {
            today: 'today at %s',
            tomorrow: 'tomorrow at %s',
            later: 'on %1 at %2',
        };

        if (window.lang) {
            TIME_PATTERNS = {
                today: window.lang['aea2b0aa9ae1534226518faaefffdaad'],
                tomorrow: window.lang['57d28d1b211fddbb7a499ead5bf23079'],
                later: window.lang['0cb274c906d622fa8ce524bcfbb7552d'],
            };
        }

        let todayPattern = new RegExp(
            TIME_PATTERNS.today.replace('%s', '([\\d+|:]+)')
        ).exec(timeLand);
        let tomorrowPattern = new RegExp(
            TIME_PATTERNS.tomorrow.replace('%s', '([\\d+|:]+)')
        ).exec(timeLand);
        let laterDatePattern = new RegExp(
            TIME_PATTERNS.later
                .replace('%1', '([\\d+|\\.]+)')
                .replace('%2', '([\\d+|:]+)')
        ).exec(timeLand);

        if (todayPattern !== null) {
            // today
            dateLand =
                serverDate[0] +
                '/' +
                serverDate[1] +
                '/' +
                serverDate[2] +
                ' ' +
                timeLand.match(/\d+:\d+:\d+:\d+/)[0];
        } else if (tomorrowPattern !== null) {
            // tomorrow
            let tomorrowDate = new Date(
                serverDate[1] + '/' + serverDate[0] + '/' + serverDate[2]
            );
            tomorrowDate.setDate(tomorrowDate.getDate() + 1);
            dateLand =
                ('0' + tomorrowDate.getDate()).slice(-2) +
                '/' +
                ('0' + (tomorrowDate.getMonth() + 1)).slice(-2) +
                '/' +
                tomorrowDate.getFullYear() +
                ' ' +
                timeLand.match(/\d+:\d+:\d+:\d+/)[0];
        } else {
            // on
            let on = timeLand.match(/\d+.\d+/)[0].split('.');
            dateLand =
                on[0] +
                '/' +
                on[1] +
                '/' +
                serverDate[2] +
                ' ' +
                timeLand.match(/\d+:\d+:\d+:\d+/)[0];
        }

        return dateLand;
    },
    getTravelTimeInSecond: function (distance, unitSpeed) {
        let travelTime = distance * unitSpeed * 60;
        if (travelTime % 1 > 0.5) {
            return (travelTime += 1);
        } else {
            return travelTime;
        }
    },
    getTribeMembersById: function (tribeIds, players) {
        const tribeMemberIds = [];
        players.forEach((player) => {
            if (tribeIds.includes(parseInt(player[2]))) {
                tribeMemberIds.push(parseInt(player[0]));
            }
        });
        return tribeMemberIds;
    },
    getTroop: function (unit) {
        return parseInt(
            document.units[unit].parentNode
                .getElementsByTagName('a')[1]
                .innerHTML.match(/\d+/),
            10
        );
    },
    getVillageBuildings: function () {
        const buildings = game_data.village.buildings;
        const villageBuildings = [];

        for (let [key, value] of Object.entries(buildings)) {
            if (value > 0) {
                villageBuildings.push({
                    building: key,
                    level: value,
                });
            }
        }

        return villageBuildings;
    },
    getWorldConfig: async function () {
        const TIME_INTERVAL = 60 * 60 * 1000 * 24 * 7;
        const LAST_UPDATED_TIME =
            localStorage.getItem('world_config_last_updated') ?? 0;
        let worldConfig = [];

        if (LAST_UPDATED_TIME !== null) {
            if (Date.parse(new Date()) >= LAST_UPDATED_TIME + TIME_INTERVAL) {
                const response = await jQuery.ajax({
                    url: this.worldInfoInterface,
                });
                worldConfig = this.xml2json(jQuery(response));
                localStorage.setItem(
                    'world_config',
                    JSON.stringify(worldConfig)
                );
                localStorage.setItem(
                    'world_config_last_updated',
                    Date.parse(new Date())
                );
            } else {
                worldConfig = JSON.parse(localStorage.getItem('world_config'));
            }
        } else {
            const response = await jQuery.ajax({
                url: this.worldInfoInterface,
            });
            worldConfig = this.xml2json(jQuery(response));
            localStorage.setItem('world_config', JSON.stringify(unitInfo));
            localStorage.setItem(
                'world_config_last_updated',
                Date.parse(new Date())
            );
        }

        return worldConfig;
    },
    getWorldUnitInfo: async function () {
        const TIME_INTERVAL = 60 * 60 * 1000 * 24 * 7;
        const LAST_UPDATED_TIME =
            localStorage.getItem('units_info_last_updated') ?? 0;
        let unitInfo = [];

        if (LAST_UPDATED_TIME !== null) {
            if (Date.parse(new Date()) >= LAST_UPDATED_TIME + TIME_INTERVAL) {
                const response = await jQuery.ajax({
                    url: this.unitInfoInterface,
                });
                unitInfo = this.xml2json(jQuery(response));
                localStorage.setItem('units_info', JSON.stringify(unitInfo));
                localStorage.setItem(
                    'units_info_last_updated',
                    Date.parse(new Date())
                );
            } else {
                unitInfo = JSON.parse(localStorage.getItem('units_info'));
            }
        } else {
            const response = await jQuery.ajax({
                url: this.unitInfoInterface,
            });
            unitInfo = this.xml2json(jQuery(response));
            localStorage.setItem('units_info', JSON.stringify(unitInfo));
            localStorage.setItem(
                'units_info_last_updated',
                Date.parse(new Date())
            );
        }

        return unitInfo;
    },
    groupArrayByProperty: function (array, property, filter) {
        return array.reduce(function (accumulator, object) {
            // get the value of our object(age in our case) to use for group    the array as the array key
            const key = object[property];
            // if the current value is similar to the key(age) don't accumulate the transformed array and leave it empty
            if (!accumulator[key]) {
                accumulator[key] = [];
            }
            // add the value to the array
            accumulator[key].push(object[filter]);
            // return the transformed array
            return accumulator;
            // Also we also set the initial value of reduce() to an empty object
        }, {});
    },
    isArcherWorld: function () {
        return this.units.includes('archer');
    },
    isChurchWorld: function () {
        return 'church' in this.village.buildings;
    },
    isPaladinWorld: function () {
        return this.units.includes('knight');
    },
    isWatchTowerWorld: function () {
        return 'watchtower' in this.village.buildings;
    },
    loadJS: function (url, callback) {
        let scriptTag = document.createElement('script');
        scriptTag.src = url;
        scriptTag.onload = callback;
        scriptTag.onreadystatechange = callback;
        document.body.appendChild(scriptTag);
    },
    redirectTo: function (location) {
        window.location.assign(game_data.link_base_pure + location);
    },
    removeDuplicateObjectsFromArray: function (array, prop) {
        return array.filter((obj, pos, arr) => {
            return arr.map((mapObj) => mapObj[prop]).indexOf(obj[prop]) === pos;
        });
    },
    renderBoxWidget: function (body, id, mainClass, customStyle) {
        const globalStyle = this.addGlobalStyle();

        const content = `
            <div class="${mainClass} ra-box-widget" id="${id}">
                <div class="${mainClass}-header">
                    <h3>${this.tt(this.scriptData.name)}</h3>
                </div>
                <div class="${mainClass}-body">
                    ${body}
                </div>
                <div class="${mainClass}-footer">
                    <small>
                        <strong>
                            ${this.tt(this.scriptData.name)} ${
            this.scriptData.version
        }
                        </strong> -
                        <a href="${
                            this.scriptData.authorUrl
                        }" target="_blank" rel="noreferrer noopener">
                            ${this.scriptData.author}
                        </a> -
                        <a href="${
                            this.scriptData.helpLink
                        }" target="_blank" rel="noreferrer noopener">
                            ${this.tt('Help')}
                        </a>
                    </small>
                </div>
            </div>
            <style>
                .${mainClass} { position: relative; display: block; width: 100%; height: auto; clear: both; margin: 10px 0 15px; border: 1px solid #603000; box-sizing: border-box; background: #f4e4bc; }
                .${mainClass} * { box-sizing: border-box; }
                .${mainClass} > div { padding: 10px; }
                .${mainClass} .btn-confirm-yes { padding: 3px; }
                .${mainClass}-header { display: flex; align-items: center; justify-content: space-between; background-color: #c1a264 !important; background-image: url(/graphic/screen/tableheader_bg3.png); background-repeat: repeat-x; }
                .${mainClass}-header h3 { margin: 0; padding: 0; line-height: 1; }
                .${mainClass}-body p { font-size: 14px; }
                .${mainClass}-body label { display: block; font-weight: 600; margin-bottom: 6px; }
                
                ${globalStyle}

                /* Custom Style */
                ${customStyle}
            </style>
        `;

        if (jQuery(`#${id}`).length < 1) {
            jQuery('#contentContainer').prepend(content);
            jQuery('#mobileContent').prepend(content);
        } else {
            jQuery(`.${mainClass}-body`).html(body);
        }
    },
    renderFixedWidget: function (
        body,
        id,
        mainClass,
        customStyle,
        width,
        customName = this.scriptData.name
    ) {
        const globalStyle = this.addGlobalStyle();

        const content = `
            <div class="${mainClass} ra-fixed-widget" id="${id}">
                <div class="${mainClass}-header">
                    <h3>${this.tt(customName)}</h3>
                </div>
                <div class="${mainClass}-body">
                    ${body}
                </div>
                <div class="${mainClass}-footer">
                    <small>
                        <strong>
                            ${this.tt(customName)} ${this.scriptData.version}
                        </strong> -
                        <a href="${
                            this.scriptData.authorUrl
                        }" target="_blank" rel="noreferrer noopener">
                            ${this.scriptData.author}
                        </a> -
                        <a href="${
                            this.scriptData.helpLink
                        }" target="_blank" rel="noreferrer noopener">
                            ${this.tt('Help')}
                        </a>
                    </small>
                </div>
                <a class="popup_box_close custom-close-button" href="#">&nbsp;</a>
            </div>
            <style>
                .${mainClass} { position: fixed; top: 10vw; right: 10vw; z-index: 99999; border: 2px solid #7d510f; border-radius: 10px; padding: 10px; width: ${
            width ?? '360px'
        }; overflow-y: auto; padding: 10px; background: #e3d5b3 url('/graphic/index/main_bg.jpg') scroll right top repeat; }
                .${mainClass} * { box-sizing: border-box; }

                ${globalStyle}

                /* Custom Style */
                .custom-close-button { right: 0; top: 0; }
                ${customStyle}
            </style>
        `;

        if (jQuery(`#${id}`).length < 1) {
            if (mobiledevice) {
                jQuery('#content_value').prepend(content);
            } else {
                jQuery('#contentContainer').prepend(content);
                jQuery(`#${id}`).draggable({
                    cancel: '.ra-table, input, textarea, button, select, option',
                });

                jQuery(`#${id} .custom-close-button`).on('click', function (e) {
                    e.preventDefault();
                    jQuery(`#${id}`).remove();
                });
            }
        } else {
            jQuery(`.${mainClass}-body`).html(body);
        }
    },
    scriptInfo: function (scriptData = this.scriptData) {
        return `[${scriptData.name} ${scriptData.version}]`;
    },
    secondsToHms: function (timestamp) {
        const hours = Math.floor(timestamp / 60 / 60);
        const minutes = Math.floor(timestamp / 60) - hours * 60;
        const seconds = timestamp % 60;
        return (
            hours.toString().padStart(2, '0') +
            ':' +
            minutes.toString().padStart(2, '0') +
            ':' +
            seconds.toString().padStart(2, '0')
        );
    },
    setUpdateProgress: function (elementToUpdate, valueToSet) {
        jQuery(elementToUpdate).text(valueToSet);
    },
    sortArrayOfObjectsByKey: function (array, key) {
        return array.sort((a, b) => b[key] - a[key]);
    },
    startProgressBar: function (total) {
        const width = jQuery('#content_value')[0].clientWidth;
        const preloaderContent = `
            <div id="progressbar" class="progress-bar" style="margin-bottom:12px;">
                <span class="count label">0/${total}</span>
                <div id="progress">
                    <span class="count label" style="width: ${width}px;">
                        0/${total}
                    </span>
                </div>
            </div>
        `;

        if (this.isMobile) {
            jQuery('#content_value').eq(0).prepend(preloaderContent);
        } else {
            jQuery('#contentContainer').eq(0).prepend(preloaderContent);
        }
    },
    sumOfArrayItemValues: function (array) {
        return array.reduce((a, b) => a + b, 0);
    },
    timeAgo: function (seconds) {
        var interval = seconds / 31536000;
        if (interval > 1) return Math.floor(interval) + ' Y';

        interval = seconds / 2592000;
        if (interval > 1) return Math.floor(interval) + ' M';

        interval = seconds / 86400;
        if (interval > 1) return Math.floor(interval) + ' D';

        interval = seconds / 3600;
        if (interval > 1) return Math.floor(interval) + ' H';

        interval = seconds / 60;
        if (interval > 1) return Math.floor(interval) + ' m';

        return Math.floor(seconds) + ' s';
    },
    tt: function (string) {
        if (this.translations[game_data.locale] !== undefined) {
            return this.translations[game_data.locale][string];
        } else {
            return this.translations['en_DK'][string];
        }
    },
    updateProgress: function (elementToUpate, itemsLength, index) {
        jQuery(elementToUpate).text(`${index}/${itemsLength}`);
    },
    updateProgressBar: function (index, total) {
        jQuery('#progress').css('width', `${((index + 1) / total) * 100}%`);
        jQuery('.count').text(`${index + 1}/${total}`);
        if (index + 1 == total) {
            jQuery('#progressbar').fadeOut(1000);
        }
    },
    toggleUploadButtonStatus: function (elementToToggle) {
        jQuery(elementToToggle).attr('disabled', (i, v) => !v);
    },
    xml2json: function ($xml) {
        let data = {};
        const _self = this;
        $.each($xml.children(), function (i) {
            let $this = $(this);
            if ($this.children().length > 0) {
                data[$this.prop('tagName')] = _self.xml2json($this);
            } else {
                data[$this.prop('tagName')] = $.trim($this.text());
            }
        });
        return data;
    },
    worldDataAPI: async function (entity) {
        const TIME_INTERVAL = 60 * 60 * 1000; // fetch data every hour
        const LAST_UPDATED_TIME = localStorage.getItem(
            `${entity}_last_updated`
        );

        // check if entity is allowed and can be fetched
        const allowedEntities = ['village', 'player', 'ally', 'conquer'];
        if (!allowedEntities.includes(entity)) {
            throw new Error(`Entity ${entity} does not exist!`);
        }

        // initial world data
        const worldData = {};

        const dbConfig = {
            village: {
                dbName: 'villagesDb',
                dbTable: 'villages',
                key: 'villageId',
                url: twSDK.worldDataVillages,
            },
            player: {
                dbName: 'playersDb',
                dbTable: 'players',
                key: 'playerId',
                url: twSDK.worldDataPlayers,
            },
            ally: {
                dbName: 'tribesDb',
                dbTable: 'tribes',
                key: 'tribeId',
                url: twSDK.worldDataTribes,
            },
            conquer: {
                dbName: 'conquerDb',
                dbTable: 'conquer',
                key: '',
                url: twSDK.worldDataConquests,
            },
        };

        // Helpers: Fetch entity data and save to localStorage
        const fetchDataAndSave = async () => {
            const DATA_URL = dbConfig[entity].url;

            try {
                // fetch data
                const response = await jQuery.ajax(DATA_URL);
                const data = twSDK.csvToArray(response);
                let responseData = [];

                // prepare data to be saved in db
                switch (entity) {
                    case 'village':
                        responseData = data
                            .filter((item) => {
                                if (item[0] != '') {
                                    return item;
                                }
                            })
                            .map((item) => {
                                return {
                                    villageId: parseInt(item[0]),
                                    villageName: twSDK.cleanString(item[1]),
                                    villageX: item[2],
                                    villageY: item[3],
                                    playerId: parseInt(item[4]),
                                    villagePoints: parseInt(item[5]),
                                    villageType: parseInt(item[6]),
                                };
                            });
                        break;
                    case 'player':
                        responseData = data
                            .filter((item) => {
                                if (item[0] != '') {
                                    return item;
                                }
                            })
                            .map((item) => {
                                return {
                                    playerId: parseInt(item[0]),
                                    playerName: twSDK.cleanString(item[1]),
                                    tribeId: parseInt(item[2]),
                                    villages: parseInt(item[3]),
                                    points: parseInt(item[4]),
                                    rank: parseInt(item[5]),
                                };
                            });
                        break;
                    case 'ally':
                        responseData = data
                            .filter((item) => {
                                if (item[0] != '') {
                                    return item;
                                }
                            })
                            .map((item) => {
                                return {
                                    tribeId: parseInt(item[0]),
                                    tribeName: twSDK.cleanString(item[1]),
                                    tribeTag: twSDK.cleanString(item[2]),
                                    players: parseInt(item[3]),
                                    villages: parseInt(item[4]),
                                    points: parseInt(item[5]),
                                    allPoints: parseInt(item[6]),
                                    rank: parseInt(item[7]),
                                };
                            });
                        break;
                    case 'conquer':
                        responseData = data
                            .filter((item) => {
                                if (item[0] != '') {
                                    return item;
                                }
                            })
                            .map((item) => {
                                return {
                                    villageId: parseInt(item[0]),
                                    unixTimestamp: parseInt(item[1]),
                                    newPlayerId: parseInt(item[2]),
                                    newPlayerId: parseInt(item[3]),
                                    oldTribeId: parseInt(item[4]),
                                    newTribeId: parseInt(item[5]),
                                    villagePoints: parseInt(item[6]),
                                };
                            });
                        break;
                    default:
                        return [];
                }

                // save data in db
                saveToIndexedDbStorage(
                    dbConfig[entity].dbName,
                    dbConfig[entity].dbTable,
                    dbConfig[entity].key,
                    responseData
                );

                // update last updated localStorage item
                localStorage.setItem(
                    `${entity}_last_updated`,
                    Date.parse(new Date())
                );

                return responseData;
            } catch (error) {
                throw Error(`Error fetching ${DATA_URL}`);
            }
        };

        // Helpers: Save to IndexedDb storage
        async function saveToIndexedDbStorage(dbName, table, keyId, data) {
            const dbConnect = indexedDB.open(dbName);

            dbConnect.onupgradeneeded = function () {
                const db = dbConnect.result;
                if (keyId.length) {
                    db.createObjectStore(table, {
                        keyPath: keyId,
                    });
                } else {
                    db.createObjectStore(table, {
                        autoIncrement: true,
                    });
                }
            };

            dbConnect.onsuccess = function () {
                const db = dbConnect.result;
                const transaction = db.transaction(table, 'readwrite');
                const store = transaction.objectStore(table);
                store.clear(); // clean store from items before adding new ones

                data.forEach((item) => {
                    store.put(item);
                });

                UI.SuccessMessage('Database updated!');
            };
        }

        // Helpers: Read all villages from indexedDB
        function getAllData(dbName, table) {
            return new Promise((resolve, reject) => {
                const dbConnect = indexedDB.open(dbName);

                dbConnect.onsuccess = () => {
                    const db = dbConnect.result;

                    const dbQuery = db
                        .transaction(table, 'readwrite')
                        .objectStore(table)
                        .getAll();

                    dbQuery.onsuccess = (event) => {
                        resolve(event.target.result);
                    };

                    dbQuery.onerror = (event) => {
                        reject(event.target.error);
                    };
                };

                dbConnect.onerror = (event) => {
                    reject(event.target.error);
                };
            });
        }

        // Helpers: Transform an array of objects into an array of arrays
        function objectToArray(arrayOfObjects, entity) {
            switch (entity) {
                case 'village':
                    return arrayOfObjects.map((item) => [
                        item.villageId,
                        item.villageName,
                        item.villageX,
                        item.villageY,
                        item.playerId,
                        item.villagePoints,
                        item.villageType,
                    ]);
                case 'player':
                    return arrayOfObjects.map((item) => [
                        item.playerId,
                        item.playerName,
                        item.tribeId,
                        item.villages,
                        item.points,
                        item.rank,
                    ]);
                case 'ally':
                    return arrayOfObjects.map((item) => [
                        item.tribeId,
                        item.tribeName,
                        item.tribeTag,
                        item.players,
                        item.villages,
                        item.points,
                        item.allPoints,
                        item.rank,
                    ]);
                case 'conquer':
                    return arrayOfObjects.map((item) => [
                        item.villageId,
                        item.unixTimestamp,
                        item.newPlayerId,
                        item.newPlayerId,
                        item.oldTribeId,
                        item.newTribeId,
                        item.villagePoints,
                    ]);
                default:
                    return [];
            }
        }

        // decide what to do based on current time and last updated entity time
        if (LAST_UPDATED_TIME !== null) {
            if (
                Date.parse(new Date()) >=
                parseInt(LAST_UPDATED_TIME) + TIME_INTERVAL
            ) {
                worldData[entity] = await fetchDataAndSave();
            } else {
                worldData[entity] = await getAllData(
                    dbConfig[entity].dbName,
                    dbConfig[entity].dbTable
                );
            }
        } else {
            worldData[entity] = await fetchDataAndSave();
        }

        // transform the data so at the end an array of array is returned
        worldData[entity] = objectToArray(worldData[entity], entity);

        return worldData[entity];
    },
    zeroPad: function (num, count) {
        var numZeropad = num + '';
        while (numZeropad.length < count) {
            numZeropad = '0' + numZeropad;
        }
        return numZeropad;
    },

    // initialize library
    init: async function (scriptConfig) {
        const {
            scriptData,
            translations,
            allowedMarkets,
            allowedScreens,
            allowedModes,
            isDebug,
            enableCountApi,
        } = scriptConfig;

        this.scriptData = scriptData;
        this.translations = translations;
        this.allowedMarkets = allowedMarkets;
        this.allowedScreens = allowedScreens;
        this.allowedModes = allowedModes;
        this.enableCountApi = enableCountApi;
        this.isDebug = isDebug;

        twSDK._initDebug();
    },
};


/*
By uploading a user-generated mod (script) for use with Tribal Wars, the creator grants InnoGames a perpetual, irrevocable, worldwide, royalty-free, non-exclusive license to use, reproduce, distribute, publicly display, modify, and create derivative works of the mod. This license permits InnoGames to incorporate the mod into any aspect of the game and its related services, including promotional and commercial endeavors, without any requirement for compensation or attribution to the uploader. The uploader represents and warrants that they have the legal right to grant this license and that the mod does not infringe upon any third-party rights.
*/

// User Input
if (typeof DEBUG !== 'boolean') DEBUG = false;
// DEFAULT VALUES
defaultSettings = { 
    'sbOriginGroupSelection': true,
    'sbOriginCustomSelection': false,
    'sbOriginGroupsFilter': 0,
    'sbCustomOriginVillages': '',
    'sbTargetGroupSelection': true,
    'sbTargetCustomSelection': false,
    'sbTargetGroupsFilter': 0,
    'sbCustomTargetVillages': '',
    'sbHoldBackMerchants': 0,
    'sbMerchantBonus': false, 
    'sbSendResourcesAbsoluteRadio': true,
    'sbSendResourcesRatioRadio': false,
    'sbSendResourcesMintRatioRadio': false,
    'sbSendResourcesFillRadio': false,
    'sbSendWood': 0,
    'sbSendClay': 0,
    'sbSendIron': 0,
    'sbSendWoodRatio': 33,
    'sbSendClayRatio': 34,
    'sbSendIronRatio': 33,
    'sbHoldBackResourcesAbsoluteRadio': false,
    'sbHoldBackResourcesPercentageRadio': true,
    'sbHoldBackWood': 0,
    'sbHoldBackClay': 0,
    'sbHoldBackIron': 0,
    'sbHoldBackPercentage': 0,
    'sbMaxWood': 0,
    'sbMaxClay': 0,
    'sbMaxIron': 0,
    'sbArrivalTimes': []
};
// CONSTANTS
var merchantSpeed = 6;
var merchantSpeedWithBonus = 4;
var allIdsRS = [
    'sbOriginGroupSelection',
    'sbOriginCustomSelection',
    'sbOriginGroupsFilter',
    'sbCustomOriginVillages',
    'sbTargetGroupSelection',
    'sbTargetCustomSelection',
    'sbTargetGroupsFilter',
    'sbCustomTargetVillages',
    'sbHoldBackMerchants',
    'sbMerchantBonus',
    'sbSendResourcesAbsoluteRadio',
    'sbSendResourcesRatioRadio',
    'sbSendResourcesMintRatioRadio',
    'sbSendWood',
    'sbSendClay',
    'sbSendIron',
    'sbSendWoodRatio',
    'sbSendClayRatio',
    'sbSendIronRatio',
    'sbHoldBackResourcesAbsoluteRadio',
    'sbHoldBackResourcesPercentageRadio',
    'sbHoldBackWood',
    'sbHoldBackClay',
    'sbHoldBackIron',
    'sbHoldBackPercentage',
    'sbMaxWood',
    'sbMaxClay',
    'sbMaxIron'
];
// GLOBAL VARIABLES
var warehouseData =  {};
var totalWoodSent = 0;
var totalClaySent = 0;
var totalIronSent = 0;

var scriptConfig = {
    scriptData: {
        prefix: 'sbRS',
        name: 'Resource Sender',
        version: 'v1.0.0',
        author: 'SaveBank',
        authorUrl: 'https://forum.tribalwars.net/index.php?members/savebank.131111/',
        helpLink: '',
    },
    translations: {
        en_DK: {
            'Redirecting...': 'Redirecting...',
            Help: 'Help',
            'Resource Sender': 'Resource Sender',
            'Origin villages': 'Origin villages',
            'Target villages': 'Target villages',
            'Group': 'Group',
            'Custom': 'Custom',
            'Settings': 'Settings',
            'Hold back merchants': 'Hold back merchants',
            'Merchant bonus active?': 'Merchant bonus active?',
            'Send resources as': 'Send resources as',
            'Absolute numbers': 'Absolute numbers',
            'Ratio': 'Ratio',
            'Percentage': 'Percentage',
            'Wood': 'Wood',
            'Clay': 'Clay',
            'Iron': 'Iron',
            'Wood (%)': 'Wood (%)',
            'Clay (%)': 'Clay (%)',
            'Iron (%)': 'Iron (%)',
            'Hold back resources as': 'Hold back resources as',
            'Max resources per target village': 'Max resources per target village',
            'Max wood per village': 'Max wood per village',
            'Max clay per village': 'Max clay per village',
            'Max iron per village': 'Max iron per village',
            'Paste warehouse data': 'Paste warehouse data',
            'Delete all arrival times': 'Delete all arrival times',
            'Reset Input': 'Reset Input',
            'Arrival time': 'Arrival time',
            'Reset all inputs': 'Reset all inputs',
            'This entry already exists.': 'This entry already exists.',
            'Invalid entry. Please select valid start and end times.': 'Invalid entry. Please select valid start and end times.',
            'Invalid entry. Please check the selected times.': 'Invalid entry. Please check the selected times.',
            'Mint Ratio': 'Mint Ratio',
            'From': 'From',
            'To': 'To',
            'Delete Entry': 'Delete Entry',
            'Ratio (has to add up to 100%)': 'Ratio (has to add up to 100%)',
            'Save': 'Save',
            'Warehouse data (will overwrite target villages)': 'Warehouse data (will overwrite target villages)',
            'Paste warehouse data here...': 'Paste warehouse data here...',
            'Gap to warehouse max': 'Gap to warehouse max',
            'Fill': 'Fill',
            'Gap to max (%)': 'Gap to max (%)',
            'Calculate & Send': 'Calculate & Send',
            'Calculate': 'Calculate',
            'Please enter origin villages.': 'Please enter origin villages.',
            'Please enter target villages.': 'Please enter target villages.',
            'The sum of the ratios must be 100.': 'The sum of the ratios must be 100.',
            'Please select how to send resources.': 'Please select how to send resources.',
            'Multiple send resource options selected. Please reload andreselect how to send resources.': 'Multiple send resource options selected. Please reload andreselect how to send resources.',
            'Please paste warehouse data before selecting fill.': 'Please paste warehouse data before selecting fill.',
            'There was an error while fetching the data!': 'There was an error while fetching the data!',
            'Finished sending!': 'Finished sending!',
            'Origin': 'Origin',
            'Target': 'Target',
            'Travel Time': 'Travel Time',
            'Send': 'Send',
            'Total Resources Sent': 'Total Resources Sent',
            'Fetching player data for more than 1000 villages. This may take a while...' : 'Fetching player data for more than 1000 villages. This may take a while...',
            'Fetching player data...' : 'Fetching player data...',
        },
        de_DE: {
            'Redirecting...': 'Weiterleiten...',
            Help: 'Hilfe',
            'Resource Sender': 'Ressourcen Sender',
            'Origin villages': 'Herkunftsdörfer',
            'Target villages': 'Zieldörfer',
            'Group': 'Gruppe',
            'Custom': 'Benutzerdefiniert',
            'Settings': 'Einstellungen',
            'Hold back merchants': 'Händler zurückhalten',
            'Merchant bonus active?': 'Händlerbonus aktiv?',
            'Send resources as': 'Ressourcen senden als',
            'Absolute numbers': 'Absolute Zahlen',
            'Percentage': 'Prozent',
            'Ratio': 'Verhältnis',
            'Wood': 'Holz',
            'Clay': 'Lehm',
            'Iron': 'Eisen',
            'Wood (%)': 'Holz (%)',
            'Clay (%)': 'Lehm (%)',
            'Iron (%)': 'Eisen (%)',
            'Hold back resources as': 'Ressourcen zurückhalten als',
            'Max resources per target village': 'Max Ressourcen pro Zieldorf',
            'Max wood per village': 'Max Holz pro Dorf',
            'Max clay per village': 'Max Lehm pro Dorf',
            'Max iron per village': 'Max Eisen pro Dorf',
            'Paste warehouse data': 'Speicherdaten einfügen',
            'Delete all arrival times': 'Alle Ankunftszeiten löschen',
            'Reset Input': 'Eingaben löschen',
            'Arrival time': 'Ankunftszeit',
            'Reset all inputs': 'Alle Eingaben löschen',
            'This entry already exists.': 'Dieser Eintrag existiert bereits.',
            'Invalid entry. Please select valid start and end times.': 'Ungültiger Eintrag. Bitte wählen Sie gültige Start- und Endzeiten.',
            'Invalid entry. Please check the selected times.': 'Ungültiger Eintrag. Bitte überprüfen Sie die ausgewählten Zeiten.',
            'Mint Ratio': 'Münzenverhältnis',
            'From': 'Von',
            'To': 'Bis',
            'Delete Entry': 'Eintrag löschen',
            'Ratio (has to add up to 100%)': 'Verhältnis (muss gesamt 100% sein)',
            'Save': 'Speichern',
            'Warehouse data (will overwrite target villages)': 'Speicherdaten (überschreibt Zieldörfer)',
            'Paste warehouse data here...': 'Speicherdaten hier einfügen...',
            'Gap to warehouse max': 'Abstand zum Speichermaximum',
            'Fill': 'Auffüllen',
            'Gap to max (%)': 'Abstand zum Maximum (%)',
            'Calculate & Send': 'Berechnen & Senden',
            'Calculate': 'Berechnen',
            'Please enter origin villages.': 'Bitte geben Sie Herkunftsdörfer ein.',
            'Please enter target villages.': 'Bitte geben Sie Zieldörfer ein.',
            'The sum of the ratios must be 100.': 'Die Summe der Verhältnisse muss 100 sein.',
            'Please select how to send resources.': 'Bitte wählen Sie, wie die Ressourcen gesendet werden sollen.',
            'Multiple send resource options selected. Please reload andreselect how to send resources.': 'Mehrere Optionen zum Senden von Ressourcen ausgewählt. Bitte neu laden und auswählen, wie die Ressourcen gesendet werden sollen.',
            'Please paste warehouse data before selecting fill.': 'Bitte fügen Sie die Speicherdaten ein, bevor Sie Auffüllen auswählen.',
            'There was an error while fetching the data!': 'Es ist ein Fehler beim Abrufen der Daten aufgetreten!',
            'Finished sending!': 'Fertig mit dem Senden!',
            'Origin': 'Herkunft',
            'Target': 'Ziel',
            'Travel Time': 'Reisezeit',
            'Send': 'Senden',
            'Total Resources Sent': 'Gesendete Gesamtressourcen',
            'Fetching player data for more than 1000 villages. This may take a while...' : 'Spielerdaten für mehr als 1000 Dörfer abrufen. Dies kann einige Zeit dauern...',
            'Fetching player data...' : 'Spielerdaten abrufen...',
        }
    },
    allowedMarkets: [],
    allowedScreens: [],
    allowedModes: [],
    isDebug: DEBUG,
    enableCountApi: false
};


(async function () {
        const startTime = performance.now();
        if (DEBUG) {
            console.debug(`Init resource sender script by SaveBank`);
        }
        await twSDK.init(scriptConfig);
        const scriptInfo = twSDK.scriptInfo();
        /*
        const isValidScreen = twSDK.checkValidLocation('screen');
        const isValidMode = twSDK.checkValidLocation('mode');
        if (!isValidScreen && !isValidMode) {
            // Redirect to correct screen if necessary
            UI.InfoMessage(twSDK.tt('Redirecting...'));
            // twSDK.redirectTo('overview_villages&combined');
            return;
        }
        */
        const groups = await fetchVillageGroups();
        const { villages, worldConfig } = await fetchWorldConfigData();
        const villageIdToCoordMap = createVillageMap(villages);
        const playerData = await getPlayerData();
        const villageData = villageArrayToDict(villages)
        if(DEBUG) console.debug(`${scriptInfo}: Player data:`, playerData);
        const endTime = performance.now();
        if (DEBUG) console.debug(`${scriptInfo}: Startup time: ${(endTime - startTime).toFixed(2)} milliseconds`);
        if (DEBUG) console.debug(`${scriptInfo}: `, worldConfig);
        if (DEBUG) console.debug(`${scriptInfo}: `, villages);
        // Entry point
        (async function () {
            try {
                const startTime = performance.now();
                renderUI();
                addEventHandlers();
                initializeInputFields();
                const endTime = performance.now();
                if (DEBUG) console.debug(`${scriptInfo}: Time to initialize: ${(endTime - startTime).toFixed(2)} milliseconds`);
            } catch (error) {
                UI.ErrorMessage(twSDK.tt('There was an error!'));
                console.error(`${scriptInfo}: Error:`, error);
            }
        })();

        function renderUI() {
            const startTime = performance.now();
            const style = generateCSS();
            const groupMenuOrigin = renderGroupsFilter("sbOrigin");
            const groupMenuTarget = renderGroupsFilter("sbTarget");
            const contentArrivalTimeSelector = renderArrivalTimeSelector();

            let content = `
                <div class="sb-grid sb-grid-2 ra-mb10">
                    <fieldset>
                        <legend>${twSDK.tt('Origin villages')}</legend>
                        <div class="sb-grid sb-grid-2 ra-mb10">
                            <div>
                                <div>
                                    <input type="radio" id="sbOriginGroupSelection" name="originSelection" value="group" checked>
                                    <label for="sbOriginGroupSelection">${twSDK.tt('Group')}</label>
                                </div>
                                <div>
                                    <input type="radio" id="sbOriginCustomSelection" name="originSelection" value="custom">
                                    <label for="sbOriginCustomSelection">${twSDK.tt('Custom')}</label>
                                </div>
                            </div>
                            <div id="sbOriginGroupMenuContainer">
                                ${groupMenuOrigin}
                            </div>
                        </div>
                        <div id="sbOriginCustomTextAreaContainer" style="display: none;">
                            <textarea id="sbCustomOriginVillages" name="customOriginVillages" rows="4" cols="50"></textarea>
                        </div>
                    </fieldset>
                    <fieldset>
                        <legend>${twSDK.tt('Target villages')}</legend>
                        <div class="sb-grid sb-grid-2 ra-mb10">
                            <div>
                                <div>
                                    <input type="radio" id="sbTargetGroupSelection" name="targetSelection" value="group" checked>
                                    <label for="sbTargetGroupSelection">${twSDK.tt('Group')}</label>
                                </div>
                                <div>
                                    <input type="radio" id="sbTargetCustomSelection" name="targetSelection" value="custom">
                                    <label for="sbTargetCustomSelection">${twSDK.tt('Custom')}</label>
                                </div>
                            </div>
                            <div id="sbTargetGroupMenuContainer">
                                ${groupMenuTarget}
                            </div>
                        </div>
                        <div id="sbTargetCustomTextAreaContainer" style="display: none;">
                            <textarea id="sbCustomTargetVillages" name="customTargetVillages" rows="4" cols="50"></textarea>
                        </div>
                    </fieldset>
                </div>
                <fieldset>
                    <legend>${twSDK.tt('Settings')}</legend>
                    <div class="sb-grid sb-grid-3 ra-mb10">
                        <!-- Hold back merchants -->
                        <div>
                            <fieldset>
                                <legend>${twSDK.tt('Hold back merchants')}</legend>
                                <input type="number" id="sbHoldBackMerchants" name="holdBackMerchants" min="0">
                            </fieldset>
                        </div>
                        <!-- Paste warehouse data button -->
                        <div>
                            <fieldset>
                                <legend>${twSDK.tt('Warehouse data (will overwrite target villages)')}</legend>
                                <button class="btn" id="sbPasteWarehouseData">${twSDK.tt('Paste warehouse data')}</button>
                                <span id="sbPasteWarehouseDataSuccess" style="display: none; color: green; font-size: 1.5em; font-weight: bold;">✔</span>
                                <span id="sbPasteWarehouseDataError" style="display: none; color: red; font-size: 1.5em; font-weight: bold;">✘</span>
                            </fieldset>
                        </div>
                        <!-- Merchant bonus -->
                        <div>
                            <fieldset>
                                <legend>${twSDK.tt('Merchant bonus active?')}</legend>
                                <input type="checkbox" id="sbMerchantBonus" name="merchantBonus">
                            </fieldset>
                        </div>
                    </div>
                    <fieldset class="ra-mb10">
                        <div class="sb-grid sb-grid-2 ra-mb10">
                            <!-- Send resources as absolute numbers or ratio -->
                            <div>
                                <fieldset>
                                    <legend>${twSDK.tt('Send resources as')}</legend>
                                    <div>
                                        <div>
                                            <input type="radio" id="sbSendResourcesAbsoluteRadio" name="sendResourcesType" value="absolute" checked>
                                            <label for="sbSendResourcesAbsoluteRadio">${twSDK.tt('Absolute numbers')}</label>
                                        </div>
                                        <div>
                                            <input type="radio" id="sbSendResourcesRatioRadio" name="sendResourcesType" value="ratio">
                                            <label for="sbSendResourcesRatioRadio">${twSDK.tt('Ratio')}</label>
                                        </div>
                                        <div>
                                            <input type="radio" id="sbSendResourcesMintRatioRadio" name="sendResourcesType" value="ratio">
                                            <label for="sbSendResourcesMintRatioRadio">${twSDK.tt('Mint Ratio')}</label>
                                        </div>
                                        <div>
                                            <input type="radio" id="sbSendResourcesFillRadio" name="sendResourcesType" value="fill" disabled>
                                            <label for="sbSendResourcesFillRadio">${twSDK.tt('Fill')}</label>
                                        </div>
                                    </div>
                                </fieldset>
                            </div>
                            <div id="sbSendResourcesAbsolute" style="display: none;">
                                <fieldset>
                                    <legend>${twSDK.tt('Absolute numbers')}</legend>
                                    <div class="sb-grid sb-grid-3 ra-mb10">
                                        <div style="display: inline-block;">
                                            <label for="sbSendWood">${twSDK.tt('Wood')}</label>
                                            <input type="number" id="sbSendWood" name="sendWood" min="0">
                                        </div>
                                        <div style="display: inline-block;">
                                            <label for="sbSendClay">${twSDK.tt('Clay')}</label>
                                            <input type="number" id="sbSendClay" name="sendClay" min="0">
                                        </div>
                                        <div style="display: inline-block;">
                                            <label for="sbSendIron">${twSDK.tt('Iron')}</label>
                                            <input type="number" id="sbSendIron" name="sendIron" min="0">
                                        </div>
                                    </div>
                                </fieldset>
                            </div>
                            <div id="sbSendResourcesRatio" style="display: none;">
                                <fieldset>
                                    <legend>${twSDK.tt('Ratio (has to add up to 100%)')}</legend>
                                    <div class="sb-grid sb-grid-3 ra-mb10">
                                        <div style="display: inline-block;">
                                            <label for="sbSendWoodRatio">${twSDK.tt('Wood (%)')}</label>
                                            <input type="number" id="sbSendWoodRatio" name="sendWoodRatio" min="0" max="100">
                                        </div>
                                        <div style="display: inline-block;">
                                            <label for="sbSendClayRatio">${twSDK.tt('Clay (%)')}</label>
                                            <input type="number" id="sbSendClayRatio" name="sendClayRatio" min="0" max="100">
                                        </div>
                                        <div style="display: inline-block;">
                                            <label for="sbSendIronRatio">${twSDK.tt('Iron (%)')}</label>
                                            <input type="number" id="sbSendIronRatio" name="sendIronRatio" min="0" max="100">
                                        </div>
                                    </div>
                                </fieldset>
                            </div>
                            <div id="sbSendResourcesFill" style="display: none;">
                                <fieldset>
                                    <legend>${twSDK.tt('Gap to warehouse max')}</legend>
                                    <div class="sb-grid sb-grid-1 ra-mb10">
                                        <div style="display: inline-block;">
                                            <label for="sbSendGapToMax">${twSDK.tt('Gap to max (%)')}</label>
                                            <input type="number" id="sbSendGapToMax" name="sendGapToMax" min="0" max="100">
                                        </div>
                                    </div>
                                </fieldset>
                            </div>
                        </div>
                    </fieldset>
                    <fieldset class="ra-mb10">
                        <div class="sb-grid sb-grid-2 ra-mb10">
                            <!-- Hold back resources -->
                            <div>
                                <fieldset>
                                    <legend>${twSDK.tt('Hold back resources as')}</legend>
                                    <div>
                                        <div>
                                            <input type="radio" id="sbHoldBackResourcesAbsoluteRadio" name="holdBackResourcesType" value="absolute" checked>
                                            <label for="sbHoldBackResourcesAbsoluteRadio">${twSDK.tt('Absolute numbers')}</label>
                                        </div>
                                        <div>
                                            <input type="radio" id="sbHoldBackResourcesPercentageRadio" name="holdBackResourcesType" value="percentage">
                                            <label for="sbHoldBackResourcesPercentageRadio">${twSDK.tt('Percentage')}</label>
                                        </div>
                                    </div>
                                </fieldset>
                            </div>
                            <div id="sbHoldBackResourcesAbsolute" style="display: none;">
                                <fieldset class="sb-fieldset">
                                    <legend>${twSDK.tt('Absolute numbers')}</legend>
                                    <div class="sb-grid sb-grid-3 ra-mb10">
                                        <div style="display: inline-block;">
                                            <label for="sbHoldBackWood">${twSDK.tt('Wood')}</label>
                                            <input type="number" id="sbHoldBackWood" name="holdBackWood" min="0">
                                        </div>
                                        <div style="display: inline-block;">
                                            <label for="sbHoldBackClay">${twSDK.tt('Clay')}</label>
                                            <input type="number" id="sbHoldBackClay" name="holdBackClay" min="0">
                                        </div>
                                        <div style="display: inline-block;">
                                            <label for="sbHoldBackIron">${twSDK.tt('Iron')}</label>
                                            <input type="number" id="sbHoldBackIron" name="holdBackIron" min="0">
                                        </div>
                                    </div>
                                </fieldset>
                            </div>
                            <div id="sbHoldBackResourcesPercentage" style="display: none;">
                                <fieldset>
                                    <legend>${twSDK.tt('Percentage')}</legend>
                                    <input type="number" id="sbHoldBackPercentage" name="holdBackPercentage" min="0" max="100">
                                </fieldset>
                            </div>
                        </div>
                    </fieldset>
                    <div class="sb-grid sb-grid-75-25 ra-mb10">
                        <!-- Maximum resources per target village -->
                        <fieldset>
                            <legend>${twSDK.tt('Max resources per target village')}</legend>
                            <div class="sb-grid sb-grid-3 ra-mb10">
                                <div style="display: inline-block;">
                                    <label for="sbMaxWood">${twSDK.tt('Max wood per village')}</label>
                                    <input type="number" id="sbMaxWood" name="maxWood" min="0">
                                </div>
                                <div style="display: inline-block;">
                                    <label for="sbMaxClay">${twSDK.tt('Max clay per village')}</label>
                                    <input type="number" id="sbMaxClay" name="maxClay" min="0">
                                </div>
                                <div style="display: inline-block;">
                                    <label for="sbMaxIron">${twSDK.tt('Max iron per village')}</label>
                                    <input type="number" id="sbMaxIron" name="maxIron" min="0">
                                </div>
                            </div>
                        </fieldset>
                        <fieldset>
                            <legend>${twSDK.tt('Reset all inputs')}</legend>
                            <div class="ra-tac">
                                <button id="resetInput" class="add-entry-btn sbDeleteAllEntries" >${twSDK.tt('Reset Input')}</button>
                            </div>
                        </fieldset>
                    </div>
                    <div class="sb-grid ra-mb10">
                        <!-- Time frame setting  -->
                        ${contentArrivalTimeSelector}
                    </div>
                </fieldset>
                <fieldset>
                    <legend>${twSDK.tt('Calculate & Send')}</legend>
                    <div>
                        <button id="sbResCalculate" class="btn">${twSDK.tt('Calculate')}</button>
                    </div>
                    <div id="sbTransportTableContainer">
                    </div>
                </fieldset>
            `
            twSDK.renderBoxWidget(
                content,
                'ResourceSender',
                'resource-sender',
                style
            );
            
            const endTime = performance.now();
            if (DEBUG) console.debug(`${scriptInfo}: Time to render: ${(endTime - startTime).toFixed(2)} milliseconds`);
        }

        function addEventHandlers() {
            $('#sbPasteWarehouseData').click(function () {
                if ($('#sbPasteWarehouseDataPopup').length > 0) {
                    $('#sbPasteWarehouseDataPopup').remove();
                }
                const style = generateCSS();
                let body = `<fieldset class="sb-fieldset">
                                <legend>${twSDK.tt('Paste warehouse data')}</legend>
                                <textarea id="sbWarehouseData" class="ra-textarea" placeholder="${twSDK.tt('Paste warehouse data here...')}"></textarea>
                                <button id="sbSaveWarehouseData" class="btn ra-mb10">${twSDK.tt('Save')}</button>
                            </fieldset>
                            `;

                twSDK.renderFixedWidget(
                    body,
                    'sbPasteWarehouseDataPopup',
                    'sbPasteWarehouseDataPopupClass',
                    style,
                );

                $('#sbSaveWarehouseData').click(function () {
                    const rawData = $('#sbWarehouseData').val();
                    const lines = rawData.split('\n');
                    warehouseData = {}; // Reset the warehouseData object

                    let firstCoordinateFound = false;
                
                    lines.forEach(line => {
                        line = line.trim();
                        if (line === '' || !twSDK.coordsRegex.test(line)) {
                            return; // Skip empty lines and lines without coordinates
                        }

                        if (!firstCoordinateFound) {
                            firstCoordinateFound = true;
                            return; // Skip the first line with a coordinate found
                        }
                
                        const match = line.match(/\((\d+\|\d+)\) K\d+/);
                        if (match) {
                            const coordinate = match[1];
                            const numbers = line.match(/\d+/g).map(Number);
                            if (numbers.length >= 8) {
                                const [wood, clay, iron, maxStorage] = numbers.slice(4, 8);
                                warehouseData[coordinate] = {
                                    wood,
                                    clay,
                                    iron,
                                    maxStorage
                                };
                            }
                        }
                    });
                
                    if (DEBUG) console.debug(`${scriptInfo}: Parsed warehouse data: `, warehouseData);
                
                    if (Object.keys(warehouseData).length > 0) {
                        $('#sbPasteWarehouseDataSuccess').show();
                        $('#sbPasteWarehouseDataError').hide();
                
                        // Overwrite the custom target villages with the coordinates from warehouseData
                        $('#sbTargetCustomSelection').prop('checked', true);
                        $('#sbTargetGroupMenuContainer').hide();
                        $('#sbTargetCustomTextAreaContainer').show();
                        $('#sbCustomTargetVillages').val(Object.keys(warehouseData).join(' '));

                        const localStorageObject = getLocalStorage();
                        localStorageObject.sbTargetCustomSelection = true;
                        localStorageObject.sbTargetGroupSelection = false;
                        localStorageObject.sbCustomTargetVillages = Object.keys(warehouseData).join(' ');
                        

                        // Select fill radio button
                        $('#sbSendResourcesFillRadio').prop('checked', true);
                        $('#sbSendResourcesFill').show();
                        localStorageObject.sbSendResourcesFillRadio = true;

                        // Uncheck and hide all other buttons and update their states in the local storage
                        $('#sbSendResourcesAbsoluteRadio').prop('checked', false);
                        $('#sbSendResourcesAbsolute').hide();
                        localStorageObject.sbSendResourcesAbsoluteRadio = false;
                        $('#sbSendResourcesRatioRadio').prop('checked', false);
                        $('#sbSendResourcesRatio').hide();
                        localStorageObject.sbSendResourcesRatioRadio = false;
                        $('#sbSendResourcesMintRatioRadio').prop('checked', false);
                        $('#sbSendResourcesMintRatio').hide();
                        localStorageObject.sbSendResourcesMintRatioRadio = false;

                        saveLocalStorage(localStorageObject);
                    } else {
                        $('#sbPasteWarehouseDataSuccess').hide();
                        $('#sbPasteWarehouseDataError').show();
                    }
                
                    if ($('#sbPasteWarehouseDataPopup').length > 0) {
                        $('#sbPasteWarehouseDataPopup').remove();
                    }
                });
            });
            jQuery('#sbDeleteAllEntries').on('click', function () {
                // Remove all entries in the table with the id sbArrivalEntryTable
                jQuery('#sbArrivalEntryTable .entry-row').remove();

                // Clear saved times in local storage
                const localStorageObject = getLocalStorage();
                localStorageObject.sbArrivalTimes = [];
                saveLocalStorage(localStorageObject);

                // Make the table invisible
                jQuery('#sbArrivalEntryTable').css('display', 'none');
            });
            initializeSavedEntries()
            jQuery('#sbArrivalEntryTable').on('click', '.delete-entry-btn', function () {
                const idParts = this.id.split('-');
                const startTime = Number(idParts[1]);
                const endTime = Number(idParts[2]);

                const updatedLocalStorage = getLocalStorage();
                updatedLocalStorage.sbArrivalTimes = updatedLocalStorage.sbArrivalTimes.filter(timeSpan => !(timeSpan[0] === startTime && timeSpan[1] === endTime));
                saveLocalStorage(updatedLocalStorage);

                jQuery(this).parent().parent().remove();

                // Hide the table if there are no entries
                if (updatedLocalStorage.sbArrivalTimes.length === 0) {
                    jQuery('#sbArrivalEntryTable').css('display', 'none');
                }
            });
            jQuery('#sbAddTimeEntry').on('click', async function (e) {
                e.preventDefault();

                // Logic to validate and add new entry into the table with the id sbArrivalEntryTable
                const startTimeString = jQuery('#startDateTime').val();
                const endTimeString = jQuery('#endDateTime').val();

                if (startTimeString && endTimeString) {
                    const currentTime = Date.now();
                    const startTime = new Date(startTimeString).getTime();
                    const endTime = new Date(endTimeString).getTime();

                    if (!isNaN(startTime) && !isNaN(endTime) && startTime < endTime && currentTime < endTime) {
                        // Check if the combination of timestamps is already saved
                        const localStorageObject = getLocalStorage();
                        const isDuplicate = localStorageObject.sbArrivalTimes.some(timeSpan => isEqual(timeSpan, [startTime, endTime]));

                        if (isDuplicate) {
                            UI.ErrorMessage(`${twSDK.tt('This entry already exists.')}`);
                            return;
                        }

                        // Valid entry, proceed to update localStorage
                        localStorageObject.sbArrivalTimes.push([startTime, endTime]);
                        saveLocalStorage(localStorageObject);

                        // Create a new row for the new entry
                        const newEntryRow = jQuery('<tr class="entry-row"></tr>');
                        newEntryRow.append(`<td class="entry-start">${formatLocalizedTime(new Date(startTime))}</td>`);
                        newEntryRow.append(`<td class="entry-end">${formatLocalizedTime(new Date(endTime))}</td>`);
                        newEntryRow.append(`<td class="ra-tac"><button class="delete-entry-btn" id="btn-${startTime}-${endTime}">X</button></td>`);
                        jQuery('#sbArrivalEntryTable').append(newEntryRow);

                        // Make the table visible if it has at least one entry
                        jQuery('#sbArrivalEntryTable').css('display', 'table');

                        // Event handler for the delete entry button
                        newEntryRow.find('.delete-entry-btn').on('click', function () {
                            newEntryRow.remove();
                            const updatedLocalStorage = getLocalStorage();
                            updatedLocalStorage.sbArrivalTimes = updatedLocalStorage.sbArrivalTimes.filter(timeSpan => !isEqual(timeSpan, [startTime, endTime]));
                            saveLocalStorage(updatedLocalStorage);

                            if(DEBUG) console.debug(`${scriptInfo}: Updated Local Storage:`, updatedLocalStorage);
                            if(DEBUG) console.debug(`${scriptInfo}: Updated sbArrivalTimes length:`, updatedLocalStorage.sbArrivalTimes.length);

                            // Hide the table if there are no entries
                            if(updatedLocalStorage.sbArrivalTimes.length === 0) {
                                jQuery('#sbArrivalEntryTable').css('display', 'none');
                            }
                        });
                    } else {
                        UI.ErrorMessage(`${twSDK.tt('Invalid entry. Please select valid start and end times.')}`);
                    }
                } else {
                    UI.ErrorMessage(`${twSDK.tt('Invalid entry. Please check the selected times.')}`);
                }
            });

            $('#resetInput').on('click', function () {
                resetInputFields();
            });

            $('#sbResCalculate').on('click', async function (e){
                e.preventDefault();
                await calculate();
            });

            $(document).ready(function () {
                allIdsRS.forEach(function (id) {
                    $('#' + id).on('change', handleInputChange);
                });
            });
        }

        function generateCSS() {
            // Start building the CSS string
            let css = `
                .sb-grid-5 {
                    grid-template-columns: repeat(5, 1fr);
                }
                .sb-grid-4 {
                    grid-template-columns: repeat(4, 1fr);
                }
                .sb-grid-3 {
                    grid-template-columns: repeat(3, 1fr);
                }
                .sb-grid-2 {
                    grid-template-columns: repeat(2, 1fr);
                }
                .sb-grid-20-80 {
                    grid-template-columns: 20% 80%;
                }
                .sb-grid-75-25 {
                    grid-template-columns: 75% 25%;
                }
                .sb-grid-25-25-50 {
                    grid-template-columns: calc(25% - 5px) calc(25% - 5px) calc(50% - 10px);
                }
                .sb-grid {
                    display: grid;
                    grid-gap: 10px;
                }
                fieldset {
                    border: 1px solid #c1a264;
                    border-radius: 4px;
                    padding: 9px;
                }
                legend {
                    font-size: 12px; 
                    font-weight: bold; 
                }
                input[type="number"] {
                    padding: 8px;
                    font-size: 14px;
                    border: 1px solid #c1a264;
                    border-radius: 3px;
                    width: 90px;
                }
                input[type="checkbox"] {
                    margin-right: 5px;
                    transform: scale(1.2);
                }
                input[type="email"] {
                    padding: 8px;
                    font-size: 11px;
                    border: 1px solid #c1a264;
                    border-radius: 3px;
                    width: 100%; 
                }
                input[type="email"]::placeholder { 
                    font-style: italic;
                    font-size: 10px;
                }
                .btn-confirm-yes { 
                    padding: 3px; 
                    margin: 5px; 
                }
                input[type="number"]::-webkit-inner-spin-button,
                input[type="number"]::-webkit-outer-spin-button,
                input[type="number"] {
                    -webkit-appearance: none;
                    margin: 0;
                }
                input[type="number"] {
                    -moz-appearance: textfield;
                }
                input[type="number"]:focus,
                input[type="checkbox"]:focus,
                input[type="email"]:focus {
                    outline: none;
                    border-color: #92794e;
                    box-shadow: 0 0 5px rgba(193, 162, 100, 0.7);
                }
                select {
                    padding: 8px;
                    font-size: 14px;
                    border: 1px solid #c1a264;
                    border-radius: 3px;
                    width: 165px;
                }
                select:hover {
                    border-color: #92794e; 
                }
                select:focus {
                    outline: none;
                    border-color: #92794e; 
                    box-shadow: 0 0 5px rgba(193, 162, 100, 0.7);
                }
                .info-text {
                    font-size: 12px; 
                    font-weight: bold;
                }
                .filter-village-options {
                    border: 1px solid #c1a264;
                    border-radius: 4px;
                    padding: 5px;
                }
                .result-text {
                    width: 100%;
                    height: 150px;
                    border: 1px solid #c1a264;
                    border-radius: 4px;
                    padding: 8px;
                    font-size: 14px;
                    margin-top: 5px;
                    resize: none;
                }
                .copy-button {
                    padding: 10px;
                    background-color: #c1a264;
                    color: #fff;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                }
                .copy-button:hover {
                    background-color: #a0884e;
                }
                .sb-coord-input {
                    overflow: hidden;
                    resize: none;
                    scrollbar-width: none;
                    -ms-overflow-style: none;
                }
                #resetInput {
                    padding: 8px;
                    font-size: 12px;
                    color: white;
                    font-weight: bold;
                    background: #af281d;
                    background: linear-gradient(to bottom, #af281d 0%,#801006 100%);
                    border: 1px solid;
                    border-color: #006712;
                    border-radius: 3px;
                    cursor: pointer;
                }
                #resetInput:hover {
                    background: #c92722;
                    background: linear-gradient(to bottom, #c92722 0%,#a00d08 100%);
                }
                #pl-separator {
                    font-size: 15px;
                    width: 100%;
                }
                .btn-confirm-clicked { 
                    background: #666 !important; 
                }
                .ra-textarea::placeholder {
                    font-size: 15px; 
                    font-style: italic; 
                }
                .sb-fieldset {
                    border: 1px solid #c1a264;
                    border-radius: 4px;
                    padding: 10px;
                }
                .sb-fieldset legend {
                    font-size: 12px; 
                    font-weight: bold; 
                }
                .sb-fieldset select {
                    padding: 8px;
                    font-size: 14px;
                    border: 1px solid #c1a264;
                    border-radius: 3px;
                    width: 165px;
                }
                .sb-fieldset input[type="number"] {
                    padding: 8px;
                    font-size: 14px;
                    border: 1px solid #c1a264;
                    border-radius: 3px;
                    width: 70px;
                }
                .sb-fieldset input[type="checkbox"] {
                    margin-right: 5px;
                    transform: scale(1.2);
                }
                .ra-table th img {
                    display: block;
                    margin: 0 auto;
                }
                input[type="datetime-local"] {
                    padding: 10px;
                    font-size: 13px; 
                    border: 1px solid #c1a264;
                    border-radius: 3px;
                }
                .sb-grid-item-text {
                    font-size: 16px; 
                    text-align: center; 
                    line-height: 34px; 
                }
                .add-entry-btn {
                    padding: 10px;
                    font-size: 17px;
                    color: white;
                    background: #0bac00;
                    background: linear-gradient(to bottom, #0bac00 0%,#0e7a1e 100%);
                    border: 1px solid;
                    border-color: #006712;
                    border-radius: 3px;
                    cursor: pointer;
                }
                .add-entry-btn, .sbDeleteAllEntries {
                    width: 90%;
                    height: 40px;
                    display: inline-block;
                    text-align: center;
                }                
                .delete-entry-btn:hover {
                    text-decoration: underline; 
                }
                .sbDeleteAllEntries {
                    padding: 8px;
                    font-size: 11.5px;
                    font-weight: bold;
                    background: #af281d;
                    background: linear-gradient(to bottom, #af281d 0%,#801006 100%);
                }
                .sbDeleteAllEntries:hover {
                    background: #c92722;
                    background: linear-gradient(to bottom, #c92722 0%,#a00d08 100%);
                }
                .sb-mb5 {
                    margin-bottom: 5px !important;
                }
                #sbAddTimeEntry:hover {
                    background: #13c600;
                    background: linear-gradient(to bottom, #13c600 0%,#129e23 100%);
                }
                .entries-table {
                    width: 100%;
                    border-collapse: collapse;
                }
                .entries-table th {
                    background-color: #f2f2f2;
                    text-align: left;
                    padding: 10px;
                }
                .entries-table td {
                    border: 1px solid #ddd;
                    padding: 8px;
                }
                .entry-row:nth-child(even) {
                    background-color: ##f0e2be;
                }
                .entry-row:nth-child(odd) {
                    background-color: #fff5da;
                }
                .entry-start, .entry-end {
                    text-align: center;
                }
                .delete-entry-btn {
                    width: 30%;
                    height: 50%;
                    padding: 10px;
                    border: 1px solid black;
                    border-radius: 3px;
                    color: white;
                    cursor: pointer;
                    font-weight: bold;
                    background: #af281d;
                    background: linear-gradient(to bottom, #af281d 0%,#801006 100%);
                    padding: 0;
                }
                .delete-entry-btn:hover {
                    background: #c92722;
                    background: linear-gradient(to bottom, #c92722 0%,#a00d08 100%);
                }
                input[type="radio"] + label,
                input[type="checkbox"] + label {
                    display: inline-block;
                    margin-left: 5px;
                }
            `;
            return css;
        }


        async function calculate() {
            if (DEBUG) console.debug(`${scriptInfo}: Calculating...`);
            totalWoodSent = 0;
            totalClaySent = 0;
            totalIronSent = 0;
        
            // Get the input from localstorage
            const localStorageObject = getLocalStorage();
            if (DEBUG) console.debug(`${scriptInfo}: Local Storage Object:`, localStorageObject);
        
            // Verify inputs
            if (!verifyInputs(localStorageObject)) {
                return;
            }
        
            // Get origin and target villages
            const originVillages = localStorageObject.sbOriginCustomSelection ? localStorageObject.sbCustomOriginVillages.split(' ') : await getVillagesByGroupId(localStorageObject.sbOriginGroupsFilter);
            const targetVillages = localStorageObject.sbTargetCustomSelection ? localStorageObject.sbCustomTargetVillages.split(' ') : await getVillagesByGroupId(localStorageObject.sbTargetGroupsFilter);
            
            if(DEBUG) console.debug(`${scriptInfo}: Origin Villages from Custom Selection? ${localStorageObject.sbOriginCustomSelection}:`, originVillages);
            if(DEBUG) console.debug(`${scriptInfo}: Target Villages from Custom Selection? ${localStorageObject.sbTargetCustomSelection}:`, targetVillages);

            let transportData = [];

            // Determine which calculation function to call based on the selected radio button
            if (localStorageObject.sbSendResourcesAbsoluteRadio) {
                transportData = calculateAbsoluteResources(originVillages, targetVillages);
            } else if (localStorageObject.sbSendResourcesRatioRadio) {
                transportData = calculateRatioResources(originVillages, targetVillages);
            } else if (localStorageObject.sbSendResourcesMintRatioRadio) {
                transportData = calculateMintRatioResources(originVillages, targetVillages);
            } else if (localStorageObject.sbSendResourcesFillRadio) {
                transportData = calculateFillResources(originVillages, targetVillages);
            }

            if (DEBUG) console.debug(`${scriptInfo}: Creating table`);
            // here we need to create a table with each transport listed with a button to send the transport
            createTransportTable(transportData);

        }

        // Function to create and append a table that contains each transport in a row with a button to send
        // Inspired by shinko to kuma
        function createTransportTable(transportData) {
            // Remove existing table if it exists
            if ($("#sbTransportTable")[0]) {
                $("#sbTransportTable")[0].remove();
            }
        
            // Sort the transports by ascending travel time
            transportData.sort((a, b) => a.travelTime - b.travelTime);
        
            // Create the table structure
            let htmlString = `
                <div id="sbTransportTable">
                    <table id="transportTable" width="100%">
                        <thead>
                            <tr>
                                <th colspan="7" style="text-align:center">${twSDK.tt('Total Resources Sent')}</th>
                            </tr>
                            <tr>
                                <th colspan="2"></th>
                                <th>${twSDK.tt('Wood')}</th>
                                <th>${twSDK.tt('Clay')}</th>
                                <th>${twSDK.tt('Iron')}</th>
                                <th colspan="2"></th>
                            </tr>
                            <tr>
                                <th colspan="2"></th>
                                <th id="totalWoodSent">0</th>
                                <th id="totalClaySent">0</th>
                                <th id="totalIronSent">0</th>
                                <th colspan="2"></th>
                            </tr>
                            <tr>
                                <th>${twSDK.tt('Origin')}</th>
                                <th>${twSDK.tt('Target')}</th>
                                <th>${twSDK.tt('Travel Time')}</th>
                                <th>${twSDK.tt('Wood')}</th>
                                <th>${twSDK.tt('Clay')}</th>
                                <th>${twSDK.tt('Iron')}</th>
                                <th>${twSDK.tt('Send')}</th>
                            </tr>
                        </thead>
                        <tbody id="transportTableBody">
                        </tbody>
                    </table>
                </div>
            `.trim();
        
            // Append the table to the existing div with the id sbTransportTableContainer
            let uiDiv = document.createElement('div');
            uiDiv.innerHTML = htmlString;
            $("#sbTransportTableContainer").prepend(uiDiv.firstChild);
        
            // Create table rows for each transport
            let tableBody = $("#transportTableBody");
            transportData.forEach((transport, index) => {
                // Get the target village id from the coordinates
                const targetVillageId = villageData[transport.target];
                let rowClass = index % 2 === 0 ? "evenRow" : "oddRow";
        
                // Convert travel time from ms to hh:mm:ss format
                let travelTime = msToTime(transport.travelTime);
        
                let rowHtml = `
                    <tr id="row-${index}" class="${rowClass}">
                        <td><a href="${transport.url}" style="color:#40D0E0;">${transport.name}</a></td>
                        <td>${transport.target}</td>
                        <td>${travelTime}</td>
                        <td>${transport.wood}<span class="icon header wood"></span></td>
                        <td>${transport.clay}<span class="icon header clay"></span></td>
                        <td>${transport.iron}<span class="icon header iron"></span></td>
                        <td style="text-align:center">
                            <input type="button" class="btn evt-confirm-btn btn-confirm-yes sendResources" value="Send" onclick="sendResource(${transport.id}, '${targetVillageId}', ${transport.wood}, ${transport.clay}, ${transport.iron}, ${index})">
                        </td>
                    </tr>
                `;
                tableBody.append(rowHtml);
            });
        
            // Focus on the first send button
            $("#transportTableBody input[type='button']").first().focus();
        }
        
        // Function to send a resource transport
        // Inspired by shinko to kuma
        window.sendResource = function(originVillageId, targetVillageId, wood, clay, iron, index) {
            // Disable all send buttons to prevent multiple sends at the same time
            $('.sendResources').prop('disabled', true);
        
            // Wait for 200 ms before sending the resources
            setTimeout(function () {
                // Remove the row from the table
                $("#row-" + index).remove();
        
                // Enable all send buttons
                $('.sendResources').prop('disabled', false);
        
                // Focus on the next send button
                const nextButton = $("#transportTableBody input[type='button']").first();
                if (nextButton.length) {
                    nextButton.focus();
                }
        
                // If there are no more rows left, alert the user and stop the script
                if ($("#transportTableBody tr").length <= 0) {
                    alert(twSDK.tt("Finished sending!"));
        
                    if ($(".btn-pp").length > 0) {
                        $(".btn-pp").remove();
                    }
                    throw Error("Done.");
                }
            }, 200);
        
            // Prepare the data to be sent
            var data = {
                "target_id": targetVillageId,
                "wood": wood,
                "stone": clay,
                "iron": iron
            };
        
            // Send the resources using TribalWars API
            TribalWars.post("market", {
                ajaxaction: "map_send",
                village: originVillageId
            }, data, function (response) {
                // Close the dialog and show a success message
                Dialog.close();
                UI.SuccessMessage(response.message);
                if (DEBUG) console.debug(`${scriptInfo}: Response message:`, response.message);
                if (DEBUG) console.debug(`${scriptInfo}: Resources sent:`, data);
        
                // Update the total resources sent
                totalWoodSent += wood;
                totalClaySent += clay;
                totalIronSent += iron;
        
                // Update the UI with the total resources sent
                $("#totalWoodSent").eq(0).text(`${convertToNumberWithDots(totalWoodSent)}`);
                $("#totalClaySent").eq(0).text(`${convertToNumberWithDots(totalClaySent)}`);
                $("#totalIronSent").eq(0).text(`${convertToNumberWithDots(totalIronSent)}`);
            }, false);
        }
        
        // Function to format numbers with commas for easier readability
        function convertToNumberWithDots(number) {
            return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        }

        // Function to convert milliseconds to hh:mm:ss format
        function msToTime(duration) {
            let seconds = Math.floor((duration / 1000) % 60);
            let minutes = Math.floor((duration / (1000 * 60)) % 60);
            let hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
        
            hours = (hours < 10) ? "0" + hours : hours;
            minutes = (minutes < 10) ? "0" + minutes : minutes;
            seconds = (seconds < 10) ? "0" + seconds : seconds;
        
            return hours + ":" + minutes + ":" + seconds;
        }

        // Function to calculate sending absolute resources
        function calculateAbsoluteResources(originVillages, targetVillages) {
            const localStorageObject = getLocalStorage();
            const merchantBonus = parseBool(localStorageObject.sbMerchantBonus);
            const holdBackMerchants = Number(localStorageObject.sbHoldBackMerchants);
            const holdBackResourcesAbsolute = parseBool(localStorageObject.sbHoldBackResourcesAbsoluteRadio);
            const holdBackResourcesPercentage = parseBool(localStorageObject.sbHoldBackResourcesPercentageRadio);
            const holdBackWood = Number(localStorageObject.sbHoldBackWood);
            const holdBackClay = Number(localStorageObject.sbHoldBackClay);
            const holdBackIron = Number(localStorageObject.sbHoldBackIron);
            const holdBackPercentage = Number(localStorageObject.sbHoldBackPercentage);
            const maxWood = Number(localStorageObject.sbMaxWood);
            const maxClay = Number(localStorageObject.sbMaxClay);
            const maxIron = Number(localStorageObject.sbMaxIron);
            const arrivalTimes = getLocalStorage().sbArrivalTimes;
        
            // Absolute numbers
            const woodToSend = Number(localStorageObject.sbSendWood);
            const clayToSend = Number(localStorageObject.sbSendClay);
            const ironToSend = Number(localStorageObject.sbSendIron);
        
            const merchantCapacity = merchantBonus ? 1500 : 1000;
        
            if (DEBUG) console.debug(`${scriptInfo}:Initial settings:`, {
                merchantBonus,
                holdBackMerchants,
                holdBackResourcesAbsolute,
                holdBackResourcesPercentage,
                holdBackWood,
                holdBackClay,
                holdBackIron,
                holdBackPercentage,
                maxWood,
                maxClay,
                maxIron,
                arrivalTimes,
                woodToSend,
                clayToSend,
                ironToSend,
                merchantCapacity
            });
        
            // Step 1: Create a copy of the player data object and adjust for hold back merchants and resources
            const playerDataCopy = JSON.parse(JSON.stringify(playerData));
            playerDataCopy.forEach(village => {
                village.availableMerchants = Math.max(0, village.availableMerchants - holdBackMerchants);
                if (holdBackResourcesAbsolute) {
                    village.wood = Math.max(0, village.wood - holdBackWood);
                    village.clay = Math.max(0, village.clay - holdBackClay);
                    village.iron = Math.max(0, village.iron - holdBackIron);
                } else if (holdBackResourcesPercentage) {
                    const holdBackAmount = village.warehouseCapacity * (holdBackPercentage / 100);
                    village.wood = Math.max(0, village.wood - holdBackAmount);
                    village.clay = Math.max(0, village.clay - holdBackAmount);
                    village.iron = Math.max(0, village.iron - holdBackAmount);
                }
            });
        
            if (DEBUG) console.debug(`${scriptInfo}: Player data after adjustments:`, playerDataCopy);
        
            // Remove entries where the coordinate is not in originVillages
            const filteredPlayerData = playerDataCopy.filter(village => originVillages.includes(village.coord));
        
            if (DEBUG) console.debug(`${scriptInfo}: Filtered player data:`, filteredPlayerData);
        
            // Step 2: Remove villages with 0 resources, 0 available merchants, or not enough resources to meet the absolute numbers
            const validVillages = filteredPlayerData.filter(village => {
                const totalMerchantCapacity = village.availableMerchants * merchantCapacity;
                const totalResourcesToSend = woodToSend + clayToSend + ironToSend;
                return (
                    village.wood >= woodToSend &&
                    village.clay >= clayToSend &&
                    village.iron >= ironToSend &&
                    village.availableMerchants > 0 &&
                    totalResourcesToSend <= totalMerchantCapacity
                );
            });
        
            if (DEBUG) console.debug(`${scriptInfo}: Valid villages:?`, validVillages);
        
            // Initialize remaining resources for each target village
            const targetVillageResources = {};
            const INFINITE_RESOURCES = Number.MAX_SAFE_INTEGER;
            
            targetVillages.forEach(targetVillage => {
                targetVillageResources[targetVillage] = {
                    wood: maxWood === 0 ? INFINITE_RESOURCES : maxWood,
                    clay: maxClay === 0 ? INFINITE_RESOURCES : maxClay,
                    iron: maxIron === 0 ? INFINITE_RESOURCES : maxIron
                };
            });
        
            if (DEBUG) console.debug(`${scriptInfo}: Target village resources:`, targetVillageResources);
        
            // Step 3: Calculate possible origin to target village pairs based on arrival times
            const currentTime = Date.now();
            const originTargetPairs = {};
            
            validVillages.forEach(originVillage => {
                const possibleTargets = targetVillages.map(targetVillage => {
                    // Skip pairs where the target village and the origin village are the same
                    if (originVillage.coord === targetVillage) {
                        return null;
                    }
            
                    const travelTime = calculateTravelTime(originVillage.coord, targetVillage, merchantBonus);
                    const arrivalTime = currentTime + travelTime;
                    const withinArrivalTime = arrivalTimes.length === 0 || arrivalTimes.some(([start, end]) => arrivalTime >= start && arrivalTime <= end);
                    return withinArrivalTime ? { coord: targetVillage, travelTime } : null;
                }).filter(Boolean);
            
                if (possibleTargets.length > 0) {
                    originTargetPairs[originVillage.coord] = possibleTargets.sort((a, b) => a.travelTime - b.travelTime);
                }
            });
        
            if (DEBUG) console.debug(`${scriptInfo}: Origin to target pairs:`, originTargetPairs);
        
            // Step 4: Fill the final transport data array
            const transportData = [];
        
            while (Object.keys(originTargetPairs).length > 0) {
                const originCoord = Object.keys(originTargetPairs)[0];
                const originVillage = validVillages.find(village => village.coord === originCoord);
                const targetVillage = originTargetPairs[originCoord][0]; // Select the target village with the lowest travel time

        
                const resourcesToSend = {
                    wood: Math.min(woodToSend, targetVillageResources[targetVillage.coord].wood),
                    clay: Math.min(clayToSend, targetVillageResources[targetVillage.coord].clay),
                    iron: Math.min(ironToSend, targetVillageResources[targetVillage.coord].iron)
                };
        
                if (resourcesToSend.wood > 0 || resourcesToSend.clay > 0 || resourcesToSend.iron > 0) {
                    transportData.push({
                        origin: originVillage.coord,
                        target: targetVillage.coord,
                        wood: resourcesToSend.wood,
                        clay: resourcesToSend.clay,
                        iron: resourcesToSend.iron,
                        url: originVillage.url,
                        name: originVillage.name,
                        id: originVillage.id,
                        travelTime: originTargetPairs[originCoord][0].travelTime
                    });
        
                    // Update remaining resources for the target village
                    targetVillageResources[targetVillage.coord].wood -= resourcesToSend.wood;
                    targetVillageResources[targetVillage.coord].clay -= resourcesToSend.clay;
                    targetVillageResources[targetVillage.coord].iron -= resourcesToSend.iron;
        
                    if (DEBUG) console.debug(`${scriptInfo}: Updated target village resources:`, targetVillageResources[targetVillage.coord]);
        
                    // Remove target village from all origin villages if it has no more resources remaining
                    if (
                        targetVillageResources[targetVillage.coord].wood <= woodToSend ||
                        targetVillageResources[targetVillage.coord].clay <= clayToSend ||
                        targetVillageResources[targetVillage.coord].iron <= ironToSend
                    ) {
                        Object.keys(originTargetPairs).forEach(originCoord => {
                            originTargetPairs[originCoord] = originTargetPairs[originCoord].filter(
                                target => target.coord !== targetVillage.coord
                            );
                        });
        
                        if (DEBUG) console.debug(`${scriptInfo}: Removed target village from origin villages:`, targetVillage.coord);
                    }
                }
        
                // Remove origin village after assigning it a transport
                delete originTargetPairs[originCoord];
        
                if (DEBUG) console.debug(`${scriptInfo}: Removed origin village after assigning transport:`, originCoord);
            }
        
            if (DEBUG) console.debug(`${scriptInfo}: Transport Data:`, transportData);
        
            return transportData;
        }

        // Function to calculate sending resources as a ratio
        function calculateRatioResources(originVillages, targetVillages) {
            const localStorageObject = getLocalStorage();
            const merchantBonus = parseBool(localStorageObject.sbMerchantBonus);
            const holdBackMerchants = Number(localStorageObject.sbHoldBackMerchants);
            const holdBackResourcesAbsolute = parseBool(localStorageObject.sbHoldBackResourcesAbsoluteRadio);
            const holdBackResourcesPercentage = parseBool(localStorageObject.sbHoldBackResourcesPercentageRadio);
            const holdBackWood = Number(localStorageObject.sbHoldBackWood);
            const holdBackClay = Number(localStorageObject.sbHoldBackClay);
            const holdBackIron = Number(localStorageObject.sbHoldBackIron);
            const holdBackPercentage = Number(localStorageObject.sbHoldBackPercentage);
            const maxWood = Number(localStorageObject.sbMaxWood);
            const maxClay = Number(localStorageObject.sbMaxClay);
            const maxIron = Number(localStorageObject.sbMaxIron);
            const arrivalTimes = getLocalStorage().sbArrivalTimes;
        
            // Ratios
            const woodRatio = Number(localStorageObject.sbSendWoodRatio) / 100;
            const clayRatio = Number(localStorageObject.sbSendClayRatio) / 100;
            const ironRatio = Number(localStorageObject.sbSendIronRatio) / 100;
        
            const merchantCapacity = merchantBonus ? 1500 : 1000;
        
            if (DEBUG) console.debug(`${scriptInfo}: Initial settings:`, {
                merchantBonus,
                holdBackMerchants,
                holdBackResourcesAbsolute,
                holdBackResourcesPercentage,
                holdBackWood,
                holdBackClay,
                holdBackIron,
                holdBackPercentage,
                maxWood,
                maxClay,
                maxIron,
                arrivalTimes,
                woodRatio,
                clayRatio,
                ironRatio,
                merchantCapacity
            });
        
            // Step 1: Create a copy of the player data object and adjust for hold back merchants and resources
            const playerDataCopy = JSON.parse(JSON.stringify(playerData));
            playerDataCopy.forEach(village => {
                village.availableMerchants = Math.max(0, village.availableMerchants - holdBackMerchants);
                if (holdBackResourcesAbsolute) {
                    village.wood = Math.max(0, village.wood - holdBackWood);
                    village.clay = Math.max(0, village.clay - holdBackClay);
                    village.iron = Math.max(0, village.iron - holdBackIron);
                } else if (holdBackResourcesPercentage) {
                    const holdBackAmount = village.warehouseCapacity * (holdBackPercentage / 100);
                    village.wood = Math.max(0, village.wood - holdBackAmount);
                    village.clay = Math.max(0, village.clay - holdBackAmount);
                    village.iron = Math.max(0, village.iron - holdBackAmount);
                }
            });
        
            if (DEBUG) console.debug(`${scriptInfo}: Player data after adjustments:`, playerDataCopy);
        
            // Remove entries where the coordinate is not in originVillages
            const filteredPlayerData = playerDataCopy.filter(village => originVillages.includes(village.coord));
        
            if (DEBUG) console.debug(`${scriptInfo}: Filtered player data:`, filteredPlayerData);
        
            // Step 2: Remove villages with 0 resources or 0 available merchants
            const validVillages = filteredPlayerData.filter(village => village.wood > 0 && village.clay > 0 && village.iron > 0 && village.availableMerchants > 0);
        
            if (DEBUG) console.debug(`${scriptInfo}: Valid villages:`, validVillages);
        
            // Initialize remaining resources for each target village
            const targetVillageResources = {};
            const INFINITE_RESOURCES = Number.MAX_SAFE_INTEGER;
            
            targetVillages.forEach(targetVillage => {
                targetVillageResources[targetVillage] = {
                    wood: maxWood === 0 ? INFINITE_RESOURCES : maxWood,
                    clay: maxClay === 0 ? INFINITE_RESOURCES : maxClay,
                    iron: maxIron === 0 ? INFINITE_RESOURCES : maxIron
                };
            });
        
            if (DEBUG) console.debug(`${scriptInfo}: Target village resources:`, targetVillageResources);
        
            // Step 3: Calculate possible origin to target village pairs based on arrival times
            const currentTime = Date.now();
            const originTargetPairs = {};
            
            validVillages.forEach(originVillage => {
                const possibleTargets = targetVillages.map(targetVillage => {
                    // Skip pairs where the target village and the origin village are the same
                    if (originVillage.coord === targetVillage) {
                        return null;
                    }
                    const travelTime = calculateTravelTime(originVillage.coord, targetVillage, merchantBonus);
                    const arrivalTime = currentTime + travelTime;
                    const withinArrivalTime = arrivalTimes.length === 0 || arrivalTimes.some(([start, end]) => arrivalTime >= start && arrivalTime <= end);
                    return withinArrivalTime ? { coord: targetVillage, travelTime } : null;
                }).filter(Boolean);
            
                if (possibleTargets.length > 0) {
                    originTargetPairs[originVillage.coord] = possibleTargets.sort((a, b) => a.travelTime - b.travelTime);
                }
            });
            
            if (DEBUG) console.debug(`${scriptInfo}: Origin to target pairs:`, originTargetPairs);
        
            // Step 4: Fill the final transport data array
            const transportData = [];
        
            while (Object.keys(originTargetPairs).length > 0) {
                const originCoord = Object.keys(originTargetPairs)[0];
                const originVillage = validVillages.find(village => village.coord === originCoord);
                const targetVillage = originTargetPairs[originCoord][0]; // Select the target village with the lowest travel time
        
                const totalMerchantCapacity = originVillage.availableMerchants * merchantCapacity;
        
                // Calculate the maximum amount of each resource that can be carried by the merchants
                let maxWoodTransport = totalMerchantCapacity * woodRatio;
                let maxClayTransport = totalMerchantCapacity * clayRatio;
                let maxIronTransport = totalMerchantCapacity * ironRatio;
        
                // Adjust the amounts based on the available resources
                let adjustmentFactor = 1;
                if (maxWoodTransport > originVillage.wood) {
                    adjustmentFactor = originVillage.wood / maxWoodTransport;
                    maxWoodTransport *= adjustmentFactor;
                    maxClayTransport *= adjustmentFactor;
                    maxIronTransport *= adjustmentFactor;
                }
                if (maxClayTransport > originVillage.clay) {
                    adjustmentFactor = originVillage.clay / maxClayTransport;
                    maxWoodTransport *= adjustmentFactor;
                    maxClayTransport *= adjustmentFactor;
                    maxIronTransport *= adjustmentFactor;
                }
                if (maxIronTransport > originVillage.iron) {
                    adjustmentFactor = originVillage.iron / maxIronTransport;
                    maxWoodTransport *= adjustmentFactor;
                    maxClayTransport *= adjustmentFactor;
                    maxIronTransport *= adjustmentFactor;
                }
        
                const resourcesToSend = {
                    wood: Math.floor(Math.min(maxWoodTransport, targetVillageResources[targetVillage.coord].wood)),
                    clay: Math.floor(Math.min(maxClayTransport, targetVillageResources[targetVillage.coord].clay)),
                    iron: Math.floor(Math.min(maxIronTransport, targetVillageResources[targetVillage.coord].iron))
                };
        
                if (resourcesToSend.wood > 0 || resourcesToSend.clay > 0 || resourcesToSend.iron > 0) {
                    transportData.push({
                        origin: originVillage.coord,
                        target: targetVillage.coord,
                        wood: resourcesToSend.wood,
                        clay: resourcesToSend.clay,
                        iron: resourcesToSend.iron,
                        url: originVillage.url,
                        name: originVillage.name,
                        id: originVillage.id,
                        travelTime: originTargetPairs[originCoord][0].travelTime
                    });
        
                    // Update remaining resources for the target village
                    targetVillageResources[targetVillage.coord].wood -= resourcesToSend.wood;
                    targetVillageResources[targetVillage.coord].clay -= resourcesToSend.clay;
                    targetVillageResources[targetVillage.coord].iron -= resourcesToSend.iron;
        
                    if (DEBUG) console.debug(`${scriptInfo}: Updated target village resources:`, targetVillageResources[targetVillage.coord]);
        
                    // Remove target village from all origin villages if it has no more resources remaining
                    if (
                        targetVillageResources[targetVillage.coord].wood <= 0 ||
                        targetVillageResources[targetVillage.coord].clay <= 0 ||
                        targetVillageResources[targetVillage.coord].iron <= 0
                    ) {
                        Object.keys(originTargetPairs).forEach(originCoord => {
                            originTargetPairs[originCoord] = originTargetPairs[originCoord].filter(
                                target => target.coord !== targetVillage.coord
                            );
                        });
        
                        if (DEBUG) console.debug(`${scriptInfo}: Removed target village from origin villages:`, targetVillage.coord);
                    }
                }
        
                // Remove origin village after assigning it a transport
                delete originTargetPairs[originCoord];
        
                if (DEBUG) console.debug(`${scriptInfo}: Removed origin village after assigning transport:`, originCoord);
            }
        
            if (DEBUG) console.debug(`${scriptInfo}: Transport Data:`, transportData);
        
            return transportData;
        }

        // Function to calculate sending resources as a mint ratio
        function calculateMintRatioResources(originVillages, targetVillages) {
            // Accurate mint ratios -- Inspired by shinko to kuma
            const woodPercentage = 28000 / 83000;
            const clayPercentage = 30000 / 83000;
            const ironPercentage = 25000 / 83000;
        
            const localStorageObject = getLocalStorage();
            const merchantBonus = parseBool(localStorageObject.sbMerchantBonus);
            const holdBackMerchants = Number(localStorageObject.sbHoldBackMerchants);
            const holdBackResourcesAbsolute = parseBool(localStorageObject.sbHoldBackResourcesAbsoluteRadio);
            const holdBackResourcesPercentage = parseBool(localStorageObject.sbHoldBackResourcesPercentageRadio);
            const holdBackWood = Number(localStorageObject.sbHoldBackWood);
            const holdBackClay = Number(localStorageObject.sbHoldBackClay);
            const holdBackIron = Number(localStorageObject.sbHoldBackIron);
            const holdBackPercentage = Number(localStorageObject.sbHoldBackPercentage);
            const maxWood = Number(localStorageObject.sbMaxWood);
            const maxClay = Number(localStorageObject.sbMaxClay);
            const maxIron = Number(localStorageObject.sbMaxIron);
            const arrivalTimes = getLocalStorage().sbArrivalTimes;
        
            const merchantCapacity = merchantBonus ? 1500 : 1000;
        
            if (DEBUG) console.debug(`${scriptInfo}: Initial settings:`, {
                merchantBonus,
                holdBackMerchants,
                holdBackResourcesAbsolute,
                holdBackResourcesPercentage,
                holdBackWood,
                holdBackClay,
                holdBackIron,
                holdBackPercentage,
                maxWood,
                maxClay,
                maxIron,
                arrivalTimes,
                woodPercentage,
                clayPercentage,
                ironPercentage,
                merchantCapacity
            });
        
            // Step 1: Create a copy of the player data object and adjust for hold back merchants and resources
            const playerDataCopy = JSON.parse(JSON.stringify(playerData));
            playerDataCopy.forEach(village => {
                village.availableMerchants = Math.max(0, village.availableMerchants - holdBackMerchants);
                if (holdBackResourcesAbsolute) {
                    village.wood = Math.max(0, village.wood - holdBackWood);
                    village.clay = Math.max(0, village.clay - holdBackClay);
                    village.iron = Math.max(0, village.iron - holdBackIron);
                } else if (holdBackResourcesPercentage) {
                    const holdBackAmount = village.warehouseCapacity * (holdBackPercentage / 100);
                    village.wood = Math.max(0, village.wood - holdBackAmount);
                    village.clay = Math.max(0, village.clay - holdBackAmount);
                    village.iron = Math.max(0, village.iron - holdBackAmount);
                }
            });
        
            if (DEBUG) console.debug(`${scriptInfo}: Player data after adjustments:`, playerDataCopy);
        
            // Remove entries where the coordinate is not in originVillages
            const filteredPlayerData = playerDataCopy.filter(village => originVillages.includes(village.coord));
        
            if (DEBUG) console.debug(`${scriptInfo}: Filtered player data:`, filteredPlayerData);
        
            // Step 2: Remove villages with 0 resources or 0 available merchants
            const validVillages = filteredPlayerData.filter(village => village.wood > 0 && village.clay > 0 && village.iron > 0 && village.availableMerchants > 0);
        
            if (DEBUG) console.debug(`${scriptInfo}: Valid villages:`, validVillages);
        
            // Initialize remaining resources for each target village
            const targetVillageResources = {};
            const INFINITE_RESOURCES = Number.MAX_SAFE_INTEGER;
            
            targetVillages.forEach(targetVillage => {
                targetVillageResources[targetVillage] = {
                    wood: maxWood === 0 ? INFINITE_RESOURCES : maxWood,
                    clay: maxClay === 0 ? INFINITE_RESOURCES : maxClay,
                    iron: maxIron === 0 ? INFINITE_RESOURCES : maxIron
                };
            });
        
            if (DEBUG) console.debug(`${scriptInfo}: Target village resources:`, targetVillageResources);
        
            // Step 3: Calculate possible origin to target village pairs based on arrival times
            const currentTime = Date.now();
            const originTargetPairs = {};
        
            validVillages.forEach(originVillage => {
                const possibleTargets = targetVillages.map(targetVillage => {
                    // Skip pairs where the target village and the origin village are the same
                    if (originVillage.coord === targetVillage) {
                        return null;
                    }
                    const travelTime = calculateTravelTime(originVillage.coord, targetVillage, merchantBonus);
                    const arrivalTime = currentTime + travelTime;
                    const withinArrivalTime = arrivalTimes.length === 0 || arrivalTimes.some(([start, end]) => arrivalTime >= start && arrivalTime <= end);
                    return withinArrivalTime ? { coord: targetVillage, travelTime } : null;
                }).filter(Boolean);
        
                if (possibleTargets.length > 0) {
                    originTargetPairs[originVillage.coord] = possibleTargets.sort((a, b) => a.travelTime - b.travelTime);
                }
            });
        
            if (DEBUG) console.debug(`${scriptInfo}: Origin to target pairs:`, originTargetPairs);
        
            // Step 4: Fill the final transport data array
            const transportData = [];
        
            while (Object.keys(originTargetPairs).length > 0) {
                const originCoord = Object.keys(originTargetPairs)[0];
                const originVillage = validVillages.find(village => village.coord === originCoord);
                const targetVillage = originTargetPairs[originCoord][0]; // Select the target village with the lowest travel time
        
                const totalMerchantCapacity = originVillage.availableMerchants * merchantCapacity;
        
                // Calculate the maximum amount of each resource that can be carried by the merchants
                let maxWoodTransport = totalMerchantCapacity * woodPercentage;
                let maxClayTransport = totalMerchantCapacity * clayPercentage;
                let maxIronTransport = totalMerchantCapacity * ironPercentage;
        
                // Adjust the amounts based on the available resources -- inspired by shinko to kuma
                let adjustmentFactor = 1;
                if (maxWoodTransport > originVillage.wood) {
                    adjustmentFactor = originVillage.wood / maxWoodTransport;
                    maxWoodTransport *= adjustmentFactor;
                    maxClayTransport *= adjustmentFactor;
                    maxIronTransport *= adjustmentFactor;
                }
                if (maxClayTransport > originVillage.clay) {
                    adjustmentFactor = originVillage.clay / maxClayTransport;
                    maxWoodTransport *= adjustmentFactor;
                    maxClayTransport *= adjustmentFactor;
                    maxIronTransport *= adjustmentFactor;
                }
                if (maxIronTransport > originVillage.iron) {
                    adjustmentFactor = originVillage.iron / maxIronTransport;
                    maxWoodTransport *= adjustmentFactor;
                    maxClayTransport *= adjustmentFactor;
                    maxIronTransport *= adjustmentFactor;
                }
        
                const resourcesToSend = {
                    wood: Math.floor(Math.min(maxWoodTransport, targetVillageResources[targetVillage.coord].wood)),
                    clay: Math.floor(Math.min(maxClayTransport, targetVillageResources[targetVillage.coord].clay)),
                    iron: Math.floor(Math.min(maxIronTransport, targetVillageResources[targetVillage.coord].iron))
                };
        
                if (resourcesToSend.wood > 0 || resourcesToSend.clay > 0 || resourcesToSend.iron > 0) {
                    transportData.push({
                        origin: originVillage.coord,
                        target: targetVillage.coord,
                        wood: resourcesToSend.wood,
                        clay: resourcesToSend.clay,
                        iron: resourcesToSend.iron,
                        url: originVillage.url,
                        name: originVillage.name,
                        id: originVillage.id,
                        travelTime: originTargetPairs[originCoord][0].travelTime
                    });
        
                    // Update remaining resources for the target village
                    targetVillageResources[targetVillage.coord].wood -= resourcesToSend.wood;
                    targetVillageResources[targetVillage.coord].clay -= resourcesToSend.clay;
                    targetVillageResources[targetVillage.coord].iron -= resourcesToSend.iron;
        
                    if (DEBUG) console.debug(`${scriptInfo}: Updated target village resources:`, targetVillageResources[targetVillage.coord]);
        
                    // Remove target village from all origin villages if it has no more resources remaining
                    if (
                        targetVillageResources[targetVillage.coord].wood <= 0 ||
                        targetVillageResources[targetVillage.coord].clay <= 0 ||
                        targetVillageResources[targetVillage.coord].iron <= 0
                    ) {
                        Object.keys(originTargetPairs).forEach(originCoord => {
                            originTargetPairs[originCoord] = originTargetPairs[originCoord].filter(
                                target => target.coord !== targetVillage.coord
                            );
                        });
        
                        if (DEBUG) console.debug(`${scriptInfo}: Removed target village from origin villages:`, targetVillage.coord);
                    }
                }
        
                // Remove origin village after assigning it a transport
                delete originTargetPairs[originCoord];
        
                if (DEBUG) console.debug(`${scriptInfo}: Removed origin village after assigning transport:`, originCoord);
            }
        
            if (DEBUG) console.debug(`${scriptInfo}: Transport Data:`, transportData);
        
            return transportData;
        }

        // Function to calculate sending resources to fill the warehouse
        function calculateFillResources(originVillages, targetVillages) {
            const localStorageObject = getLocalStorage();
            const merchantBonus = parseBool(localStorageObject.sbMerchantBonus);
            const holdBackMerchants = Number(localStorageObject.sbHoldBackMerchants);
            const holdBackResourcesAbsolute = parseBool(localStorageObject.sbHoldBackResourcesAbsoluteRadio);
            const holdBackResourcesPercentage = parseBool(localStorageObject.sbHoldBackResourcesPercentageRadio);
            const holdBackWood = Number(localStorageObject.sbHoldBackWood);
            const holdBackClay = Number(localStorageObject.sbHoldBackClay);
            const holdBackIron = Number(localStorageObject.sbHoldBackIron);
            const maxWood = Number(localStorageObject.sbMaxWood);
            const maxClay = Number(localStorageObject.sbMaxClay);
            const maxIron = Number(localStorageObject.sbMaxIron);
            const holdBackPercentage = Number(localStorageObject.sbHoldBackPercentage);
            const sendGapToMax = Number(localStorageObject.sbSendGapToMax) / 100;
            const arrivalTimes = getLocalStorage().sbArrivalTimes;
        
            const merchantCapacity = merchantBonus ? 1500 : 1000;
        
            if (DEBUG) console.debug(`${scriptInfo}: Initial settings:`, {
                merchantBonus,
                holdBackMerchants,
                holdBackResourcesAbsolute,
                holdBackResourcesPercentage,
                holdBackWood,
                holdBackClay,
                holdBackIron,
                holdBackPercentage,
                maxWood,
                maxClay,
                maxIron,
                sendGapToMax,
                arrivalTimes,
                merchantCapacity
            });
        
            // Step 1: Create a copy of the player data object and adjust for hold back merchants and resources
            const playerDataCopy = JSON.parse(JSON.stringify(playerData));
            playerDataCopy.forEach(village => {
                village.availableMerchants = Math.max(0, village.availableMerchants - holdBackMerchants);
                if (holdBackResourcesAbsolute) {
                    village.wood = Math.max(0, village.wood - holdBackWood);
                    village.clay = Math.max(0, village.clay - holdBackClay);
                    village.iron = Math.max(0, village.iron - holdBackIron);
                } else if (holdBackResourcesPercentage) {
                    const holdBackAmount = village.warehouseCapacity * (holdBackPercentage / 100);
                    village.wood = Math.max(0, village.wood - holdBackAmount);
                    village.clay = Math.max(0, village.clay - holdBackAmount);
                    village.iron = Math.max(0, village.iron - holdBackAmount);
                }
            });
        
            if (DEBUG) console.debug(`${scriptInfo}: Player data after adjustments:`, playerDataCopy);
        
            // Remove entries where the coordinate is not in originVillages
            const filteredPlayerData = playerDataCopy.filter(village => originVillages.includes(village.coord));
        
            if (DEBUG) console.debug(`${scriptInfo}: Filtered player data:`, filteredPlayerData);
        
            // Initialize remaining resources for each target village based on warehouseData
            const targetVillageResources = {};
            const INFINITE_RESOURCES = Number.MAX_SAFE_INTEGER;
            
            targetVillages.forEach(targetVillage => {
                const warehouse = warehouseData[targetVillage];
                const maxStorage = warehouse.maxStorage * (1 - sendGapToMax);
                targetVillageResources[targetVillage] = {
                    wood: Math.min(maxWood === 0 ? INFINITE_RESOURCES : maxWood, Math.max(0, maxStorage - warehouse.wood)),
                    clay: Math.min(maxClay === 0 ? INFINITE_RESOURCES : maxClay, Math.max(0, maxStorage - warehouse.clay)),
                    iron: Math.min(maxIron === 0 ? INFINITE_RESOURCES : maxIron, Math.max(0, maxStorage - warehouse.iron))
                };
            });
        
            if (DEBUG) console.debug(`${scriptInfo}: Target village resources:`, targetVillageResources);
        
            // Step 2: Calculate possible origin to target village pairs based on arrival times
            const currentTime = Date.now();
            const originTargetPairs = {};
        
            targetVillages.forEach(targetVillage => {
                const possibleOrigins = filteredPlayerData.map(originVillage => {
                    // Skip pairs where the target village and the origin village are the same
                    if (originVillage.coord === targetVillage) {
                        return null;
                    }
                    const travelTime = calculateTravelTime(originVillage.coord, targetVillage, merchantBonus);
                    const arrivalTime = currentTime + travelTime;
                    const withinArrivalTime = arrivalTimes.length === 0 || arrivalTimes.some(([start, end]) => arrivalTime >= start && arrivalTime <= end);                    
                    return withinArrivalTime ? { coord: originVillage.coord, travelTime } : null;
                }).filter(Boolean);
        
                if (possibleOrigins.length > 0) {
                    originTargetPairs[targetVillage] = possibleOrigins.sort((a, b) => a.travelTime - b.travelTime);
                }
            });
        
            if (DEBUG) console.debug(`${scriptInfo}: Origin to target pairs:`, originTargetPairs);
        
            // Step 3: Fill the final transport data array
            const transportData = [];
            
            Object.keys(targetVillageResources).forEach(targetCoord => {
                const targetVillage = targetVillageResources[targetCoord];
            
                while (targetVillage.wood > 0 || targetVillage.clay > 0 || targetVillage.iron > 0) {
                    if (!originTargetPairs[targetCoord] || originTargetPairs[targetCoord].length === 0) {
                        break;
                    }
            
                    const originCoord = originTargetPairs[targetCoord][0].coord;
                    const originVillage = filteredPlayerData.find(village => village.coord === originCoord);
                    const travelTime = originTargetPairs[targetCoord][0].travelTime;
            
                    let totalMerchantCapacity = originVillage.availableMerchants * merchantCapacity;
            
                    let woodToSend = Math.min(totalMerchantCapacity, targetVillage.wood, originVillage.wood);
                    totalMerchantCapacity -= Math.ceil(woodToSend / 1500) * 1500;
            
                    let clayToSend = Math.min(totalMerchantCapacity, targetVillage.clay, originVillage.clay);
                    totalMerchantCapacity -= Math.ceil(clayToSend / 1500) * 1500;
            
                    let ironToSend = Math.min(totalMerchantCapacity, targetVillage.iron, originVillage.iron);
                    totalMerchantCapacity -= Math.ceil(ironToSend / 1500) * 1500;
            
                    const resourcesToSend = {
                        wood: woodToSend,
                        clay: clayToSend,
                        iron: ironToSend
                    };
        
                    if (DEBUG) console.debug(`${scriptInfo}: Resources to send:`, resourcesToSend);
            
                    if (resourcesToSend.wood > 0 || resourcesToSend.clay > 0 || resourcesToSend.iron > 0) {
                        transportData.push({
                            origin: originVillage.coord,
                            target: targetCoord,
                            wood: resourcesToSend.wood,
                            clay: resourcesToSend.clay,
                            iron: resourcesToSend.iron,
                            url: originVillage.url,
                            name: originVillage.name,
                            id: originVillage.id,
                            travelTime: travelTime
                        });
        
                        if (DEBUG) console.debug(`${scriptInfo}: Added transport data:`, transportData[transportData.length - 1]);
            
                        // Update remaining resources for the target village
                        targetVillage.wood -= resourcesToSend.wood;
                        targetVillage.clay -= resourcesToSend.clay;
                        targetVillage.iron -= resourcesToSend.iron;
        
                        if (DEBUG) console.debug(`${scriptInfo}: Updated target village resources:`, targetVillage);
            
                        // Update remaining resources for the origin village
                        originVillage.wood -= resourcesToSend.wood;
                        originVillage.clay -= resourcesToSend.clay;
                        originVillage.iron -= resourcesToSend.iron;
            
                        // Update remaining merchants for the origin village
                        originVillage.availableMerchants -= Math.ceil(resourcesToSend.wood / merchantCapacity) +
                                                             Math.ceil(resourcesToSend.clay / merchantCapacity) +
                                                             Math.ceil(resourcesToSend.iron / merchantCapacity);
        
                        if (DEBUG) console.debug(`${scriptInfo}: Updated origin village resources:`, originVillage);
            
                        // Remove origin village from consideration if it has no more resources or merchants available
                        if (originVillage.wood <= 0 || originVillage.clay <= 0 || originVillage.iron <= 0 || originVillage.availableMerchants <= 0) {
                            originTargetPairs[targetCoord] = originTargetPairs[targetCoord].filter(origin => origin.coord !== originCoord);
                            if (DEBUG) console.debug(`${scriptInfo}: Removed origin village from consideration:`, originCoord);
                        }
                    }
                }
            });
        
            if (DEBUG) console.debug(`${scriptInfo}: Transport Data:`, transportData);
        
            return transportData;
        }

        function calculateTravelTime(origin, target, merchantBonus) {
            const distance = twSDK.calculateDistance(origin, target);
        
            // Access the world configuration
            const { speed } = worldConfig.config;
        
            // Determine the merchant speed based on the bonus
            const merchantTravelSpeed = merchantBonus ? merchantSpeedWithBonus : merchantSpeed;
        
            // Calculate the travel time in milliseconds
            return Math.round((distance * merchantTravelSpeed * 60 * 1000) / speed);
        }


        function verifyInputs(localStorageObject) {  
            // Verify origin and target villages
            const originVillagesCustomSelection = parseBool(localStorageObject.sbOriginCustomSelection);
            const targetVillagesCustomSelection = parseBool(localStorageObject.sbTargetCustomSelection);

            const customOriginVillages = localStorageObject.sbCustomOriginVillages;
            const customTargetVillages = localStorageObject.sbCustomTargetVillages;

            if (originVillagesCustomSelection && !customOriginVillages) {
                if(DEBUG) console.debug(`${scriptInfo}: Custom Origin Villages: ${customOriginVillages} and Origin Villages Custom Selection: ${originVillagesCustomSelection}`);
                UI.ErrorMessage(`${twSDK.tt('Please enter origin villages.')}`);
                return false;
            }

            if (targetVillagesCustomSelection && !customTargetVillages) {
                if(DEBUG) console.debug(`${scriptInfo}: Custom Target Villages: ${customTargetVillages} and Target Villages Custom Selection: ${targetVillagesCustomSelection}`);
                UI.ErrorMessage(`${twSDK.tt('Please enter target villages.')}`);
                return false;
            }

            // Verify ratio and radio buttons
            const sendResourcesAbsolute = parseBool(localStorageObject.sbSendResourcesAbsoluteRadio);
            const sendResourcesRatio = parseBool(localStorageObject.sbSendResourcesRatioRadio);
            const sendResourcesMintRatio = parseBool(localStorageObject.sbSendResourcesMintRatioRadio);
            const sendResourcesFill = parseBool(localStorageObject.sbSendResourcesFillRadio);
            
            const radioButtons = [sendResourcesAbsolute, sendResourcesRatio, sendResourcesMintRatio, sendResourcesFill];
            const selectedRadioButtons = radioButtons.filter(Boolean);
            
            if (selectedRadioButtons.length > 1) {
                // More than one radio button is set to true
                localStorageObject.sbSendResourcesAbsoluteRadio = true;
                localStorageObject.sbSendResourcesRatioRadio = false;
                localStorageObject.sbSendResourcesMintRatioRadio = false;
                localStorageObject.sbSendResourcesFillRadio = false;
                saveLocalStorage(localStorageObject);
                UI.ErrorMessage(`${twSDK.tt('Multiple send resource options selected. Please reload andreselect how to send resources.')}`);
                return false;
            }
            
            if (!sendResourcesAbsolute && !sendResourcesRatio && !sendResourcesMintRatio && !sendResourcesFill) {
                UI.ErrorMessage(`${twSDK.tt('Please select how to send resources.')}`);
                return false;
            }
            
            const sendWoodRatio = Number(localStorageObject.sbSendWoodRatio);
            const sendClayRatio = Number(localStorageObject.sbSendClayRatio);
            const sendIronRatio = Number(localStorageObject.sbSendIronRatio);
            
            if (sendResourcesRatio && (sendWoodRatio + sendClayRatio + sendIronRatio !== 100)) {
                UI.ErrorMessage(`${twSDK.tt('The sum of the ratios must be 100.')}`);
                return false;
            }

            // Check warehouse data if fill is selected
            if (sendResourcesFill) {
                if (Object.keys(warehouseData).length === 0) {
                    UI.ErrorMessage(`${twSDK.tt('Please paste warehouse data before selecting fill.')}`);
                    return false;
                }
            }

            return true;
        }

        // Helper: Render groups select
        function renderGroupsFilter(idPrefix) {
            let id = idPrefix + 'GroupsFilter';
            const groupId = getLocalStorage().id;
            let groupsFilter = `
        <select name="group-filter" id="${id}">
    `;

            for (const [_, group] of Object.entries(groups.result)) {
                const { group_id, name } = group;
                const isSelected = parseInt(group_id) === parseInt(groupId) ? 'selected' : '';
                if (name !== undefined) {
                    groupsFilter += `
                <option value="${group_id}" ${isSelected}>
                    ${name}
                </option>
            `;
                }
            }

            groupsFilter += `
        </select>
    `;

            return groupsFilter;
        }
        // Helper: Fetch village groups
        async function fetchVillageGroups() {
            let fetchGroups = '';
            if (game_data.player.sitter > 0) {
                fetchGroups = game_data.link_base_pure + `groups&mode=overview&ajax=load_group_menu&t=${game_data.player.id}`;
            } else {
                fetchGroups = game_data.link_base_pure + 'groups&mode=overview&ajax=load_group_menu';
            }
            const villageGroups = await jQuery.get(fetchGroups).then((response) => response).catch((error) => {
                UI.ErrorMessage('Error fetching village groups!');
                console.error(`${scriptInfo} Error:`, error);
            }
            );

            return villageGroups;
        }
        //Helper: Render Arrival time selection
        function renderArrivalTimeSelector() {
            let contentArrivalTimeSelector = `
                <fieldset class="sb-fieldset" id="arrivalTimeFieldset">
                    <legend>${twSDK.tt("Arrival time")}</legend>
                    <div class="sb-grid sb-grid-4 ra-mb10">
                        <div>
                            <input type="datetime-local" id="startDateTime" required>
                        </div>
                        <div>
                            <input type="datetime-local" id="endDateTime" required>
                        </div>
                        <div>
                            <button type="button" class="add-entry-btn" id="sbAddTimeEntry">+</button>
                        </div>
                        <div>
                            <button type="button" class="add-entry-btn sbDeleteAllEntries" id="sbDeleteAllEntries">${twSDK.tt("Delete all arrival times")}</button>
                        </div>
                    </div>
                </fieldset>
            `;
            return contentArrivalTimeSelector;
        }

        function parseBool(input) {
            if (typeof input === 'string') {
                return input.toLowerCase() === 'true';
            } else if (typeof input === 'boolean') {
                return input;
            } else {
                console.error(`${scriptInfo}: Invalid input: needs to be a string or boolean.`);
                return false;
            }
        }

        // Helper: Villages array to dictionary, to quickly search with coordinates
        function villageArrayToDict(villageArray) {
            let dict = {};
            for (let i = 0; i < villageArray.length; i++) {
                let key = villageArray[i][2] + '|' + villageArray[i][3]; //assuming x is at arr[i][2] and y is at arr[i][3]
                dict[key] = villageArray[i][0]; //assuming id is at arr[i][0]
            }
            return dict;
        }

        // Function to initialize date and time entries from local storage
        function initializeSavedEntries() {
            const localStorageObject = getLocalStorage();
            const sbArrivalTimes = localStorageObject.sbArrivalTimes;

            const entriesTable = document.createElement('table');
            entriesTable.classList.add('entries-table');
            entriesTable.id = 'sbArrivalEntryTable';

            // Add table headers
            const headerRow = document.createElement('tr');
            headerRow.innerHTML = `
        <th class="ra-tac">${twSDK.tt('From')}</th>
        <th class="ra-tac">${twSDK.tt('To')}</th>
        <th class="ra-tac">${twSDK.tt('Delete Entry')}</th>
    `;
            entriesTable.appendChild(headerRow);

            if (sbArrivalTimes && sbArrivalTimes.length > 0) {
                entriesTable.style.display = 'table'; // Make the table visible

                sbArrivalTimes.forEach((timeSpan, index) => {
                    const newEntryRow = document.createElement('tr');
                    newEntryRow.classList.add('entry-row');

                    const startTime = formatLocalizedTime(new Date(timeSpan[0]));
                    const endTime = formatLocalizedTime(new Date(timeSpan[1]));

                    newEntryRow.innerHTML = `
                <td class="entry-start">${startTime}</td>
                <td class="entry-end">${endTime}</td>
                <td class="ra-tac"><button class="delete-entry-btn" id="btn-${timeSpan[0]}-${timeSpan[1]}">X</button></td>
            `;

                    entriesTable.appendChild(newEntryRow);
                });
            } else {
                entriesTable.style.display = 'none'; // Hide the table if there are no entries
            }

            document.getElementById('arrivalTimeFieldset').appendChild(entriesTable);
        }

        // Helper function to check array equality
        function isEqual(arr1, arr2) {
            return arr1[0] === arr2[0] && arr1[1] === arr2[1];
        }

        function formatLocalizedTime(date) {
            return date.toLocaleDateString(undefined, {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                hour12: false,
            });
        }

        function initializeInputFields() {
            const settingsObject = getLocalStorage();
            if (DEBUG) console.debug(`${scriptInfo}: Settings object from local storage: `, settingsObject);
        
            for (let id in settingsObject) {
                if (settingsObject.hasOwnProperty(id)) {
                    const element = document.getElementById(id);
        
                    if (element) {
                        if (element.type === 'checkbox' || element.type === 'radio') {
                            element.checked = settingsObject[id];
                        } else {
                            element.value = settingsObject[id];
                        }
        
                        // Handle showing/hiding divs based on radio button selections
                        switch (id) {
                            case 'sbOriginGroupSelection':
                                if (settingsObject[id]) {
                                    $('#sbOriginGroupMenuContainer').show();
                                    $('#sbOriginCustomTextAreaContainer').hide();
                                }
                                break;
                            case 'sbOriginCustomSelection':
                                if (settingsObject[id]) {
                                    $('#sbOriginGroupMenuContainer').hide();
                                    $('#sbOriginCustomTextAreaContainer').show();
                                }
                                break;
                            case 'sbTargetGroupSelection':
                                if (settingsObject[id]) {
                                    $('#sbTargetGroupMenuContainer').show();
                                    $('#sbTargetCustomTextAreaContainer').hide();
                                }
                                break;
                            case 'sbTargetCustomSelection':
                                if (settingsObject[id]) {
                                    $('#sbTargetGroupMenuContainer').hide();
                                    $('#sbTargetCustomTextAreaContainer').show();
                                }
                                break;
                            case 'sbSendResourcesAbsoluteRadio':
                                if (settingsObject[id]) {
                                    $('#sbSendResourcesAbsolute').show();
                                    $('#sbSendResourcesRatio').hide();
                                }
                                break;
                            case 'sbSendResourcesRatioRadio':
                                if (settingsObject[id]) {
                                    $('#sbSendResourcesAbsolute').hide();
                                    $('#sbSendResourcesRatio').show();
                                }
                                break;
                            case 'sbSendResourcesMintRatioRadio':
                                if (settingsObject[id]) {
                                    $('#sbSendResourcesAbsolute').hide();
                                    $('#sbSendResourcesRatio').hide();
                                }
                                break;
                            case 'sbHoldBackResourcesAbsoluteRadio':
                                if (settingsObject[id]) {
                                    $('#sbHoldBackResourcesAbsolute').show();
                                    $('#sbHoldBackResourcesPercentage').hide();
                                }
                                break;
                            case 'sbHoldBackResourcesPercentageRadio':
                                if (settingsObject[id]) {
                                    $('#sbHoldBackResourcesAbsolute').hide();
                                    $('#sbHoldBackResourcesPercentage').show();
                                }
                                break;
                        }
                    }
                }
            }
        }
        // Get villages from group id
        async function getVillagesByGroupId(groupId) {
            const url = game_data.link_base_pure + `overview_villages&mode=combined&group=${groupId}&page=-1`;
        
            try {
                const response = await fetch(url);
                const pageContent = await response.text();
        
                const villageCoordinates = [];
                const isMobile = $("#mobileHeader").length > 0;
        
                const villageElements = isMobile 
                    ? $(pageContent).find("#combined_table tr.nowrap .quickedit-vn")
                    : $(pageContent).find("#combined_table tr.nowrap .quickedit-vn");
        
                villageElements.each(function() {
                    const villageId = parseInt($(this).attr('data-id'));
                    const coord = villageIdToCoordMap.get(villageId);
                    if (coord) {
                        villageCoordinates.push(coord);
                    }
                });
        
                return villageCoordinates;
            } catch (error) {
                UI.ErrorMessage(twSDK.tt('There was an error while fetching the data!'));
                console.error("Error fetching village data:", error);
                return [];
            }
        }

        async function getPlayerData() {
            const baseUrl = game_data.player.sitter > 0 
                ? `game.php?t=${game_data.player.id}&screen=overview_villages&mode=prod&group=0&page=`
                : "game.php?&screen=overview_villages&mode=prod&group=0&page=";
            const totalVillages = game_data.player.villages;
            const villagesData = [];
            const villageIdToCoordMap = new Map(); // Assuming this map is populated elsewhere in the code
        
            // Function to fetch and process data for a single page
            async function fetchPageData(page) {
                const url = `${baseUrl}${page}`;
                const response = await fetch(url);
                const pageContent = await response.text();
        
                const woodTotals = [];
                const clayTotals = [];
                const ironTotals = [];
                const warehouseCapacities = [];
                const availableMerchants = [];
                const totalMerchants = [];
        
                const isMobile = $("#mobileHeader")[0];
        
                const woodElements = isMobile 
                    ? $(pageContent).find(".res.mwood,.warn_90.mwood,.warn.mwood")
                    : $(pageContent).find(".res.wood,.warn_90.wood,.warn.wood");
                const clayElements = isMobile 
                    ? $(pageContent).find(".res.mstone,.warn_90.mstone,.warn.mstone")
                    : $(pageContent).find(".res.stone,.warn_90.stone,.warn.stone");
                const ironElements = isMobile 
                    ? $(pageContent).find(".res.miron,.warn_90.miron,.warn.miron")
                    : $(pageContent).find(".res.iron,.warn_90.iron,.warn.iron");
                const villageElements = $(pageContent).find(".quickedit-vn");
                const warehouseElements = isMobile 
                    ? $(pageContent).find(".mheader.ressources")
                    : $(pageContent).find(".res.iron,.warn_90.iron,.warn.iron").parent().next();
                const merchantElements = isMobile 
                    ? $(pageContent).find('a[href*="market"]')
                    : $(pageContent).find(".res.iron,.warn_90.iron,.warn.iron").parent().next().next();
        
                // Getting wood amounts
                woodElements.each(function() {
                    let woodAmount = $(this).text().replace(/\./g, '').replace(',', '');
                    woodTotals.push(woodAmount);
                });
        
                // Getting clay amounts
                clayElements.each(function() {
                    let clayAmount = $(this).text().replace(/\./g, '').replace(',', '');
                    clayTotals.push(clayAmount);
                });
        
                // Getting iron amounts
                ironElements.each(function() {
                    let ironAmount = $(this).text().replace(/\./g, '').replace(',', '');
                    ironTotals.push(ironAmount);
                });
        
                // Getting warehouse capacities
                warehouseElements.each(function() {
                    warehouseCapacities.push($(this).text());
                });
        
                // Getting available merchants and total merchants
                merchantElements.each(function() {
                    const merchants = $(this).text().match(/(\d*)\/(\d*)/);
                    availableMerchants.push(merchants ? merchants[1] : "0");
                    totalMerchants.push(merchants ? merchants[2] : "999");
                });
        
                // Combining into one array of objects
                villageElements.each(function(index) {
                    const villageId = parseInt($(this).attr('data-id'));
                    const coord = villageIdToCoordMap.get(villageId);
                    if (coord) {
                        villagesData.push({
                            "id": villageId,
                            "url": $(this).find('a').attr('href'),
                            "coord": coord,
                            "name": $(this).text().trim(),
                            "wood": woodTotals[index],
                            "clay": clayTotals[index],
                            "iron": ironTotals[index],
                            "availableMerchants": availableMerchants[index],
                            "totalMerchants": totalMerchants[index],
                            "warehouseCapacity": warehouseCapacities[index],
                        });
                    }
                });
        
                // Get the page size from the input field
                const pageSize = parseInt($(pageContent).find("input[name='page_size']").val(), 10);
        
                return { processedVillages: villageElements.length, pageSize }; // Return the number of villages processed and the page size
            }
        
            try {
                if (totalVillages <= 1000) {
                    UI.SuccessMessage(twSDK.tt('Fetching player data...'));
                    // If the player has less than or equal to 1000 villages, use page=-1 for efficiency
                    await fetchPageData(-1);
                } else {
                    UI.SuccessMessage(twSDK.tt('Fetching player data for more than 1000 villages. This may take a while...'));
                    let page = 0;
                    let totalProcessedVillages = 0;
            
                    // Loop through pages until all villages are processed
                    while (totalProcessedVillages < totalVillages) {
                        const { processedVillages, pageSize } = await fetchPageData(page);
                        totalProcessedVillages += processedVillages;
            
                        // If the number of processed villages is less than the page size, we have reached the last page
                        if (processedVillages < pageSize) {
                            break;
                        }
            
                        page++;
                        await new Promise(resolve => setTimeout(resolve, 200)); // Wait for 200 ms before the next request
                    }
                }
            
                // Check if we have data for the same number of villages as the player has in the game_data object
                if (villagesData.length !== totalVillages) {
                    console.error("Mismatch in the number of villages processed:", villagesData.length, "expected:", totalVillages);
                }
            
                return villagesData;
            } catch (error) {
                console.error("Error fetching player data:", error);
                return [];
            }
        }

        // Helper: Creates village map that maps villageid to village coords
        function createVillageMap(villageArray) {
            let villageMap = new Map();
            for (let i = 0; i < villageArray.length; i++) {
                let villageId = villageArray[i][0];
                let villageCoord = villageArray[i][2] + '|' + villageArray[i][3];
                villageMap.set(parseInt(villageId), villageCoord);
            }
            return villageMap;
        }


        function handleInputChange() {
            const settingsObject = getLocalStorage();
            const inputId = $(this).attr('id');
            let inputValue;
            let matchesCoordinates; // Declare matchesCoordinates once outside the switch statement
        
            switch (inputId) {
                case 'sbOriginGroupSelection':
                    inputValue = $(this).is(':checked');
                    if (inputValue) {
                        $('#sbOriginGroupMenuContainer').show();
                        $('#sbOriginCustomTextAreaContainer').hide();
                    }
                    settingsObject.sbOriginCustomSelection = false;
                    break;
                case 'sbOriginCustomSelection':
                    inputValue = $(this).is(':checked');
                    if (inputValue) {
                        $('#sbOriginGroupMenuContainer').hide();
                        $('#sbOriginCustomTextAreaContainer').show();
                    }
                    settingsObject.sbOriginGroupSelection = false;
                    break;
                case 'sbOriginGroupsFilter':
                    inputValue = $(this).val();
                    break;
                case 'sbTargetGroupSelection':
                    inputValue = $(this).is(':checked');
                    if (inputValue) {
                        $('#sbTargetGroupMenuContainer').show();
                        $('#sbTargetCustomTextAreaContainer').hide();
                    }
                    settingsObject.sbTargetCustomSelection = false;
                    break;
                case 'sbTargetCustomSelection':
                    inputValue = $(this).is(':checked');
                    if (inputValue) {
                        $('#sbTargetGroupMenuContainer').hide();
                        $('#sbTargetCustomTextAreaContainer').show();
                    }
                    settingsObject.sbTargetGroupSelection = false;
                    break;
                case 'sbTargetGroupsFilter':
                    inputValue = $(this).val();
                    break;
                case 'sbSendResourcesAbsoluteRadio':
                    inputValue = $(this).is(':checked');
                    if (inputValue) {
                        $('#sbSendResourcesAbsolute').show();
                        $('#sbSendResourcesRatio').hide();
                        $('#sbSendResourcesFill').hide();
                    }
                    settingsObject.sbSendResourcesRatioRadio = false;
                    settingsObject.sbSendResourcesMintRatioRadio = false;
                    settingsObject.sbSendResourcesFillRadio = false;
                    break;
                case 'sbSendResourcesRatioRadio':
                    inputValue = $(this).is(':checked');
                    if (inputValue) {
                        $('#sbSendResourcesAbsolute').hide();
                        $('#sbSendResourcesRatio').show();
                        $('#sbSendResourcesFill').hide();
                    }
                    settingsObject.sbSendResourcesAbsoluteRadio = false;
                    settingsObject.sbSendResourcesMintRatioRadio = false;
                    settingsObject.sbSendResourcesFillRadio = false;
                    break;
                case 'sbSendResourcesMintRatioRadio':
                    inputValue = $(this).is(':checked');
                    if (inputValue) {
                        $('#sbSendResourcesAbsolute').hide();
                        $('#sbSendResourcesRatio').hide();
                        $('#sbSendResourcesFill').hide();
                    }
                    settingsObject.sbSendResourcesAbsoluteRadio = false;
                    settingsObject.sbSendResourcesRatioRadio = false;
                    settingsObject.sbSendResourcesFillRadio = false;
                    break;
                case 'sbHoldBackResourcesAbsoluteRadio':
                    inputValue = $(this).is(':checked');
                    if (inputValue) {
                        $('#sbHoldBackResourcesAbsolute').show();
                        $('#sbHoldBackResourcesPercentage').hide();
                    }
                    settingsObject.sbHoldBackResourcesPercentageRadio = false;
                    break;
                case 'sbHoldBackResourcesPercentageRadio':
                    inputValue = $(this).is(':checked');
                    if (inputValue) {
                        $('#sbHoldBackResourcesAbsolute').hide();
                        $('#sbHoldBackResourcesPercentage').show();
                    }
                    settingsObject.sbHoldBackResourcesAbsoluteRadio = false;
                    break;
                case 'sbMerchantBonus':
                    inputValue = $(this).is(':checked');
                    break;
                case 'sbCustomOriginVillages':
                    inputValue = $(this).val();
                    matchesCoordinates = inputValue.match(twSDK.coordsRegex) || [];
                    inputValue = matchesCoordinates ? [...new Set(matchesCoordinates)].join(' ') : '';
                    $(this).val(inputValue);
                    break;
                case 'sbCustomTargetVillages':
                    inputValue = $(this).val();
                    matchesCoordinates = inputValue.match(twSDK.coordsRegex) || [];
                    inputValue = matchesCoordinates ? [...new Set(matchesCoordinates)].join(' ') : '';
                    $(this).val(inputValue);
                    break;
                case 'sbHoldBackMerchants':
                    inputValue = isNaN(parseInt($(this).val())) ? defaultSettings.sbHoldBackMerchants : parseInt($(this).val());
                    if (inputValue < 0) {
                        $(this).val(defaultSettings.sbHoldBackMerchants);
                        inputValue = defaultSettings.sbHoldBackMerchants;
                    } else {
                        $(this).val(inputValue);
                    }
                    break;
                case 'sbSendWood':
                    inputValue = isNaN(parseInt($(this).val())) ? defaultSettings.sbSendWood : parseInt($(this).val());
                    if (inputValue < 0) {
                        $(this).val(defaultSettings.sbSendWood);
                        inputValue = defaultSettings.sbSendWood;
                    } else {
                        $(this).val(inputValue);
                    }
                    break;
                case 'sbSendClay':
                    inputValue = isNaN(parseInt($(this).val())) ? defaultSettings.sbSendClay : parseInt($(this).val());
                    if (inputValue < 0) {
                        $(this).val(defaultSettings.sbSendClay);
                        inputValue = defaultSettings.sbSendClay;
                    } else {
                        $(this).val(inputValue);
                    }
                    break;
                case 'sbSendIron':
                    inputValue = isNaN(parseInt($(this).val())) ? defaultSettings.sbSendIron : parseInt($(this).val());
                    if (inputValue < 0) {
                        $(this).val(defaultSettings.sbSendIron);
                        inputValue = defaultSettings.sbSendIron;
                    } else {
                        $(this).val(inputValue);
                    }
                    break;
                case 'sbSendWoodRatio':
                    inputValue = isNaN(parseInt($(this).val())) ? defaultSettings.sbSendWoodRatio : parseInt($(this).val());
                    if (inputValue < 0) {
                        $(this).val(defaultSettings.sbSendWoodRatio);
                        inputValue = defaultSettings.sbSendWoodRatio;
                    } else {
                        $(this).val(inputValue);
                    }
                    break;
                case 'sbSendClayRatio':
                    inputValue = isNaN(parseInt($(this).val())) ? defaultSettings.sbSendClayRatio : parseInt($(this).val());
                    if (inputValue < 0) {
                        $(this).val(defaultSettings.sbSendClayRatio);
                        inputValue = defaultSettings.sbSendClayRatio;
                    } else {
                        $(this).val(inputValue);
                    }
                    break;
                case 'sbSendIronRatio':
                    inputValue = isNaN(parseInt($(this).val())) ? defaultSettings.sbSendIronRatio : parseInt($(this).val());
                    if (inputValue < 0) {
                        $(this).val(defaultSettings.sbSendIronRatio);
                        inputValue = defaultSettings.sbSendIronRatio;
                    } else {
                        $(this).val(inputValue);
                    }
                    break;
                case 'sbHoldBackWood':
                    inputValue = isNaN(parseInt($(this).val())) ? defaultSettings.sbHoldBackWood : parseInt($(this).val());
                    if (inputValue < 0) {
                        $(this).val(defaultSettings.sbHoldBackWood);
                        inputValue = defaultSettings.sbHoldBackWood;
                    } else {
                        $(this).val(inputValue);
                    }
                    break;
                case 'sbHoldBackClay':
                    inputValue = isNaN(parseInt($(this).val())) ? defaultSettings.sbHoldBackClay : parseInt($(this).val());
                    if (inputValue < 0) {
                        $(this).val(defaultSettings.sbHoldBackClay);
                        inputValue = defaultSettings.sbHoldBackClay;
                    } else {
                        $(this).val(inputValue);
                    }
                    break;
                case 'sbHoldBackIron':
                    inputValue = isNaN(parseInt($(this).val())) ? defaultSettings.sbHoldBackIron : parseInt($(this).val());
                    if (inputValue < 0) {
                        $(this).val(defaultSettings.sbHoldBackIron);
                        inputValue = defaultSettings.sbHoldBackIron;
                    } else {
                        $(this).val(inputValue);
                    }
                    break;
                case 'sbHoldBackPercentage':
                    inputValue = isNaN(parseInt($(this).val())) ? defaultSettings.sbHoldBackPercentage : parseInt($(this).val());
                    if (inputValue < 0) {
                        $(this).val(defaultSettings.sbHoldBackPercentage);
                        inputValue = defaultSettings.sbHoldBackPercentage;
                    } else {
                        $(this).val(inputValue);
                    }
                    break;
                case 'sbMaxWood':
                    inputValue = isNaN(parseInt($(this).val())) ? defaultSettings.sbMaxWood : parseInt($(this).val());
                    if (inputValue < 0) {
                        $(this).val(defaultSettings.sbMaxWood);
                        inputValue = defaultSettings.sbMaxWood;
                    } else {
                        $(this).val(inputValue);
                    }
                    break;
                case 'sbMaxClay':
                    inputValue = isNaN(parseInt($(this).val())) ? defaultSettings.sbMaxClay : parseInt($(this).val());
                    if (inputValue < 0) {
                        $(this).val(defaultSettings.sbMaxClay);
                        inputValue = defaultSettings.sbMaxClay;
                    } else {
                        $(this).val(inputValue);
                    }
                    break;
                case 'sbMaxIron':
                    inputValue = isNaN(parseInt($(this).val())) ? defaultSettings.sbMaxIron : parseInt($(this).val());
                    if (inputValue < 0) {
                        $(this).val(defaultSettings.sbMaxIron);
                        inputValue = defaultSettings.sbMaxIron;
                    } else {
                        $(this).val(inputValue);
                    }
                    break;
                default:
                    console.error(`${scriptInfo}: Unknown id: ${inputId}`);
                    return; // Exit the function if the ID is unknown
            }
        
            if (DEBUG) console.debug(`${scriptInfo}: ${inputId} changed to ${inputValue}`);
            
            settingsObject[inputId] = inputValue;
            saveLocalStorage(settingsObject);
        }

        function resetInputFields() {
            const localStorageSettings = getLocalStorage();
        
            for (let key in defaultSettings) {
                if (defaultSettings.hasOwnProperty(key)) {
                    localStorageSettings[key] = defaultSettings[key];
                    const element = document.getElementById(key);
        
                    if (element) {
                        if (element.type === 'checkbox' || element.type === 'radio') {
                            element.checked = defaultSettings[key];
                        } else {
                            element.value = defaultSettings[key];
                        }
                    }
                }
            }
        
            saveLocalStorage(localStorageSettings);
            initializeInputFields();
        }

        // Service: Function to get settings from localStorage
        function getLocalStorage() {
            const localStorageSettings = JSON.parse(localStorage.getItem('sbResourceSender'));
            // Check if all expected settings are in localStorageSettings
            const expectedSettings = [
                'sbOriginGroupSelection',
                'sbOriginCustomSelection',
                'sbOriginGroupsFilter',
                'sbCustomOriginVillages',
                'sbTargetGroupSelection',
                'sbTargetCustomSelection',
                'sbTargetGroupsFilter',
                'sbCustomTargetVillages',
                'sbHoldBackMerchants',
                'sbMerchantBonus',
                'sbSendResourcesAbsoluteRadio',
                'sbSendResourcesRatioRadio',
                'sbSendResourcesMintRatioRadio',
                'sbSendWood',
                'sbSendClay',
                'sbSendIron',
                'sbSendWoodRatio',
                'sbSendClayRatio',
                'sbSendIronRatio',
                'sbHoldBackResourcesAbsoluteRadio',
                'sbHoldBackResourcesPercentageRadio',
                'sbHoldBackWood',
                'sbHoldBackClay',
                'sbHoldBackIron',
                'sbHoldBackPercentage',
                'sbMaxWood',
                'sbMaxClay',
                'sbMaxIron',
                'sbArrivalTimes'
            ];
        
            let missingSettings = [];
            if (localStorageSettings) {
                missingSettings = expectedSettings.filter(setting => !(setting in localStorageSettings));
                if (DEBUG) console.debug(`${scriptInfo}: Missing settings in localStorage: `, missingSettings);
            }
        
            if (localStorageSettings && missingSettings.length === 0) {
                // If settings exist in localStorage and no settings are missing, return the object
                return localStorageSettings;
            } else {
                // If settings do not exist in localStorage or some settings are missing, save the default settings and return the object
                saveLocalStorage(defaultSettings);
                return defaultSettings;
            }
        }

        //Service: Function to save settings to localStorage
        function saveLocalStorage(settingsObject) {
            // Stringify and save the settings object
            localStorage.setItem('sbResourceSender', JSON.stringify(settingsObject));
        }

        // Service: Fetch world config and needed data
        async function fetchWorldConfigData() {
            try {
                const villages = await twSDK.worldDataAPI('village');
                const worldConfig = await twSDK.getWorldConfig();
                return { villages, worldConfig };
            } catch (error) {
                UI.ErrorMessage(
                    twSDK.tt('There was an error while fetching the data!')
                );
                console.error(`${scriptInfo} Error:`, error);
            }
        }

})();