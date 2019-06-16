$(document).ready(function(){ 
    const todoList = [];
    const getUniqueId = function() {
        return 'id-' + Math.random().toString(36).substr(2, 16);
      };
    const tbodyElement = $('#todoTable tbody');
    const generateRow = function (id, todoIndex, toDo, importance, comments) {
        $(document).ready(function(){
            $('[data-toggle="popover"]').popover({
                placement:'top',
                trigger:'hover focus'
            });
        });
        return '<tr id="'+ id +'">' +
            '<td class"rowIndex">' + todoIndex + '</td>' +
            '<td>' + toDo + '</td>' +
            '<td>' + importance + '</td>' +
            '<td><button type="button" class="comments btn btn-secondary" data-toggle="popover" data-content="' + comments + '">?</button></td>' +
            '<td><button type="button" class="deleteButton btn btn-danger">Delete</button></td>' +
        '</tr>'
    };
    
    for (i=localStorage.length-1 ; i >= 0 ; i--) {
        let savedObject = JSON.parse(localStorage.getItem(localStorage.key(i)))
        todoList.push(savedObject);
        const todoIndex = todoList.indexOf(savedObject) + 1;
        $(tbodyElement).append(generateRow(savedObject.id, todoIndex, savedObject.toDo, savedObject.importance, savedObject.comments));
    };

    const clearForm = function() {
        $('#todoName').val('');
        $('#todoImportance').val('...');
        $('#todoComments').val(''); 
        $('#nbLetters').html('100 caracters left.');
    };

    $('#todoName').keyup(function() {
        const toDo = $('#todoName').val();
        if (toDo.length > 100) {
            $('#warningLetters').css( 'color', 'red' );
            $('#sendForm').prop('disabled', true);
        } else {
            $('#warningLetters').css( 'color', 'black' );
            $('#sendForm').prop('disabled', false);
        }
        if (toDo.length < 99) {
            $('#nbLetters').html(100 - toDo.length + ' caracters left.');
        } else if (toDo.length === 99 || toDo.length === 100) {
            $('#nbLetters').html(100 - toDo.length + ' caracter left.');
        } else if (toDo.length === 101) {
            $('#nbLetters').html(toDo.length - 100 + ' caracter to remove. ');
        } else if (toDo.length > 101) {
            $('#nbLetters').html(toDo.length - 100 + ' caracters to remove. ');
        } 
    });

    $('#sendForm').click(function() {
        const todoObject = {
            toDo: $('#todoName').val(),
            importance: $('#todoImportance').val(),
            comments: $('#todoComments').val(),
            id:getUniqueId()
        };
        todoList.push(todoObject);
        const todoIndex = todoList.indexOf(todoObject) + 1;
        $(tbodyElement).append(generateRow(todoObject.id, todoIndex, todoObject.toDo, todoObject.importance, todoObject.comments));
        clearForm();
        let todoObjectJson = JSON.stringify(todoObject);
        localStorage.setItem(todoObject.id,todoObjectJson);

        /*
        $('.deleteButton').click(function() {
            console.log('click')
            const indexObject = todoList.findIndex(element => element["id"] === $(this).closest('tr').attr('id'));
            todoList.splice(indexObject, 1);
            $(this).closest('tr').remove();
        });
        */


    });

    $("#todoTable").on('click', '.deleteButton', function () {
        const indexObject = todoList.findIndex(element => element["id"] === $(this).closest('tr').attr('id'));
        todoList.splice(indexObject, 1);
        $(this).closest('tr').remove();
        let rows = document.querySelectorAll('tr');
        localStorage.removeItem($(this).closest('tr').attr('id'));
        rows.forEach((row) => {
            $(row.firstChild).html(row.rowIndex);
        });
    });
});