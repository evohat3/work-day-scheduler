// ****** CURRENT DATE & TIME ****** //
 setInterval(function() {
  curDay = dayjs();
  $('#currentDay').text(curDay.format('MMMM D, YYYY h:mm:ss A'));

  updateTimeBlocks()
}, 1000);
// ****** CURRENT DATE & TIME ****** //

// ****** UPDATES BLOCK ******  //
function updateTimeBlocks() {
  // Get the current hour using Day.js
  const currentHour = dayjs().hour();
  // Loop through each time-block element
  $('.time-block').each(function() {
    // Get the hour for this time-block element from the data-hour attribute
    const hour = parseInt($(this).data('hour'));
    // Determine whether this time-block is in the past, present, or future
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
// ****** UPDATES BLOCK ******  //


// ****** SAVES DATA ****** //
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

// ****** SAVES DATA ****** //

// Retrieve and sort saved data by hour
const savedData = [];
for (let i = 0; i < localStorage.length; i++) {
  const key = localStorage.key(i);
  if (key.startsWith('data-')) {
    const data = JSON.parse(localStorage.getItem(key));
    savedData.push(data);
  }
}

// ****** CREATES ELEMENTS FROM SAVED DATA AND DISPLAYS ON SAVED TASKS BOX ****** //
// *trims data so that the saved data only shows tasks that do not have ''
// *sorts data so that it shows accordingly
const newData = savedData.filter(item => item.task.trim() !== '');
sortData = newData.sort((a, b) => a - b);

newData.forEach((data) => {
  const hour = data.hour;
  const taskTime = data.task;
  const $li = $('<li class="row">');
  const $task = $('<div class="task">').text(hour + '  -  ' + taskTime);
  const $removeBtn = $('<button type="button" class="btn-close btn-close-white" aria-label="Close">');

  $li.append($task);
  $li.append($removeBtn);
  $('#savedTasks').append($li);

  $removeBtn.on('click', function() {
    $li.remove();
    // Clear textarea of corresponding time-block
    $('.time-block[data-hour="' + hour + '"]').find('.description').val('');
  });

  $('.time-block[data-hour="' + hour + '"]').find('.description').val(taskTime);
});
// ****** CREATES ELEMENTS FROM SAVED DATA AND DISPLAYS ON SAVED TASKS BOX ****** //

// ****** LOADS SAVED TASK IN INPUT TEXTAREA WHERE IT WAS WRITTEN ****** //
$(document).ready(function() {

  $('.time-block').each(function() {
    const hour = $(this).find("div").text()
    console.log(hour);
    const savedData = localStorage.getItem( "data-" + hour);
    if (savedData) {
     const task = JSON.parse(savedData).task;
  
      $(this).find('.description').val(task);
    }
  });
});
// ****** LOADS SAVED TASK IN INPUT TEXTAREA WHERE IT WAS WRITTEN ****** //