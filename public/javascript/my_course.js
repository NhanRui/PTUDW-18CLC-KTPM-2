$('.rating_text').on('click', function() {
    const id = $(this).attr('id');
    $('#courseID').val(id);
});