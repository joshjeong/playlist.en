$(document).ready(function() {

  sidebarStatus = false;
  $('#toggle_button').click(function() {
    if (sidebarStatus == false) {
      $('#sidebar').animate({
        right: "0",
      }, 2000);
      sidebarStatus = true;
  }
    else {
      $('#sidebar').animate({
        right: "-21rem"
      }, 2500);
      sidebarStatus = false;
    }
  });
  bindEvents();

});

//-----------------------------------------------

function bindEvents() {
  searchListener();
  searchFirstSong();
  addListener();
}

//-----------------------------------------------

function searchListener() {
  $('#search').on('submit', function(e){
    e.preventDefault();
    createSearchList( $(this) );
  })
}


function searchFirstSong() {
  console.log('searchfirstsong')
  $('#first_search').on('submit', function(e){
    e.preventDefault();
    createFirstSearch( $(this) );
  })
}

function addListener() {
  $('.search_area').on('click', '.result_thumbnail', function(e) {
    e.preventDefault();
    console.log($(this));
    addQueue($(this));
    console.log('here');
  })
}



//----------------------------------------------- 


function createSearchList(button) {
  var search = $('#search').serialize();
  $.ajax({
    url: "/search",
    type: "POST",
    data: search
  }).done(function(response) {
    $('.result_container').empty();
    $('.result_container').append(response);
  })
}

function createFirstSearch(button) {
  var search = $('#first_search').serialize();
  $.ajax({
    url: "/first_search/results",
    type: "POST",
    data: search
  }).done(function(response) {
    $('.first_container').empty();
    $('.first_container').append(response);
  })
}


function addQueue(button) {
  console.log('add ho');
  $.ajax({
    type: "post",
    url: '/add',
    data: {addVideo: button.parents('a').attr('href')}
  }).done(function(response) {
    console.log('response');
    $('.add_queue').append(response);

  })
}



//----------------------------------------------- 








