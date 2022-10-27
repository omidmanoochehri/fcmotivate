var currentUser;
const datatableConfigs = {
    lengthChange: false,
    // processing: true,
    // serverSide: true,
    deferRender: true,
    // responsive: true,
    bLengthChange: false,
    // bInfo: false,
    // bPaginate: false,
    // sDom: 'lrtip',
    bSearch: true,
    buttons: [
        {
            extend: 'excelHtml5',
            exportOptions: {
                columns: [':visible']
            }
        }
    ]
}


const getImageSizeByURL = (url, callback) => {
    const xhr = new XMLHttpRequest();
    xhr.open("HEAD", url, true);
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4) {
        if (xhr.status == 200) {
          return callback(xhr.getResponseHeader("Content-Length"));
        } else {
          return callback(false);
        }
      }
    };
    xhr.send(null);
  };
  var galleryDropzone;
  Dropzone.autoDiscover = false;

  $(document).ready(function () {
    if ($("#gallery-dropzone").length) {
      Dropzone.options.galleryDropzone = {
        init: function () {
          // let myDropzone = $("#gallery-dropzone")[0].dropzone;
          galleryDropzone = this;
          $.ajax({
            type: "get",
            url: window.location.origin + "/gallery",
            success: function (mocks) {
              $.each(mocks, function (key, value) {
                getImageSizeByURL(
                    window.location.origin + "/media/gallery/" + value,
                  (response) => {
                    if (response) {
                      galleryDropzone.displayExistingFile(
                        {
                          name: value,
                          size: response,
                        },
                        window.location.origin + "/media/gallery/" + value
                      );
                    } else {
                      done("Unkown Error! :(");
                    }
                  }
                );
              });
            },
            error: function (xhr, durum, hata) {
              alert("Hata: " + hata);
            },
          });
        },
        // acceptedFiles: "image/jpeg,image/png,image/gif",
        addRemoveLinks: true,
        paramName: "media",
        // maxFilesize: 1,
        removedfile: function (file) {
          $.ajax({
            url: window.location.origin + "/gallery/remove",
            type: "DELETE",
            dataType: "JSON",
            data: { filename: file.name },
            success: ({ response }) => {
              console.log("response", response);
              if (response) {
                galleryDropzone.removeFile(file);
                file.previewElement.remove();
              }
            },
            error: function (err) {
              console.log(err);
              alert("Unkown Error! :(");
            },
          });
        },
        accept: function (file, done) {
          if (file.name == "justinbieber.jpg") {
            done("Naha, you don't.");
          } else {
            done();
          }
        },
      };
  
      Dropzone.discover();
    }

    //Buttons examples
    var datatable = $('.table').DataTable(datatableConfigs);
    datatable.buttons().container().appendTo(".dataTables_wrapper .col-md-6:eq(0)")

    if ($(".select2").length) {
        $(".select2").select2();
    }
    if ($("#description").length > 0) {
        tinymce.init({
            selector: "textarea#description",
            theme: "modern",
            height: 300,
            // directionality: "rtl",
            plugins: [
                "advlist autolink link image lists charmap print preview hr anchor pagebreak spellchecker",
                "searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking",
                "save table contextmenu directionality emoticons template paste textcolor"
            ],
            toolbar: "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | l      ink image | print preview media fullpage | forecolor backcolor emoticons | ltr rtl",
            style_formats: [{
                title: 'Bold text',
                inline: 'b'
            }, {
                title: 'Red text',
                inline: 'span',
                styles: {
                    color: '#ff0000'
                }
            }, {
                title: 'Red header',
                block: 'h1',
                styles: {
                    color: '#ff0000'
                }
            }, {
                title: 'Example 1',
                inline: 'span',
                classes: 'example1'
            }, {
                title: 'Example 2',
                inline: 'span',
                classes: 'example2'
            }, {
                title: 'Table styles'
            }, {
                title: 'Table row 1',
                selector: 'tr',
                classes: 'tablerow1'
            }]
        });
    }
    if ($("#content").length > 0) {
        tinymce.init({
            selector: "textarea#content",
            theme: "modern",
            height: 300,
            directionality: "rtl",
            plugins: [
                "advlist autolink link image lists charmap print preview hr anchor pagebreak spellchecker",
                "searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking",
                "save table contextmenu directionality emoticons template paste textcolor"
            ],
            toolbar: "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | l      ink image | print preview media fullpage | forecolor backcolor emoticons | ltr rtl",
            style_formats: [{
                title: 'Bold text',
                inline: 'b'
            }, {
                title: 'Red text',
                inline: 'span',
                styles: {
                    color: '#ff0000'
                }
            }, {
                title: 'Red header',
                block: 'h1',
                styles: {
                    color: '#ff0000'
                }
            }, {
                title: 'Example 1',
                inline: 'span',
                classes: 'example1'
            }, {
                title: 'Example 2',
                inline: 'span',
                classes: 'example2'
            }, {
                title: 'Table styles'
            }, {
                title: 'Table row 1',
                selector: 'tr',
                classes: 'tablerow1'
            }]
        });
    }
    currentUser = JSON.parse(getCookie("currentUser"));
    $("#userTitle").html((currentUser.first_name && currentUser.last_name) ? currentUser.first_name + " " + currentUser.last_name : currentUser.username);

    $(document).on("submit", "#loginForm", function(e) {
        e.preventDefault();
        let username = $("#username").val();
        let password = $("#password").val();
        doLogin(username, password, function(result) {
            if (result.token) {
                window.location = window.location.origin + "/admin";
            } else {
                showErrorAlert("شماره همراه یا رمز عبور اشتباه است!");
            }
        })
    })

    $(document).on("click", "#logoutBtn", doLogOut)
});