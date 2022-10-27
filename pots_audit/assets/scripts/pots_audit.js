import drugs from '/assets/database/MedContainers.json' assert {type: 'json'};

const userInput = document.getElementById('userInput');
const findPotBtn = document.getElementById('findPotBtn');
const potsList = document.getElementById('potsList');
const progressBar = document.getElementById('progressBar');
const drugsLength = drugs.length;

printDrugs(drugs);

function printDrugs(drugs) {

    let myProgressBar = document.createElement('div');
    myProgressBar.setAttribute('id', 'myProgressBar');
    myProgressBar.setAttribute('class', 'progress-bar progress-bar-striped progress-bar-animated');
    myProgressBar.setAttribute('role', 'progressbar');
    myProgressBar.setAttribute('aria-label', 'Animated striped example');
    myProgressBar.setAttribute('aria-valuenow', drugsLength);
    myProgressBar.setAttribute('aria-valuemax', drugsLength);
    myProgressBar.setAttribute('aria-valuemin', '0');
    myProgressBar.setAttribute('style', 'width: 100%');
    myProgressBar.innerHTML = drugsLength;

    progressBar.appendChild(myProgressBar);


    for (let i = 0; i < drugsLength; i++) {
        let line = document.createElement('div');
        line.setAttribute('id', drugs[i].UniqueId);
        line.setAttribute('class', 'card shadow');
        line.setAttribute('style', 'max-width:25rem; margin-bottom:1rem;');
        line.innerHTML = '<b>Barcode:</b> ' + drugs[i].UniqueId + '<br>';
        line.innerHTML += '<b>Drug:</b> ' + drugs[i].MedicineId + '<br>';
        line.innerHTML += '<b>Qty:</b> ' + drugs[i].Quantity + '<br>';
        line.innerHTML += '<b>Created:</b> ' + drugs[i].EntryDate + '<br>';
        line.innerHTML += '<b>Exp date:</b> ' + drugs[i].ExpiryDate + '<br>';
        potsList.appendChild(line);
    }

}

function getUserInput() {
    return userInput.value;
}

function findPot() {

    let barcode = getUserInput();
    let potFound = false;
    
    for (let i = 0; i < drugs.length; i++) {
        if (barcode == drugs[i].UniqueId) {

            potFound = true;

            let element = document.getElementById(barcode);
            let progressBar = document.getElementById('myProgressBar');
            let attributeValue = parseInt(progressBar.getAttribute('aria-valuenow'));
            progressBar.setAttribute('aria-valuenow', attributeValue-1);

            let percentageBar = ((attributeValue - 1) / drugsLength) * 100;
            myProgressBar.setAttribute('style', 'width: ' + percentageBar + '%;');

            progressBar.innerHTML = attributeValue - 1;

            element.remove();

            userInput.focus();
            userInput.value = '';
        }
    }

    if (potFound === false) {
        alert('Pot not found!');
    }
}

findPotBtn.addEventListener('click', findPot);