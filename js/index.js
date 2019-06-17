$(document).ready(function(){
    $('#todoTable tbody').sortable({
        opacity:0.8,
        axis:'y',	
        helper: function(e, ui) {
	    ui.children().each(function() {
		    $(this).width($(this).width());
		});
		return ui;
	    },  
    forcePlaceholderSize: true
    });

/*
var sortedIDs = $( ".selector" ).sortable( "toArray" );
*/

    const todoList = JSON.parse(localStorage.getItem('todoListStorage'));
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
    todoList.forEach((element) => {
    const todoIndex = todoList.indexOf(element) + 1;
    $(tbodyElement).append(generateRow(element.id, todoIndex, element.toDo, element.importance, element.comments));
    });

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
        localStorage.setItem('todoListStorage', JSON.stringify(todoList));
        /*
        $('.deleteButton').click(function() {
            console.log('click')
            const indexObject = todoList.findIndex(element => element["id"] === $(this).closest('tr').attr('id'));
            todoList.splice(indexObject, 1);
            $(this).closest('tr').remove();
        });
        */
    });

    $('#todoTable').on('click', '.deleteButton', function () {
        const indexObject = todoList.findIndex(element => element["id"] === $(this).closest('tr').attr('id'));
        todoList.splice(indexObject, 1);
        localStorage.setItem('todoListStorage', JSON.stringify(todoList));
        $(this).closest('tr').remove();
        let rows = document.querySelectorAll('tr');
        localStorage.removeItem($(this).closest('tr').attr('id'));
        rows.forEach((row) => {
            $(row.firstChild).html(row.rowIndex);
        });
    });

    $('#todoTable tbody').on( "sortstop", function(event, ui) {
        let rows = document.querySelectorAll('tr');
        rows.forEach((row) => {
            $(row.firstChild).html(row.rowIndex);
        });
        $('#todoTable tbody tr').each(function() {
            const indexObject = todoList.findIndex(element => element["id"] === $(this).closest('tr').attr('id'));
            todoList.push(todoList[indexObject]);
            todoList.splice(indexObject, 1);
            localStorage.setItem('todoListStorage', JSON.stringify(todoList));
        });
    });

});

