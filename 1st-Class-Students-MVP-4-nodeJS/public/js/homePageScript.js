document.addEventListener('DOMContentLoaded', function () {
    // Get references to HTML elements, and store them in variables
    const calendarBody = document.getElementById('calendar-body');
    const currentMonthElement = document.getElementById('current-month');
    const prevMonthButton = document.getElementById('prev-month');
    const nextMonthButton = document.getElementById('next-month');
    const settingsButton = document.getElementById('settings-button');

    // Get the current date to determine the current month and year
    const currentDate = new Date();
    let currentYear = currentDate.getFullYear();
    let currentMonth = currentDate.getMonth();

    // Function to update the calendar based on the current month and year
    function updateCalendar() {
        // Clear the calendar body before updating
        calendarBody.innerHTML = '';

        // Calculate the range of years (current year and the next two years)
        const startYear = currentYear;
        const endYear = currentYear + 2;

        // Get the first day of the current month
        const firstDayOfMonth = new Date(currentYear, currentMonth, 1);

        // Calculate the number of days in the month and the starting day of the week
        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
        const startingDayOfWeek = firstDayOfMonth.getDay(); // 0 (Sunday) to 6 (Saturday)

        // Initialize a counter for day numbering
        let dayCount = 1;

        // Loop through 6 rows (weeks) and 7 columns (days)
        for (let i = 0; i < 6; i++) {
            const row = document.createElement('tr');
            for (let j = 0; j < 7; j++) {
                const cell = document.createElement('td');
                // Check if the cell is before the start of the month (empty cells)
                if (i === 0 && j < startingDayOfWeek) {
                    cell.textContent = '';
                } else if (dayCount <= daysInMonth) {
                    // Fill the cell with the day number and increment the counter
                    cell.textContent = dayCount++;
                }
                // Append the cell to the row
                row.appendChild(cell);
            }
            // Append the row to the calendar body
            calendarBody.appendChild(row);
        }

        // Update the displayed month and year in the header
        currentMonthElement.textContent = getMonthName(currentMonth) + ' ' + currentYear;
    }

    // Function to get the name of a month based on its index
    function getMonthName(monthIndex) {
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        return months[monthIndex];
    }

    // Function to handle the click event on each day in the calendar
    function handleDayClick(event) {
        // Check if the clicked cell has content
        if (event.target.textContent !== '') {
            // Get the clicked day and date
            const clickedDay = event.target.textContent;
            const selectedDate = new Date(currentYear, currentMonth, clickedDay);
            const dayOfWeek = getDayOfWeek(selectedDate.getDay());

            // Store the selected date and day in localStorage
            localStorage.setItem('selectedDate', `${getMonthName(currentMonth)} ${clickedDay}, ${currentYear}`);
            localStorage.setItem('selectedDayOfWeek', dayOfWeek);

            // Navigate to the task management page
            window.location.href = 'task.php';
        }
    }

    // Function to get the name of a day based on its index
    function getDayOfWeek(dayIndex) {
        const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        return daysOfWeek[dayIndex];
    }

    // Add a click event listener to the settings button
    settingsButton.addEventListener('click', function () {
        // Navigate to the settings page
        window.location.href = 'settingsPage.php';
    });

    // Add click event listeners to each day cell in the calendar
    calendarBody.addEventListener('click', function (event) {
        if (event.target.tagName === 'TD') {
            handleDayClick(event);
        }
    });

    // Event listener for the previous month button
    prevMonthButton.addEventListener('click', function () {
        if (currentMonth > 0) {
            // Move to the previous month and update the calendar
            currentMonth--;
        } else {
            // Move to the previous year (December) and set the month to 11 (December)
            currentMonth = 11;
            currentYear--;
        }
        updateCalendar();
    });

    // Event listener for the next month button
    nextMonthButton.addEventListener('click', function () {
        if (currentMonth < 11) {
            // Move to the next month and update the calendar
            currentMonth++;
        } else {
            // Move to the next year (January) and set the month to 0 (January)
            currentMonth = 0;
            currentYear++;
        }
        updateCalendar();
    });

    // Add a click event listener to the task management button
    taskmanagementbutton.addEventListener('click', function () {
        // Navigate to the task management page
        window.location.href = 'task.php';
    });

    // Initial update of the calendar when the page loads
    updateCalendar();
});
