const SearchForm = document.getElementById("search-form");
const SearchInput = document.querySelector("#search-form input");
const SearchList = document.getElementById("search-list");
const SEARCH_KEY = "search";

let items = [];

function saveSearch() { //item을 localStorage에 저장
  localStorage.setItem(SEARCH_KEY, JSON.stringify(items));
}

function deleteSearch(event) { //각각의 item을 삭제
  const li = event.target.parentElement;
  li.remove();
  items = items.filter((item) => item.id !== parseInt(li.id));
  saveSearch();
}

function paintSearch(newSearch) { //화면에 뿌림
  const li = document.createElement("li");
  li.id = newSearch.id;
  const span = document.createElement("span");
  span.innerText = newSearch.text;
  const button = document.createElement("button");
  button.innerText = "❌";
  button.addEventListener("click", deleteSearch);
  li.appendChild(span);
  li.appendChild(button);
  SearchList.appendChild(li);
}

function searchSubmit(event) { //form 전송
  event.preventDefault();
  const newSearch = SearchInput.value;
  SearchInput.value = "";
  const newSearchObj = {
    text: newSearch,
    id: Date.now(),
  };
  items.push(newSearchObj);
  paintSearch(newSearchObj);
  saveSearch();
}

SearchForm.addEventListener("submit", searchSubmit);

const savedSearch = localStorage.getItem(SEARCH_KEY);
if (savedSearch !== null) {
  const parsedSearch = JSON.parse(savedSearch);
  items = parsedSearch;
  parsedSearch.forEach(paintSearch);
}