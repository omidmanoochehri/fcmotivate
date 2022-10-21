// const API_URL = window.location.origin;
const SELLER_REGISTRATION_API_URL = window.location.origin + "/sellerRegistration";
const loading = `<div class="spinner-border" role="status">
<span class="sr-only">در حال بارگذاری...</span>
</div>`;
const datePickerConfig = {
    // "inline": true,
    "format": "YYYY/MM/DD",
    "viewMode": "day",
    "initialValue": true,
    // "minDate": 1627401801973,
    // "maxDate": 1628352201989,
    "autoClose": false,
    "position": "auto",
    "altFormat": "YYYY/MM/DD",
    "altField": "#altfieldExample",
    "onlyTimePicker": false,
    "onlySelectOnDate": false,
    "calendarType": "persian",
    "inputDelay": 800,
    "observer": false,
    "calendar": {
        "persian": {
            "locale": "fa",
            "showHint": true,
            "leapYearMode": "algorithmic"
        },
        "gregorian": {
            "locale": "en",
            "showHint": false
        }
    },
    "navigator": {
        "enabled": true,
        "scroll": {
            "enabled": true
        },
        "text": {
            "btnNextText": "قبلی",
            "btnPrevText": "بعدی"
        }
    },
    "toolbox": {
        "enabled": true,
        "calendarSwitch": {
            "enabled": false,
            "format": "MMMM"
        },
        "todayButton": {
            "enabled": true,
            "text": {
                "fa": "امروز",
                "en": "Today"
            }
        },
        "submitButton": {
            "enabled": true,
            "text": {
                "fa": "تایید",
                "en": "Submit"
            }
        },
        "text": {
            "btnToday": "امروز"
        }
    },
    "timePicker": {
        "enabled": false,
        "step": 1,
        "hour": {
            "enabled": true,
            "step": null
        },
        "minute": {
            "enabled": true,
            "step": null
        },
        "second": {
            "enabled": true,
            "step": null
        },
        "meridian": {
            "enabled": true
        }
    },
    "dayPicker": {
        "enabled": true,
        "titleFormat": "YYYY MMMM"
    },
    "monthPicker": {
        "enabled": true,
        "titleFormat": "YYYY"
    },
    "yearPicker": {
        "enabled": true,
        "titleFormat": "YYYY"
    },
    "responsive": true
}
var cities;

mapboxgl.accessToken = 'pk.eyJ1Ijoib21hbm9vY2hlaHJpIiwiYSI6ImNrcnFtYzY4dzJvZnQydXJ2MnN0M3NybmcifQ.tTJa8bALKvpVTT2xBGz8Og';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [51.3890, 35.6892],
    zoom: 14
});

mapboxgl.setRTLTextPlugin(
    'https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.3/mapbox-gl-rtl-text.js',
    null,
    true // Lazy load the plugin
);

// Add zoom and rotation controls to the map.
map.addControl(new mapboxgl.NavigationControl());

// Add geolocate control to the map.
map.addControl(
    new mapboxgl.GeolocateControl({
        positionOptions: {
            enableHighAccuracy: true
        },
        trackUserLocation: true
    })
);
var marker;

jQuery(window).on('load', function(e) {
    marker = new mapboxgl.Marker()
        .setLngLat([35.6892, 51.3890])
        .addTo(map);
})

map.on('mousemove', function(e) {
    var center = map.getCenter();
    // access longitude and latitude values directly
    var { lng, lat } = map.getCenter();

    marker.setLngLat([lng, lat])
    jQuery("#lat").val(lat)
    jQuery("#lng").val(lng)
});

function sendOTP(username) {
    loadingOn();
    $.ajax({
        url: SELLER_REGISTRATION_API_URL + "/sendOTP",
        data: {
            username: username
        },
        method: "POST",
        cache: false,
        dataType: "JSON",
        success: function(res) {
            loadingOff();
            if (res.result === "Sent") {
                $("#sendOTPForm").slideUp();
                $("#submitOTPForm").slideDown();
            } else {
                showErrorAlert('ارسال کد با خطا مواجه شد. لطفا مجددا سعی نمایید.');
            }
        },
        error: function(err) {
            loadingOff();
            showErrorAlert('ارسال کد با خطا مواجه شد. لطفا مجددا سعی نمایید.');
        }
    })
}

