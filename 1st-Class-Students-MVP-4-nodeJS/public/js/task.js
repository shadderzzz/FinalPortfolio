document.addEventListener('DOMContentLoaded', function () {
    // Get references to the buttons by their unique IDs
    const createListButton = document.getElementById('createListButton');
    const addEventButton = document.getElementById('addEventButton');
    const editEventButton = document.getElementById('editEventButton');
    const deleteEventButton = document.getElementById('deleteEventButton');
    const autoScheduleEventButton = document.getElementById('autoScheduleEventButton');
    const addReminderButton = document.getElementById('addReminderButton');
    const importListButton = document.getElementById('importListButton');

    // Add event listeners to the buttons
    createListButton.addEventListener('click', function () {
        alert('Create New List button clicked');
    });

    addEventButton.addEventListener('click', function () {
        alert('Add Task button clicked');
    });

    editEventButton.addEventListener('click', function () {
        alert('Edit Task button clicked');
    });

    deleteEventButton.addEventListener('click', function () {
        alert('Delete Task button clicked');
    });

    autoScheduleEventButton.addEventListener('click', function () {
        window.location.href = 'autoSchedule.php';
    });

    addReminderButton.addEventListener('click', function () {
        alert('Add Reminder button clicked');
    });

    importListButton.addEventListener('click', function () {
        alert('Import List button clicked');
    });

    // Get the Back button by ID
    var backButton = document.getElementById('backButton');

    // Add click event listener for the Back button
    backButton.addEventListener('click', function () {
        handleBack();
    });

    // Additional event listeners for the main page buttons and task cards
    const upcomingButton = document.getElementById('upcoming-btn');
    const completedButton = document.getElementById('completed-btn');
    const allEventsButton = document.getElementById('all-events-btn');

    upcomingButton.addEventListener('click', function () {
        alert('Upcoming Tasks button clicked');
    });

    completedButton.addEventListener('click', function () {
        alert('Completed Tasks button clicked');
    });

    allEventsButton.addEventListener('click', function () {
        alert('All Events button clicked');
    });

    const taskCard1 = document.getElementById('taskCard1');
    const taskCard2 = document.getElementById('taskCard2');
    const taskCard3 = document.getElementById('taskCard3');

    taskCard1.addEventListener('click', function () {
        alert('Task 1 clicked');
    });

    taskCard2.addEventListener('click', function () {
        alert('Task 2 clicked');
    });

    taskCard3.addEventListener('click', function () {
        alert('Task 3 clicked');
    });

    // Update the current date dynamically
    const currentDateSpan = document.getElementById('current-date');
    const selectedDate = localStorage.getItem('selectedDate') || '';
    const selectedDayOfWeek = localStorage.getItem('selectedDayOfWeek') || '';

    if (selectedDate && selectedDayOfWeek) {
        currentDateSpan.textContent = `${selectedDayOfWeek} ${selectedDate}`;
    } else {
        const today = new Date();
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        currentDateSpan.textContent = today.toLocaleDateString('en-US', options);
    }

    // Clear the selected date and day from localStorage
    localStorage.removeItem('selectedDate');
    localStorage.removeItem('selectedDayOfWeek');
});

// Function to handle Back button click
function handleBack() {
    // Display a popup indicating that Back button is clicked
    window.location.href = 'homePage.php';
}
