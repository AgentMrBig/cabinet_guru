var CabinetGuru = CabinetGuru || {};

CabinetGuru.Storage = (function() {
    function autoSave() {
        console.log('Auto-saving...');
        const projectData = getProjectData();
        localStorage.setItem('cabinetGuruAutoSave', JSON.stringify(projectData));
    }

    function loadAutoSave() {
        console.log('Loading auto-save data...');
        const savedData = localStorage.getItem('cabinetGuruAutoSave');
        if (savedData) {
            loadProjectData(JSON.parse(savedData));
        }
    }

    function saveProject() {
        const projectData = getProjectData();
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
                loadProjectData(projectData);
            };
            reader.readAsText(file);
        }
    }

    function getProjectData() {
        return {
            cabinets: CabinetGuru.CabinetManagement.getCabinets(),
            runs: CabinetGuru.RunManagement.getRuns(),
            jobName: document.getElementById('jobName').value,
            roomName: document.getElementById('roomName').value,
            ceilingHeight: document.getElementById('ceilingHeight').value
        };
    }

    function loadProjectData(projectData) {
        CabinetGuru.CabinetManagement.setCabinets(projectData.cabinets);
        CabinetGuru.RunManagement.setRuns(projectData.runs);
        document.getElementById('jobName').value = projectData.jobName || '';
        document.getElementById('roomName').value = projectData.roomName || '';
        document.getElementById('ceilingHeight').value = projectData.ceilingHeight || '';

        CabinetGuru.UI.updateCabinetList(projectData.cabinets);
        CabinetGuru.UI.updateRunsUI(projectData.runs);
        CabinetGuru.UI.updateReport(projectData.cabinets, projectData.runs);
    }

    return {
        autoSave: autoSave,
        loadAutoSave: loadAutoSave,
        saveProject: saveProject,
        loadProject: loadProject,
        handleFileSelect: handleFileSelect
    };
})();