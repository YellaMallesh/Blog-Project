"use strict";

document.addEventListener('DOMContentLoaded', function () {
  var allButtons = document.querySelectorAll('.searchBtn');
  var searchBar = document.querySelector('.searchBar');
  var searchInput = document.getElementById('searchInput');
  var searchClose = document.getElementById('searchClose');
  for (var i = 0; i < allButtons.length; i++) {
    allButtons[i].addEventListener('click', function () {
      searchBar.style.visibility = 'visible';
      searchBar.classList.add('open');
      this.setAttribute('aria-expanded', 'true');
      searchInput.focus();
    });
  }
  searchClose.addEventListener('click', function () {
    searchBar.style.visibility = 'hidden';
    searchBar.classList.remove('open');
    this.setAttribute('aria-expanded', 'false');
  });
});