document.addEventListener('DOMContentLoaded', function () {
      // Add a click event listener to the back button
      backButton.addEventListener('click', function () {
      // Navigate to the home page
      window.location.href = 'homePage.php';
      });

      // Add a click event listener to the calendar button
      calendarButton.addEventListener('click', function () {
      // Navigate to the home page
      window.location.href = 'homePage.php';
      });

      // Add a click event listener to the autoschedule button
      autoScheduleButton.addEventListener('click', function () {
      // Navigate to the autoschedule page
      window.location.href = 'autoschedule.php';
      });

      // Add a click event listener to the my account button
      myAccountButton.addEventListener('click', function () {
      alert('My Account button clicked');
      });

      // Add a click event listener to the customize button
      customizeButton.addEventListener('click', function () {
      alert('Customize button clicked');
      });

      // Add a click event listener to the sync button
      syncButton.addEventListener('click', function () {
      alert('Sync button clicked');
      });
});

