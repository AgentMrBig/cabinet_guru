var CabinetGuru = CabinetGuru || {};

CabinetGuru.UI = (function() {
    function toggleCabinetOptions() {
        const cabinetType = document.getElementById('cabinetType').value;
        const toeKickHeight = document.getElementById('toeKickHeight');
        const lightRailToggle = document.getElementById('lightRailToggle');
        const crownToggle = document.getElementById('crownToggle');
        const crownCleatToggle = document.getElementById('crownCleatToggle');
        
        if (['Upper', 'Pantry Oven/Microwave', 'Pantry'].includes(cabinetType)) {
            toeKickHeight.disabled = true;
            lightRailToggle.style.display = 'flex';
            crownToggle.style.display = 'flex';
            crownCleatToggle.style.display = 'flex';
        } else {
            toeKickHeight.disabled = false;
            lightRailToggle.style.display = 'none';
            crownToggle.style.display = 'none';
            crownCleatToggle.style.display = 'none';
            document.getElementById('hasLightRail').checked = false;
            document.getElementById('hasCrown').checked = false;
            document.getElementById('hasCrownCleat').checked = false;
        }
    }

    function updateCabinetList(cabinets) {
        // ... (rest of the function remains the same)
    }

    function updateReport(cabinets, runs) {
        // ... (rest of the function remains the same)
    }

    function drag(event) {
        event.dataTransfer.setData("text", event.target.getAttribute('data-index'));
    }

    function allowDrop(event) {
        event.preventDefault();
    }

    function drop(event, runIndex) {
        event.preventDefault();
        const cabinetIndex = event.dataTransfer.getData("text");
        CabinetGuru.Main.addCabinetToRun(runIndex, parseInt(cabinetIndex));
    }

    function initializeDragAndDrop() {
        document.getElementById('runsList').addEventListener('dragover', allowDrop);
        document.getElementById('runsList').addEventListener('drop', (event) => {
            const runItem = event.target.closest('.run-item');
            if (runItem) {
                const runIndex = Array.from(runItem.parentNode.children).indexOf(runItem);
                drop(event, runIndex);
            }
        });
    }

    // Public API
    return {
        toggleCabinetOptions: toggleCabinetOptions,
        updateCabinetList: updateCabinetList,
        updateReport: updateReport,
        initializeDragAndDrop: initializeDragAndDrop,
        drag: drag,
        allowDrop: allowDrop,
        drop: drop
    };
})();

// Remove this line as it's now handled in the main module
// document.addEventListener('DOMContentLoaded', initializeDragAndDrop);