function saveProject() {
    const projectData = {
        cabinets: cabinets,
        runs: runs,
        jobName: document.getElementById('jobName').value,
        roomName: document.getElementById('roomName').value,
        ceilingHeight: document.getElementById('ceilingHeight').value
    };

    const blob = new Blob([JSON.stringify(projectData)], {type: 'application/json'});
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `${projectData.jobName || 'cabinet-project'}.json`;
    a.click();
}

function loadProject() {
    document.getElementById('loadProjectFile').click();
}

function handleFileSelect(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const projectData = JSON.parse(e.target.result);
            cabinets = projectData.cabinets;
            runs = projectData.runs;
            document.getElementById('jobName').value = projectData.jobName || '';
            document.getElementById('roomName').value = projectData.roomName || '';
            document.getElementById('ceilingHeight').value = projectData.ceilingHeight || '';

            updateCabinetList(cabinets);
            updateRunsUI();
            updateReport(cabinets, runs);
        };
        reader.readAsText(file);
    }
}

// Expose functions to global scope
window.saveProject = saveProject;
window.loadProject = loadProject;
window.handleFileSelect = handleFileSelect;