$(document).ready(function(){
    const todoList = [];
    const getUniqueId = function() {
        return 'id-' + Math.random().toString(36).substr(2, 16);
      };
    const tbodyElement = $('#todoTable tbody');
    const generateRow = function (todoIndex,toDo,importance,comments) {
        return "<tr>" +
            "<td>" + todoIndex + "</td>" +
            "<td>" + toDo + "</td>" +
            "<td>" + importance + "</td>" +
            "<td>" + comments + "</td>" +
        "</tr>"
    };
    const clearForm = function() {
        $("#todoName").val("");
        $("#todoImportance").val("...");
        $("#todoComments").val(""); 
    };

    $('#todoName').keyup(function() {
        const toDo = $('#todoName').val();
        if (toDo.length > 100) {
            $('#warningLetters').css( "color", "red" );
            $('#sendForm').prop("disabled", true);
        } else {
            $('#warningLetters').css( "color", "black" );
            $('#sendForm').prop("disabled", false);
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
        $(tbodyElement).append(generateRow(todoIndex,todoObject.toDo,todoObject.importance,todoObject.comments));
        clearForm();
    });
});

/* fonction generate tr
fonction comptage de caractere */

/* pour récupération cookies
        todoList.forEach(todoObject => {
            const todoIndex = todoList.indexOf(todoObject) + 1;
            $("#todoTable tbody").append(
                '<tr>' +
                    "<td>" + todoIndex + "</td>" +
                    "<td>" + todoObject.toDo + "</td>" +
                    "<td>" + todoObject.importance + "</td>" +
                    "<td>" + todoObject.comments + "</td>" +
                "</tr>"
                );
            $("#todoName").val("");
            $("#todoImportance").val("...");
            $("#todoComments").val(""); 
        });
*/