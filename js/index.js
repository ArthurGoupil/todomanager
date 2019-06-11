$(document).ready(function(){
    const todoList = [];
    const uniqueId = function() {
        return 'id-' + Math.random().toString(36).substr(2, 16);
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
        $("#todoTable tr>td").remove();
        const todoObject = {
            toDo: $('#todoName').val(),
            importance: $('#todoImportance').val(),
            comments: $('#todoComments').val(),
            id:uniqueId()
        }
        todoList.push(todoObject)
        todoList.forEach(todoObject => {
            const todoId = todoList.indexOf(todoObject) + 1
            $("#todoTable tbody").append(
                "<tr>" +
                    "<td>" + todoId + "</td>" +
                    "<td>" + todoObject.toDo + "</td>" +
                    "<td>" + todoObject.importance + "</td>" +
                    "<td>" + todoObject.comments + "</td>" +
                "</tr>"
                );
                $("#todoName").val("");
                $("#todoImportance").val("...");
                $("#todoComments").val(""); 
        });
    });
});

