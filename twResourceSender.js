/*
* Script Name: Resource Sender
* Version: v1.0.0
* Last Updated: 2024-11-25
* Author: SaveBank
* Author Contact: Discord: savebank
* Contributor:  
* Approved: 
* Approved Date: 
* Mod: 
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
var warehouseData =  {};
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
            'Paste warehouse data here...' : 'Paste warehouse data here...',
            'Gap to warehouse max': 'Gap to warehouse max',
            'Fill': 'Fill',
            'Gap to max (%)': 'Gap to max (%)',
            'Calculate & Send': 'Calculate & Send',
            'Calculate': 'Calculate',
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
            'Paste warehouse data here...' : 'Speicherdaten hier einfügen...',
            'Gap to warehouse max': 'Abstand zum Speichermaximum',
            'Fill': 'Auffüllen',
            'Gap to max (%)': 'Abstand zum Maximum (%)',
            'Calculate & Send': 'Berechnen & Senden',
            'Calculate': 'Berechnen',
        }
    },
    allowedMarkets: [],
    allowedScreens: [],
    allowedModes: [],
    isDebug: DEBUG,
    enableCountApi: false
};


$.getScript(`https://cdn.jsdelivr.net/gh/SaveBankDev/Tribal-Wars-Scripts-SDK@main/twSDK.js`,
    async function () {
        const startTime = performance.now();
        if (DEBUG) {
            console.debug(`Init`);
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
        const { tribes, players, villages } = await fetchWorldConfigData();
        const allCoords = villages.map(village => [village[2], village[3]]);
        const allVillages = new Map(villages.map(village => [`${village[2]}|${village[3]}`, [village[0], village[4], village[5]]]));
        const allPlayers = new Map(players.map(player => [player[0], player.slice(1)]));
        const endTime = performance.now();
        if (DEBUG) console.debug(`${scriptInfo}: Startup time: ${(endTime - startTime).toFixed(2)} milliseconds`);
        if (DEBUG) console.debug(`${scriptInfo}: `, tribes);
        if (DEBUG) console.debug(`${scriptInfo}: `, players);
        if (DEBUG) console.debug(`${scriptInfo}: `, villages);
        // Entry point
        (async function () {
            try {
                const startTime = performance.now();
                renderUI();
                addEventHandlers();
                initializeInputFields();
                count();
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

            $('#sbResCalculate').on('click', calculate);

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


        function calculate() {
            if(DEBUG) console.debug(`${scriptInfo}: Calculating...`);
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
        function count() {
            const apiUrl = 'https://api.counterapi.dev/v1';
            const apiKey = 'sbResourceSender'; // api key
            const namespace = 'savebankscriptstw'; // namespace
            try {
                $.getJSON(`${apiUrl}/${namespace}/${apiKey}/up`, response => {
                    if (DEBUG) console.debug(`Total script runs: ${response.count}`);
                }).fail(() => { if (DEBUG) console.debug("Failed to fetch total script runs"); });
            } catch (error) { if (DEBUG) console.debug("Error fetching total script runs: ", error); }
        }
        
        function handleInputChange() {
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
                    break;
                case 'sbOriginCustomSelection':
                    inputValue = $(this).is(':checked');
                    if (inputValue) {
                        $('#sbOriginGroupMenuContainer').hide();
                        $('#sbOriginCustomTextAreaContainer').show();
                    }
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
                    break;
                case 'sbTargetCustomSelection':
                    inputValue = $(this).is(':checked');
                    if (inputValue) {
                        $('#sbTargetGroupMenuContainer').hide();
                        $('#sbTargetCustomTextAreaContainer').show();
                    }
                    break;
                case 'sbTargetGroupsFilter':
                    inputValue = $(this).val();
                    break;
                case 'sbSendResourcesAbsoluteRadio':
                    inputValue = $(this).is(':checked');
                    if (inputValue) {
                        $('#sbSendResourcesAbsolute').show();
                        $('#sbSendResourcesRatio').hide();
                    }
                    break;
                case 'sbSendResourcesRatioRadio':
                    inputValue = $(this).is(':checked');
                    if (inputValue) {
                        $('#sbSendResourcesAbsolute').hide();
                        $('#sbSendResourcesRatio').show();
                    }
                    break;
                case 'sbSendResourcesMintRatioRadio':
                    inputValue = $(this).is(':checked');
                    if (inputValue) {
                        $('#sbSendResourcesAbsolute').hide();
                        $('#sbSendResourcesRatio').hide();
                    }
                    break;
                case 'sbHoldBackResourcesAbsoluteRadio':
                    inputValue = $(this).is(':checked');
                    if (inputValue) {
                        $('#sbHoldBackResourcesAbsolute').show();
                        $('#sbHoldBackResourcesPercentage').hide();
                    }
                    break;
                case 'sbHoldBackResourcesPercentageRadio':
                    inputValue = $(this).is(':checked');
                    if (inputValue) {
                        $('#sbHoldBackResourcesAbsolute').hide();
                        $('#sbHoldBackResourcesPercentage').show();
                    }
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
            const settingsObject = getLocalStorage();
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
                const players = await twSDK.worldDataAPI('player');
                const tribes = await twSDK.worldDataAPI('ally');
                return { tribes, players, villages };
            } catch (error) {
                UI.ErrorMessage(
                    twSDK.tt('There was an error while fetching the data!')
                );
                console.error(`${scriptInfo} Error:`, error);
            }
        }

    }
);