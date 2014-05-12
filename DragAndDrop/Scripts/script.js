/// <reference path="jquery-1.8.3.js" />

$(function () {
    var dropbox = $('#dropbox'),
        imageGallery = $('#imgGallery'),
		message = $('.message', dropbox),
        fileIndex = 0;

    dropbox.filedrop({
        // The name of the $_FILES entry:
        paramname: 'file',
        maxfiles: 5,
        maxfilesize: 2, // in mb
        url: '/home/UploadImage',
        uploadFinished: function (i, file, response) {
            $.data(file).addClass('done');
            // response code here
        },
        error: function (err, file) {
            switch (err) {
                case 'BrowserNotSupported':
                    showMessage('Your browser does not support HTML5 file uploads!');
                    break;
                case 'TooManyFiles':
                    alert('Too many files! Please select 5 at most!');
                    break;
                case 'FileTooLarge':
                    alert(file.name + ' is too large! Please upload files up to 2mb.');
                    break;
                default:
                    break;
            }
        },
        // Called before each upload is started
        beforeEach: function (file) {
            if (!file.type.match(/^image\//)) {
                alert('Only images are allowed!');

                // Returning false will cause the
                // file to be rejected
                return false;
            }
        },
        uploadStarted: function (i, file, len) {
            fileIndex++;
            createImage(file);
        },
        progressUpdated: function (i, file, progress) {
            $.data(file).find('.progress').width(progress);
        }
    });

    var template =
        '<div class="preview">' +
            '<span class="imageHolder">' +
                '<img />' +
                '<span class="uploaded"></span>' +
            '</span>' +
            '<div class="progressHolder">' +
                '<div class="progress"></div>' +
            '</div>' +
        '</div>';

    function createImage(file) {

        var preview = $(template),
            image = $('img', preview);

        var reader = new window.FileReader();

        image.width = 100;
        image.height = 100;

        reader.onload = function (e) {
            image.attr('src', e.target.result);
        };

        // Reading the file as a DataURL. When finished,
        // this will trigger the onload function above:
        reader.readAsDataURL(file);

        //message.hide();
        preview.appendTo(imageGallery);
        //$('.preview').attr('data-index', fileIndex);
        // Associating a preview container
        // with the file, using jQuery's $.data():

        $.data(file, preview);
    }

    function showMessage(msg) {
        message.html(msg);
    }
});