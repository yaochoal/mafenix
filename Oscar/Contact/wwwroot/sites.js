const uri = 'api/contact';
let contacts = null;
function getCount(data) {
    const el = $('#counter');
    let name = 'contact';
    if (data) {
        if (data > 1) {
            name = 'contacts';
        }
        el.text(data + ' ' + name);
    } else {
        el.html('No ' + name);
    }
}

$(document).ready(function () {
    getData();
});

function getData() {
    $.ajax({
        type: 'GET',
        url: uri,
        success: function (data) {
            $('#contacts').empty();
            getCount(data.length);
            $.each(data, function (key, item) {
                const checked = item.isComplete ? 'checked' : '';

                $('<tr><td><input disabled="true" type="checkbox" ' + checked + '></td>' +
                    '<td>' + item.name + '</td>' +
                    '<td>' + item.lastname + '</td>' +
                    '<td>' + item.email + '</td>' +
                    '<td>' + item.subject + '</td>' +
                    '<td>' + item.message + '</td>' +
                    '<td><button onclick="editItem(' + item.id + ')">Edit</button></td>' +
                    '<td><button onclick="deleteItem(' + item.id + ')">Delete</button></td>' +
                    '</tr>').appendTo($('#contacts'));
            });

            contacts = data;
        }
    });
}

function addItem() {
    const item = {
        'name': $('#add-name').val(),
        'lastname': $('#add-lastname').val(),
        'email': $('#add-email').val(),
        'subject': $('#add-subject').val(),
        'message': $('#add-message').val(),
        'isComplete': false
    };

    $.ajax({
        type: 'POST',
        accepts: 'application/json',
        url: uri,
        contentType: 'application/json',
        data: JSON.stringify(item),
        error: function (jqXHR, textStatus, errorThrown) {
            alert('here');
        },
        success: function (result) {
            getData();
            $('#add-name').val('');
            $('#add-lastname').val();
            $('#add-email').val();
            $('#add-subject').val();
            $('#add-message').val();
        }
    });
}

function deleteItem(id) {
    $.ajax({
        url: uri + '/' + id,
        type: 'DELETE',
        success: function (result) {
            getData();
        }
    });
}

function editItem(id) {
    $.each(contacts, function (key, item) {
        if (item.id === id) {
            $('#edit-name').val(item.name);
            $('#edit-lastname').val(item.lastname);
            $('#edit-email').val(item.email);
            $('#edit-subject').val(item.subject);
            $('#edit-message').val(item.message);
            $('#edit-id').val(item.id);
            $('#edit-isComplete')[0].checked = item.isComplete;
        }
    });
    $('#spoiler').css({ 'display': 'block' });
}

$('.my-form').on('submit', function () {
    const item = {
        'name': $('#edit-name').val(),
        'lastname': $('#edit-lastname').val(),
        'email': $('#edit-email').val(),
        'subject': $('#edit-subject').val(),
        'message': $('#edit-message').val(),
        'isComplete': $('#edit-isComplete').is(':checked'),
        'id': $('#edit-id').val()
    };

    $.ajax({
        url: uri + '/' + $('#edit-id').val(),
        type: 'PUT',
        accepts: 'application/json',
        contentType: 'application/json',
        data: JSON.stringify(item),
        success: function (result) {
            getData();
        }
    });

    closeInput();
    return false;
});

function closeInput() {
    $('#spoiler').css({ 'display': 'none' });
}