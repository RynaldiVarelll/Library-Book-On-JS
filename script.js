let books = JSON.parse(localStorage.getItem('books')) || [];

function renderBooks() {
    const bookList = document.getElementById('bookList');
    bookList.innerHTML = '';

    books.forEach((book, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.year}</td>
            <td>
                <button onclick="editBook(${index})" class="edit-btn">Edit</button>
                <button onclick="deleteBook(${index})" class="delete-btn">Delete</button>
            </td>
        `;
        bookList.appendChild(row);
        
        // Tambahkan animasi fade-in ke row
        row.style.animation = "fadeInRow 0.5s ease-in-out";
    });
}

function addBook() {
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const year = document.getElementById('year').value;

    if (title && author && year) {
        books.push({ title, author, year });
        localStorage.setItem('books', JSON.stringify(books));
        renderBooks();
        clearForm();
    } else {
        alert('Please fill out all fields');
    }
}

function editBook(index) {
    const book = books[index];
    document.getElementById('title').value = book.title;
    document.getElementById('author').value = book.author;
    document.getElementById('year').value = book.year;

    document.querySelector('.btn').onclick = function() {
        updateBook(index);
    };
}

function updateBook(index) {
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const year = document.getElementById('year').value;

    books[index] = { title, author, year };
    localStorage.setItem('books', JSON.stringify(books));
    renderBooks();
    clearForm();

    document.querySelector('.btn').onclick = addBook;
}

function deleteBook(index) {
    books.splice(index, 1);
    localStorage.setItem('books', JSON.stringify(books));
    renderBooks();
}

function clearForm() {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('year').value = '';
}

document.addEventListener('DOMContentLoaded', renderBooks);
