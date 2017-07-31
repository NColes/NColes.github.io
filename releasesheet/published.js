generatePublishedTable( function() {
    $('#publishedTable').dataTable({
        "lengthChange": false,
        "pageLength": 15,
        "searching": false,
        "autoWidth": false,
        "order": [
            [3, "desc"]
        ],
        "columnDefs": [{
            "targets": 3,
            "visible": false
        }],
        "drawCallback": function(settings) {
            $('[data-toggle="tooltip"]').tooltip();

        }
    });
bindPublishedButtons();
//resizePublished();
});

//setTimeout(resizePublished, 6000);

document.body.onresize = function() {
//	resizePublished()
};
