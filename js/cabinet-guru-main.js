var CabinetGuru = CabinetGuru || {};

CabinetGuru.Main = (function() {
    var cabinets = [];
    var runs = [];

    function addCabinet() {
        const jobName = document.getElementById('jobName').value.trim();
        const roomName = document.getElementById('roomName').value.trim();
        const ceilingHeight = CabinetGuru.Utils.fractionToDecimal(document.getElementById('ceilingHeight').value);
        const cabinetNumber = parseInt(document.getElementById('cabinetNumber').value);
        const cabinetType = document.getElementById('cabinetType').value;
        const cabWidth = CabinetGuru.Utils.fractionToDecimal(document.getElementById('cabWidth').value);
        const cabDepth = CabinetGuru.Utils.fractionToDecimal(document.getElementById('cabDepth').value);
        const numSpanners = parseInt(document.getElementById('numSpanners').value);
        let cabHeight = CabinetGuru.Utils.fractionToDecimal(document.getElementById('cabHeight').value);
        const numSides = parseInt(document.getElementById('numSides').value);
        const toeKickHeight = parseFloat(document.getElementById('toeKickHeight').value);
        const leftBeautyPanel = document.getElementById('leftBeautyPanel').checked;
        const rightBeautyPanel = document.getElementById('rightBeautyPanel').checked;
        const leftFiller = document.getElementById('leftFiller').checked;
        const rightFiller = document.getElementById('rightFiller').checked;
        const hasBottomSkin = document.getElementById('bottomSkin').checked;
        const hasLightRail = document.getElementById('hasLightRail').checked;
        const hasCrown = document.getElementById('hasCrown').checked;
        const hasCrownCleat = document.getElementById('hasCrownCleat').checked;

        if (isNaN(cabinetNumber) || isNaN(cabWidth) || isNaN(cabDepth) || isNaN(numSpanners) || isNaN(cabHeight) || isNaN(numSides)) {
            alert("Please enter valid numbers in all fields.");
            return;
        }

        const linearFootage = CabinetGuru.Utils.calculateLinearFootage(cabWidth, numSpanners, cabHeight, numSides, cabinetType, toeKickHeight);

        const cabinet = {
            jobName,
            roomName,
            ceilingHeight,
            cabinetNumber,
            cabinetType,
            cabWidth,
            cabDepth,
            numSpanners,
            cabHeight,
            numSides,
            toeKickHeight,
            leftBeautyPanel,
            rightBeautyPanel,
            leftFiller,
            rightFiller,
            hasBottomSkin,
            hasLightRail,
            hasCrown,
            hasCrownCleat,
            linearFootage
        };
        cabinets.push(cabinet);

        CabinetGuru.UI.updateCabinetList(cabinets);
        CabinetGuru.UI.updateRunsUI(runs);
        CabinetGuru.UI.updateReport(cabinets, runs);
        autoSave();

        // Clear the input fields and set focus back to cabinet number field
        document.getElementById('cabinetNumber').value = '';
        document.getElementById('cabinetType').value = 'Base';
        document.getElementById('cabWidth').value = '';
        document.getElementById('cabDepth').value = '';
        document.getElementById('numSpanners').value = '';
        document.getElementById('cabHeight').value = '';
        document.getElementById('numSides').value = '';
        document.getElementById('leftBeautyPanel').checked = false;
        document.getElementById('rightBeautyPanel').checked = false;
        document.getElementById('leftFiller').checked = false;
        document.getElementById('rightFiller').checked = false;
        document.getElementById('bottomSkin').checked = false;
        document.getElementById('hasLightRail').checked = false;
        document.getElementById('hasCrown').checked = false;
        document.getElementById('hasCrownCleat').checked = false;
        document.getElementById('cabinetNumber').focus();

        CabinetGuru.UI.toggleCabinetOptions();
    }

    function removeCabinet(index) {
        cabinets.splice(index, 1);
        CabinetGuru.UI.updateCabinetList(cabinets);
        CabinetGuru.UI.updateRunsUI(runs);
        CabinetGuru.UI.updateReport(cabinets, runs);
        autoSave();
    }

    function createRun(type) {
        const runName = prompt(`Enter a name for the ${type} run:`);
        if (runName) {
            runs.push({
                name: runName,
                type: type,
                cabinets: []
            });
            CabinetGuru.UI.updateRunsUI(runs);
            CabinetGuru.UI.updateReport(cabinets, runs);
            autoSave();
        }
    }

    function addCabinetToRun(runIndex, cabinetIndex) {
        const cabinet = cabinets[cabinetIndex];
        if ((cabinet.cabinetType === 'Upper' && runs[runIndex].type === 'Upper') ||
            (cabinet.cabinetType !== 'Upper' && runs[runIndex].type === 'Base')) {
            runs[runIndex].cabinets.push(cabinet);
            cabinets.splice(cabinetIndex, 1);
            CabinetGuru.UI.updateCabinetList(cabinets);
            CabinetGuru.UI.updateRunsUI(runs);
            CabinetGuru.UI.updateReport(cabinets, runs);
            autoSave();
        } else {
            alert("Cabinet type doesn't match run type.");
        }
    }

    function removeCabinetFromRun(runIndex, cabinetIndex) {
        const cabinet = runs[runIndex].cabinets[cabinetIndex];
        runs[runIndex].cabinets.splice(cabinetIndex, 1);
        cabinets.push(cabinet);
        CabinetGuru.UI.updateCabinetList(cabinets);
        CabinetGuru.UI.updateRunsUI(runs);
        CabinetGuru.UI.updateReport(cabinets, runs);
        autoSave();
    }

    function autoSave() {
        const projectData = {
            cabinets: cabinets,
            runs: runs,
            jobName: document.getElementById('jobName').value,
            roomName: document.getElementById('roomName').value,
            ceilingHeight: document.getElementById('ceilingHeight').value
        };
        localStorage.setItem('cabinetGuruAutoSave', JSON.stringify(projectData));
    }

    function loadAutoSave() {
        const savedData = localStorage.getItem('cabinetGuruAutoSave');
        if (savedData) {
            const projectData = JSON.parse(savedData);
            cabinets = projectData.cabinets;
            runs = projectData.runs;
            document.getElementById('jobName').value = projectData.jobName || '';
            document.getElementById('roomName').value = projectData.roomName || '';
            document.getElementById('ceilingHeight').value = projectData.ceilingHeight || '';

            CabinetGuru.UI.updateCabinetList(cabinets);
            CabinetGuru.UI.updateRunsUI(runs);
            CabinetGuru.UI.updateReport(cabinets, runs);
        }
    }

    function init() {
        document.addEventListener('DOMContentLoaded', function() {
            if (CabinetGuru.UI && typeof CabinetGuru.UI.toggleCabinetOptions === 'function') {
                CabinetGuru.UI.toggleCabinetOptions();
                document.getElementById('cabinetType').addEventListener('change', CabinetGuru.UI.toggleCabinetOptions);
            } else {
                console.error('CabinetGuru.UI.toggleCabinetOptions is not defined');
            }
            
            if (CabinetGuru.UI && typeof CabinetGuru.UI.initializeDragAndDrop === 'function') {
                CabinetGuru.UI.initializeDragAndDrop();
            } else {
                console.error('CabinetGuru.UI.initializeDragAndDrop is not defined');
            }
            
            loadAutoSave();
        });
    }

    return {
        init: init,
        addCabinet: addCabinet,
        removeCabinet: removeCabinet,
        createRun: createRun,
        addCabinetToRun: addCabinetToRun,
        removeCabinetFromRun: removeCabinetFromRun,
        loadAutoSave: loadAutoSave
    };
})();

// Initialize the application
CabinetGuru.Main.init();