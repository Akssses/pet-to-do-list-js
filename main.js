window.addEventListener('load', () => {
    // todos - глобальная переменная
	todos = JSON.parse(localStorage.getItem('todos')) || [];
	const nameInput = document.querySelector('#name');
	const newTodoForm = document.querySelector('#new-todo-form');

	const username = localStorage.getItem('username') || ''; // получаем username из localStorage

	nameInput.value = username; // Ввод инпута равен username

	nameInput.addEventListener('change', (e) => {
		localStorage.setItem('username', e.target.value); // Хранение имени в хранилище
	})

	newTodoForm.addEventListener('submit', e => {
		e.preventDefault();

		const todo = {
			content: e.target.elements.content.value, // Инпут
			category: e.target.elements.category.value, // Категория
			done: false, // Действие
			createdAt: new Date().getTime() // Дата создания
		}

		todos.push(todo); // Пушим todos в объект todo

		localStorage.setItem('todos', JSON.stringify(todos)); // Сохранение в хранилище

		// Reset the form
		e.target.reset();

        DisplayTodos() // Отображение на экране
	})
    DisplayTodos()
})

function DisplayTodos() {
    const todoList = document.querySelector('#todo-list')
    todoList.innerHTML = ''

    todos.forEach(todo => {
        const todoItem = document.createElement('div');
		todoItem.classList.add('todo-item');

		const label = document.createElement('label');
		const input = document.createElement('input');
		const span = document.createElement('span');
		const content = document.createElement('div');
		const actions = document.createElement('div');
		const edit = document.createElement('button');
		const deleteButton = document.createElement('button');

        input.type = 'checkbox';
		input.checked = todo.done;
		span.classList.add('bubble');
		if (todo.category == 'personal') {
			span.classList.add('personal');
		} else {
			span.classList.add('business');
		}
        content.classList.add('todo-content');
		actions.classList.add('actions');
		edit.classList.add('edit');
		deleteButton.classList.add('delete');

		content.innerHTML = `<input type="text" value="${todo.content}" readonly>`;
		edit.innerHTML = 'Edit';
		deleteButton.innerHTML = 'Delete';

		label.appendChild(input);
		label.appendChild(span);
		actions.appendChild(edit);
		actions.appendChild(deleteButton);
		todoItem.appendChild(label);
		todoItem.appendChild(content);
		todoItem.appendChild(actions);

		todoList.appendChild(todoItem);

        if (todo.done) {
			todoItem.classList.add('done');
		}
		
		input.addEventListener('change', (e) => {
			todo.done = e.target.checked;
			localStorage.setItem('todos', JSON.stringify(todos));

			if (todo.done) {
				todoItem.classList.add('done');
			} else {
				todoItem.classList.remove('done');
			}

			DisplayTodos()

		})
        
        edit.addEventListener('click', e => {
            const input = content.querySelector('input')
            input.removeAttribute('readonly')
            input.focus()
            input.addEventListener('blur', e => {
                input.setAttribute('readonly', true)
                todo.content = e.target.value
                localStorage.setItem('todos', JSON.stringify(todos))
                DisplayTodos()
            })
        })

        deleteButton.addEventListener('click', e => {
            todos = todos.filter(t => t !== todo)
            localStorage.setItem('todos', JSON.stringify(todos))
            DisplayTodos()
        })
    });
}