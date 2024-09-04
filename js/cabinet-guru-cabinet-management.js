var CabinetGuru = CabinetGuru || {};

CabinetGuru.CabinetManagement = (function() {
    var cabinets = [];

    function addCabinet() {
        console.log('Adding cabinet...');
        if (!CabinetGuru.Core.checkUIFunctions()) {
            alert('There was an error with the UI functions. Please check the console for more information.');
            return;
        }

        const cabinet = getCabinetFromForm();
        cabinets.push(cabinet);

        updateUI();
        CabinetGuru.Storage.autoSave();
        clearForm();
    }

    function removeCabinet(index) {
        console.log('Removing cabinet at index:', index);
        cabinets.splice(index, 1);
        CabinetGuru.UI.updateCabinetList(cabinets);
        CabinetGuru.UI.updateRunsUI(CabinetGuru.RunManagement.getRuns());
        CabinetGuru.UI.updateReport(cabinets, CabinetGuru.RunManagement.getRuns());
        CabinetGuru.Storage.autoSave();
    }

    function updateCabinet(index) {
        console.log('Updating cabinet at index:', index);
        if (!CabinetGuru.Core.checkUIFunctions()) {
            alert('There was an error with the UI functions. Please check the console for more information.');
            return;
        }

        const updatedCabinet = getCabinetFromForm();
        cabinets[index] = updatedCabinet;

        updateUI();
        CabinetGuru.Storage.autoSave();
        clearForm();
        CabinetGuru.UI.toggleAddUpdateButton(false);
    }

    function getCabinet(index) {
        return cabinets[index];
    }

    function removeCabinet(index) {
        console.log('Removing cabinet at index:', index);
        cabinets.splice(index, 1);
        updateUI();
        CabinetGuru.Storage.autoSave();
    }

    function getCabinetFromForm() {
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

        const linearFootage = CabinetGuru.Utils.calculateLinearFootage(cabWidth, numSpanners, cabHeight, numSides, cabinetType, toeKickHeight);

        return {
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
    }

    function clearForm() {
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

    function updateUI() {
        CabinetGuru.UI.updateCabinetList(cabinets);
        CabinetGuru.UI.updateRunsUI(CabinetGuru.RunManagement.getRuns());
        CabinetGuru.UI.updateReport(cabinets, CabinetGuru.RunManagement.getRuns());
    }

    function getCabinets() {
        return cabinets;
    }

    function setCabinets(newCabinets) {
        cabinets = newCabinets;
    }

    return {
        addCabinet: addCabinet,
        updateCabinet: updateCabinet,
        getCabinet: getCabinet,
        removeCabinet: removeCabinet,
        getCabinets: getCabinets,
        setCabinets: setCabinets
    }
})();