function submitOTP(username, sentOTP) {
    loadingOn();
    $.ajax({
        url: SELLER_REGISTRATION_API_URL + "/submitOTP",
        data: {
            username: username,
            sentOTP: sentOTP
        },
        method: "POST",
        cache: false,
        dataType: "JSON",
        success: function(res) {
            loadingOff();
            if (res.result === "Seller Verified.") {
                $("#submitOTPForm").slideUp();
                $("#sellerGeneralInformationForm").slideDown();
            }

            if (res.result === "Seller Exists!") {
                showErrorAlert('فروشنده با این شماره همراه وجود دارد!');
                $("#sendOTPForm").slideDown();
                $("#submitOTPForm").slideUp();
            }


            if (res.result === "Wrong OTP!") {
                showErrorAlert('کد تایید وارد شده اشتباه است!');
                $("#submitOTPForm")[0].reset();
            }
        },
        error: function(err) {
            loadingOff();
            showErrorAlert('ارسال کد با خطا مواجه شد. لطفا مجددا سعی نمایید.')
        }
    })
}

function loadingOn() {
    $(".loading").show();
}

function loadingOff() {
    $(".loading").hide();
}

jQuery(document).on("submit", "#sendOTPForm", function(e) {
    e.preventDefault();
    let username = $("#username").val();
    sendOTP(username);
})

jQuery(document).on("submit", "#submitOTPForm", function(e) {
    e.preventDefault();
    let username = $("#username").val();
    let sentOTP = $("#sentOTP").val();
    submitOTP(username, sentOTP);
})

jQuery(document).on("submit", "#sellerGeneralInformationForm", function(e) {
    e.preventDefault();
    let generalData = $(this).serialize();
    setCookie("sellerGeneralInformation", generalData);

    $("#sellerGeneralInformationForm").slideUp();
    $("#sellerStoreInformationForm").slideDown();
})

jQuery(document).on("submit", "#sellerStoreInformationForm", function(e) {
    e.preventDefault();
    let sellerStoreInformation = $(this).serialize();
    setCookie("sellerStoreInformation", sellerStoreInformation);

    $("#sellerStoreInformationForm").slideUp();
    $("#sellerUploadDocumentsForm").slideDown();
})

jQuery(document).on("submit", "#sellerUploadDocumentsForm", function(e) {
    e.preventDefault();

    let sellerGeneralInformation = unserializeFormData(getCookie("sellerGeneralInformation", "string"));
    let sellerStoreInformation = unserializeFormData(getCookie("sellerStoreInformation", "string"));
    var sellerData = {...sellerGeneralInformation, ...sellerStoreInformation }

    var formData = new FormData(this);
    formData.append("username", jQuery("#username").val());

    jQuery.each(sellerData, (key, val) => {
        formData.append(key, val);
    })

    $.ajax({
        url: SELLER_REGISTRATION_API_URL + "/addSeller",
        type: 'POST',
        data: formData,
        success: function(data) {
            showSuccessAlert("تبریک. ثبت نام شما با موفقیت تکمیل شد.", function() {
                window.location = window.location.origin + "/admin";
            })
        },
        error: function(err) {
            showErrorAlert("ثبت نام فروشنده با خطا مواجه شد! لطفا مجددا سعی نمایید.")
        },
        cache: false,
        contentType: false,
        processData: false
    });

    // $("#sellerStoreInformationForm").slideUp();
    // $("#sellerUploadDocumentsForm").slideDown();
})

jQuery(document).on("change", "#province", function() {
    let province_id = $(this).val();

    let province_cities = getCitiesByProvinceId(province_id);

    $("#city option").remove();
    province_cities.forEach(city => {
        $("#city").append(`<option value="${city.id}">${city.name}</option>`)
    });

})

jQuery(document).on("change", "#city", function() {

    let city_id = $(this).find("option:selected").val();
    if (city_id == 87) {
        $("#area").closest(".form-group").slideDown();
    } else {
        $("#area").closest(".form-group").slideUp();
    }

})

jQuery(document).on("change", "#activeSelling", function() {
    let activeSelling = $(this).val();
    if (activeSelling === "true") {
        jQuery("#iban").closest(".form-group").slideDown();
    } else {
        jQuery("#iban").closest(".form-group").slideUp();
    }
})

jQuery(document).ready(function() {
    $("#iban").inputmask({ "mask": "IR9999999999999999" });
    $('.datePicker').persianDatepicker(datePickerConfig);


    getProvinces(function(provinces) {
        provinces.forEach(province => {
            $("#province").append(`<option value="${province.id}">${province.name}</option>`)
        });
    })

    getCities(function(citiesArray) {
        cities = citiesArray;
        $("#province").trigger("change");
    })
})