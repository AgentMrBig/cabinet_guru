var CabinetGuru = CabinetGuru || {};

CabinetGuru.Core = (function() {
    function checkUIFunctions() {
        if (typeof CabinetGuru.UI === 'undefined') {
            console.error('CabinetGuru.UI is not defined');
            return false;
        }
        const requiredFunctions = ['updateCabinetList', 'updateRunsUI', 'updateReport', 'toggleCabinetOptions'];
        for (let func of requiredFunctions) {
            if (typeof CabinetGuru.UI[func] !== 'function') {
                console.error(`CabinetGuru.UI.${func} is not a function`);
                return false;
            }
        }
        return true;
    }

    function initializeModules() {
        console.log('Initializing modules...');
        console.log('CabinetGuru object:', CabinetGuru);
        
        if (!CabinetGuru.Utils) {
            console.error('Utils module not loaded');
            return false;
        }
        if (!CabinetGuru.UI) {
            console.error('UI module not loaded');
            return false;
        }
        if (!CabinetGuru.CabinetManagement) {
            console.error('CabinetManagement module not loaded');
            return false;
        }
        if (!CabinetGuru.RunManagement) {
            console.error('RunManagement module not loaded');
            console.log('Available modules:', Object.keys(CabinetGuru));
            return false;
        }
        if (!CabinetGuru.Storage) {
            console.error('Storage module not loaded');
            return false;
        }
        console.log('All modules initialized successfully');
        return true;
    }

    function init() {
        console.log('Initializing CabinetGuru...');
        console.log('CabinetGuru object in init:', CabinetGuru);
        
        if (!initializeModules()) {
            alert('There was an error initializing the application. Please check the console for more information.');
            return;
        }

        document.addEventListener('DOMContentLoaded', function() {
            console.log('DOM fully loaded.');
            console.log('CabinetGuru object after DOM loaded:', CabinetGuru);
            
            if (!checkUIFunctions()) {
                console.error('UI functions are not properly defined. Please check your cabinet-guru-ui.js file.');
                alert('There was an error initializing the application. Please check the console for more information.');
                return;
            }
            
            CabinetGuru.UI.toggleCabinetOptions();
            document.getElementById('cabinetType').addEventListener('change', CabinetGuru.UI.toggleCabinetOptions);
            
            if (typeof CabinetGuru.UI.initializeDragAndDrop === 'function') {
                CabinetGuru.UI.initializeDragAndDrop();
            } else {
                console.warn('CabinetGuru.UI.initializeDragAndDrop is not defined');
            }
            
            CabinetGuru.Storage.loadAutoSave();
            console.log('CabinetGuru initialized.');
        });
    }

    return {
        init: init,
        checkUIFunctions: checkUIFunctions
    };
})();

// Initialize the application
CabinetGuru.Core.init();