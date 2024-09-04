var CabinetGuru = CabinetGuru || {};

CabinetGuru.RunManagement = (function() {
    var runs = [];

    function createRun(type) {
        console.log('Creating run of type:', type);
        const runName = prompt(`Enter a name for the ${type} run:`);
        if (runName) {
            runs.push({
                name: runName,
                type: type,
                cabinets: []
            });
            updateUI();
            CabinetGuru.Storage.autoSave();
        }
    }

    function addCabinetToRun(runIndex, cabinetIndex) {
        console.log('Adding cabinet to run. Run index:', runIndex, 'Cabinet index:', cabinetIndex);
        const cabinet = CabinetGuru.CabinetManagement.getCabinet(cabinetIndex);
        if ((cabinet.cabinetType === 'Upper' && runs[runIndex].type === 'Upper') ||
            (cabinet.cabinetType !== 'Upper' && runs[runIndex].type === 'Base')) {
            runs[runIndex].cabinets.push(cabinet);
            CabinetGuru.CabinetManagement.removeCabinet(cabinetIndex);
            updateUI();
            CabinetGuru.Storage.autoSave();
        } else {
            alert("Cabinet type doesn't match run type.");
        }
    }

    function removeCabinetFromRun(runIndex, cabinetIndex) {
        console.log('Removing cabinet from run. Run index:', runIndex, 'Cabinet index:', cabinetIndex);
        const cabinet = runs[runIndex].cabinets[cabinetIndex];
        runs[runIndex].cabinets.splice(cabinetIndex, 1);
        CabinetGuru.CabinetManagement.getCabinets().push(cabinet);
        updateUI();
        CabinetGuru.Storage.autoSave();
    }

    function updateUI() {
        if (CabinetGuru.UI) {
            CabinetGuru.UI.updateCabinetList(CabinetGuru.CabinetManagement.getCabinets());
            CabinetGuru.UI.updateRunsUI(runs);
            CabinetGuru.UI.updateReport(CabinetGuru.CabinetManagement.getCabinets(), runs);
        } else {
            console.error('UI module not available');
        }
    }

    function getRuns() {
        return runs;
    }

    function setRuns(newRuns) {
        runs = newRuns;
    }

    return {
        createRun: createRun,
        addCabinetToRun: addCabinetToRun,
        removeCabinetFromRun: removeCabinetFromRun,
        getRuns: getRuns,
        setRuns: setRuns
    };
})();