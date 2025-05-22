// Event listener triggered when the DOM content is fully loaded
document.addEventListener('DOMContentLoaded', function () {
    // Populate the hour and minute select elements
    populateTimeSelects('startHour');
    populateTimeSelects('endHour');
    populateTimeSelects('startMinute');
    populateTimeSelects('endMinute');

    // Get all frequency buttons
    var frequencyButtons = document.querySelectorAll('.frequency-button');

    // Add click event listeners to handle button selection
    frequencyButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            handleFrequencySelection(button);
        });
    });

    // Get all day buttons
    var dayButtons = document.querySelectorAll('.day-button');

    // Add click event listeners to handle button selection
    dayButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            toggleButtonSelection(button);
            handleDaySelection(button);
        });
    });

    // Get the Save Changes button by ID
    var saveChangesButton = document.getElementById('saveChangesBtn');

    // Add click event listener for the Save Changes button
    saveChangesButton.addEventListener('click', function () {
        handleSaveChanges();
    });

    // Get the Back button by ID
    var backButton = document.getElementById('backButton');

    // Add click event listener for the Back button
    backButton.addEventListener('click', function () {
        handleBack();
    });

    // Get the element where we want to display the current date
    var currentDateElement = document.getElementById('currentDate');

    // Create a new Date object
    var currentDate = new Date();

    // Get day, date, month, and year components
    var day = currentDate.toLocaleDateString('en-US', { weekday: 'long' });
    var date = currentDate.getDate();
    var month = currentDate.toLocaleDateString('en-US', { month: 'long' });
    var year = currentDate.getFullYear();

    // Format the date as "Day, Date Month Year" with the day, date, and month order swapped
    var formattedDate = `${day}, ${date}${getOrdinalSuffix(date)} ${month} ${year}`;

    // Set the formatted date to the HTML element
    currentDateElement.textContent = formattedDate;

    // Get the start and end time select elements
    var startHourSelect = document.getElementById('startHour');
    var endHourSelect = document.getElementById('endHour');
    var startMinuteSelect = document.getElementById('startMinute');
    var endMinuteSelect = document.getElementById('endMinute');

    // Add change event listener to start time selects
    startHourSelect.addEventListener('change', function () {
        // Validate start time against end time
        validateTimeSelection(startHourSelect, startMinuteSelect, endHourSelect, endMinuteSelect);
    });

    startMinuteSelect.addEventListener('change', function () {
        // Validate start time against end time
        validateTimeSelection(startHourSelect, startMinuteSelect, endHourSelect, endMinuteSelect);
    });

    // Add change event listener to end time selects
    endHourSelect.addEventListener('change', function () {
        // Validate end time against start time
        validateTimeSelection(startHourSelect, startMinuteSelect, endHourSelect, endMinuteSelect);
    });

    endMinuteSelect.addEventListener('change', function () {
        // Validate end time against start time
        validateTimeSelection(startHourSelect, startMinuteSelect, endHourSelect, endMinuteSelect);
    });
});

// Function to handle frequency button selection
function handleFrequencySelection(selectedButton) {
    var frequencyButtons = document.querySelectorAll('.frequency-button');

    // Iterate through all frequency buttons to unselect others
    frequencyButtons.forEach(function (button) {
        if (button !== selectedButton) {
            button.classList.remove('selected');
        }
    });

    // Toggle the selection of the clicked button
    selectedButton.classList.toggle('selected');

    // Display a popup with the name of the button clicked
    showPopup("Frequency Button Clicked: " + selectedButton.dataset.frequency);
}

// Function to toggle the selection of a button
function toggleButtonSelection(button) {
    button.classList.toggle('selected');
}

// Function to handle day button selection
function handleDaySelection(selectedButton) {
    // Display a popup with the name of the button clicked
    showPopup("Day Button Clicked: " + selectedButton.dataset.day);
}

// Function to handle Save Changes button click
function handleSaveChanges() {
    // Display a popup indicating that Save Changes button is clicked
    showPopup("Save Changes Button Clicked");
}

// Function to handle Back button click
function handleBack() {
    // Display a popup indicating that Back button is clicked
    window.location.href = 'settingsPage.php';
}

// Function to show a popup with a custom message
function showPopup(message) {
    alert(message);
}

// Function to get the ordinal suffix for a number (e.g., 1st, 2nd, 3rd)
function getOrdinalSuffix(number) {
    var suffixes = ['th', 'st', 'nd', 'rd'];
    var v = number % 100;
    return (suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0]);
}

// Function to validate time selection (start time not greater than end time)
function validateTimeSelection(startHourSelect, startMinuteSelect, endHourSelect, endMinuteSelect) {
    var startHour = parseInt(startHourSelect.value);
    var endHour = parseInt(endHourSelect.value);
    var startMinute = parseInt(startMinuteSelect.value);
    var endMinute = parseInt(endMinuteSelect.value);

    // If start hour is greater than end hour, or if start hour is equal to end hour but start minute is greater than end minute
    if (startHour > endHour || (startHour === endHour && startMinute > endMinute)) {
        // Reset end time to match start time
        endHourSelect.value = startHour;
        endMinuteSelect.value = startMinute;

        showPopup("End time cannot be earlier than start time.");
    }
}

// Function to populate the hour and minute select elements
function populateTimeSelects(selectId) {
    var selectElement = document.getElementById(selectId);
    var isHourSelect = selectId.includes('Hour');
    var range = isHourSelect ? Array.from({ length: 24 }, (_, i) => i) : Array.from({ length: 60 }, (_, i) => i);

    // Iterate through the range to create options for the select element
    range.forEach(function (value) {
        var option = document.createElement('option');
        option.value = value;
        option.text = value < 10 ? '0' + value : value.toString(); // Format single-digit values with a leading zero
        selectElement.add(option);
    });
}
