document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('github-form');
    const userList = document.getElementById('user-list');
    const reposList = document.getElementById('repos-list');
  
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const searchValue = document.getElementById('search').value;
      searchUsers(searchValue);
    });
  
    function searchUsers(query) {
      const url = `https://api.github.com/search/users?q=${query}`;
      fetch(url, {
        headers: {
          'Accept': 'application/vnd.github.v3+json'
        }
      })
      .then(response => response.json())
      .then(data => displayUsers(data.items))
      .catch(error => console.error('Error fetching users:', error));
    }
  
    function displayUsers(users) {
      userList.innerHTML = '';
      reposList.innerHTML = '';
      users.forEach(user => {
        const li = document.createElement('li');
        li.innerHTML = `
          <img src="${user.avatar_url}" alt="${user.login}'s avatar" width="50" height="50">
          <a href="${user.html_url}" target="_blank">${user.login}</a>
        `;
        li.addEventListener('click', () => fetchUserRepos(user.login));
        userList.appendChild(li);
      });
    }
  
    function fetchUserRepos(username) {
      const url = `https://api.github.com/users/${username}/repos`;
      fetch(url, {
        headers: {
          'Accept': 'application/vnd.github.v3+json'
        }
      })
      .then(response => response.json())
      .then(data => displayRepos(data))
      .catch(error => console.error('Error fetching repos:', error));
    }
  
    function displayRepos(repos) {
      reposList.innerHTML = '';
      repos.forEach(repo => {
        const li = document.createElement('li');
        li.innerHTML = `
          <a href="${repo.html_url}" target="_blank">${repo.name}</a>
        `;
        reposList.appendChild(li);
      });
    }
  });
  