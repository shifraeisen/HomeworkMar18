$(() => {

    const modal = new bootstrap.Modal($(".modal")[0]);

    let add = true;

    function loadPeople() {
        $.get('/home/getpeople', function (people) {
            $("tbody tr").remove();
            people.forEach(person => {
                $("tbody").append(`
                    <tr data-id=${person.id}>
                        <td>${person.firstName}</td>
                        <td>${person.lastName}</td>
                        <td>${person.age}</td>
                    </tr>
                    `);
            });
        });
    }

    loadPeople();

    $("#show-add").on('click', function () {
        $("#firstName").val('');
        $("#lastName").val('');
        $("#age").val('');

        add = true;

        $(".modal-title").text("Add Person");

        modal.show();
    });

    $("#save-person").on('click', function () {
        const firstName = $("#firstName").val();
        const lastName = $("#lastName").val();
        const age = $("#age").val();

        if (add === true) {
            $.post('/home/addperson', { firstName, lastName, age }, function () {
                modal.hide();
                loadPeople();
            });
        }
        else {
            const selectedRow = $('tbody tr').filter(function () {
                return this.style.backgroundColor == 'mistyrose'
            });
            const id = selectedRow.data('id');
            $.post('/home/updateperson', { id, firstName, lastName, age }, function () {
                modal.hide();
                loadPeople();
            });
        }
    });
    $(".table").on('click', 'tbody tr', function () {
        $(this).css('background-color', 'mistyrose').siblings().attr('style', '');
    });
    $("#show-edit").on('click', function () {
        const selectedRow = $('tbody tr').filter(function () {
            return this.style.backgroundColor == 'mistyrose'
        });
        if (selectedRow.data() !== undefined) {
            const id = selectedRow.data('id');
            $.get('/home/getpersonbyid', { id }, function ({ firstName, lastName, age }) {

                $("#firstName").val(firstName);
                $("#lastName").val(lastName);
                $("#age").val(age);

                add = false;

                $(".modal-title").text("Edit Person");

                modal.show();
            });
        }
    });
    $("#delete").on('click', function () {
        const selectedRow = $('tbody tr').filter(function () {
            return this.style.backgroundColor == 'mistyrose'
        });

        if (selectedRow.data() !== undefined) {
            const id = selectedRow.data('id');

            $.post('/home/deleteperson', { id }, function (people) {
                loadPeople()
            });
        }
    });
});