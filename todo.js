

"use strict"


      document.addEventListener("DOMContentLoaded", () => {
        generateUsersDropdown();
        generateCategoryDropdown();

        // const selectElement = document.getElementById("users");
      });

      const usersDropdown = document.getElementById("users");
      const selectedCategory = document.getElementById("category");
      const display = document.getElementById("display");
      const todos = document.getElementById("todos");
      const apiURL = "http://localhost:8083/api/users";
      const categoryApiUrl = "http://localhost:8083/api/categories";
      const toDoUrl = "http://localhost:8083/api/todos";
      const toDoByUserUrl = "http://localhost:8083/api/todos/byuser/";

      function generateUsersDropdown() {
        fetch(apiURL)
        .then(response => response.json())
        .then(json => {
            json.forEach((users) => {
            const option = new Option (users.name, users.id)
            usersDropdown.appendChild(option);

            });
        })}

         function generateCategoryDropdown() {
             fetch(categoryApiUrl)
            .then(response => response.json())
             .then(json => {
                json.forEach(category => {
                const option = new Option(category.name, category.name);
                 selectedCategory.appendChild(option);
                    });
                })
            }

      usersDropdown.addEventListener("change", showDisplay);
      selectedCategory.addEventListener("change", showDisplay);

      
      function showDisplay() {
        const user = usersDropdown.value;
        const category = selectedCategory.value;
       fetch(`${toDoByUserUrl}${user}`)
       .then(response => response.json())
       .then(data => { 

        todos.innerHTML = " ";

        data.forEach(todo => {
            console.log(todo);
           todos.innerHTML += `${todo.description}<br> ${todo.deadline} <br> ${todo.priority}`
        })

        if(category !== 'select'){
            const filtered = data.filter(todo => todo.category === category)
        

            todos.innerHTML = " ";
            filtered.forEach(todo => {
                console.log(todo);
               todos.innerHTML += `${todo.description}<br> ${todo.deadline} <br> ${todo.priority}`
            })
        }
        console.log(data);
         display.innerHTML = `Selected User : ${user} <br> Selected Category : ${category} <br> todos: `;
         })
        };
