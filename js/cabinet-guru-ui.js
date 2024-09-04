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
        const cabinetList = document.getElementById('cabinetList');
        cabinetList.innerHTML = '';
        cabinets.forEach((cabinet, index) => {
            const cabinetItem = document.createElement('div');
            cabinetItem.className = 'cabinet-item';
            cabinetItem.setAttribute('draggable', true);
            cabinetItem.setAttribute('data-index', index);
            cabinetItem.ondragstart = CabinetGuru.UI.drag;
            cabinetItem.innerHTML = `
                <span>${cabinet.cabinetNumber}</span>
                <span>${cabinet.cabinetType}</span>
                <span>${cabinet.cabWidth}"</span>
                <span>${cabinet.cabHeight}"</span>
                <span>${cabinet.cabDepth}"</span>
                <span>${cabinet.linearFootage.toFixed(2)} ft</span>
                <button onclick="CabinetGuru.UI.editCabinet(${index})">Edit</button>
                <button onclick="CabinetGuru.CabinetManagement.removeCabinet(${index})">Remove</button>
            `;
            cabinetList.appendChild(cabinetItem);
        });
    
        document.getElementById('cabinetCount').textContent = cabinets.length;
        const totalLinearFootage = cabinets.reduce((total, cabinet) => total + cabinet.linearFootage, 0);
        document.getElementById('totalResult').textContent = totalLinearFootage.toFixed(2);
    }

    

    function updateRunsUI(runs) {
        const runsList = document.getElementById('runsList');
        runsList.innerHTML = '';
        runs.forEach((run, index) => {
            const runItem = document.createElement('div');
            runItem.className = 'run-item';
            runItem.innerHTML = `
                <h4>${run.name} (${run.type})</h4>
                <div class="run-cabinets" ondrop="CabinetGuru.UI.drop(event, ${index})" ondragover="CabinetGuru.UI.allowDrop(event)">
                    ${run.cabinets.map((cabinet, cabIndex) => `
                        <div class="run-cabinet">
                            ${cabinet.cabinetNumber} - ${cabinet.cabinetType} - ${cabinet.cabWidth}"
                            <button onclick="CabinetGuru.Main.removeCabinetFromRun(${index}, ${cabIndex})">Remove</button>
                        </div>
                    `).join('')}
                </div>
            `;
            runsList.appendChild(runItem);
        });
    }

    function updateReport(cabinets, runs) {
        // ... (keep the existing updateReport function)
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
        updateRunsUI: updateRunsUI,
        updateReport: updateReport,
        initializeDragAndDrop: initializeDragAndDrop,
        drag: drag,
        allowDrop: allowDrop,
        drop: drop
    };
})();