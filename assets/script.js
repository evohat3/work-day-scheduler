// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  //  Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // *DONE* Add code to display the current date in the header of the page.


//** ***GLOBAL SCOPE *** **/


//** ***GLOBAL SCOPE *** **/


// ****** CURRENT DATE & TIME ****** //
 setInterval(function() {
  curDay = dayjs();
  $('#currentDay').text(curDay.format('MMMM D, YYYY h:mm:ss A'));

  updateTimeBlocks()
}, 1000);
// ****** CURRENT DATE & TIME ****** //


// ****** SAVE BUTTON ****** //
$('.saveBtn').click(function() {
  $('.time-block').each(function() {
    const hour = $(this).find('.hour').text();
    const taskTime = $(this).find('.description').val();
  
    if (taskTime) {
      const data = {
        hour: hour,
        task: taskTime
      };
      localStorage.setItem('data-' + hour, JSON.stringify(data));
    }
  });
});
// ****** SAVE BUTTON ****** //



// ****** RETRIEVE SAVED DATA FROM LOCAL STORAGE ****** //
const savedData = [];
for (let i = 0; i < localStorage.length; i++) {
  const key = localStorage.key(i);
  if (key.startsWith('data-')) {
    const data = JSON.parse(localStorage.getItem(key));
    savedData.push(data);
  }
}
// trims data so that the saved data only shows tasks that do not have ''
// and sorts data so that it shows accordingly
const newData = savedData.filter(item => item.task.trim() !== '');
sortData = newData.sort((a, b) => a - b);
// ****** RETRIEVE SAVED DATA FROM LOCAL STORAGE ****** //


// ****** DISPLAY SAVED DATA FROM LOCAL STORAGE WITH REMOVE BUTTON ****** //
newData.forEach((data) => {
  const hour = data.hour;
  const taskTime = data.task;
  const $li = $('<li class="row">');
  const $task = $('<div class="">').text(hour + '' + taskTime);
  const $removeBtn = $('<button type="button" class="btn-close btn-close-white" aria-label="Close">');
  $li.append($task);
  $li.append($removeBtn);
  $('#savedTasks').append($li);
  $removeBtn.on('click', function() {
    $li.remove();
  });
});
// ****** DISPLAY SAVED DATA FROM LOCAL STORAGE WITH REMOVE BUTTON ****** //





// ****** TIME BLOCK ****** //
function updateTimeBlocks() {
  // Gets the current hour using Day.js
  const currentHour = dayjs().hour();
  // Loops through each time-block element
  $('.time-block').each(function() {
    // Get data for this time-block element from the data-hour attribute
    const hour = parseInt($(this).data('hour'));
    // compares data-hour to day()js and determines whether this time-block is in the past, present, or future
    $(this).removeClass('past present future');
    if (hour < currentHour) {
      $(this).addClass('past');
    } else if (hour === currentHour) {
      $(this).addClass('present');
    } else {
      $(this).addClass('future');
    }
  });
}
// ****** TIME BLOCK ****** //
