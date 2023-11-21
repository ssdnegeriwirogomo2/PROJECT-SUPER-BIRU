document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('iconForm').addEventListener('submit', function(event) {
        // Prevent the form from being submitted
        event.preventDefault();

        // Get the app URL from the input field
        var url = document.getElementById('url').value;

        // Call the getIcon function
        getIcon(url);
    });

    function getIcon(url) {
        // Ganti ini dengan URL layanan ikon yang valid
        var iconServiceUrl = 'https://api.apkpure.com'; // Contoh URL dari API APKPure
        var xhr = new XMLHttpRequest();

        // Open a connection to the icon retrieval service
        xhr.open('GET', iconServiceUrl + '/wp-json/apkpure-api/v1/icon?url=' + encodeURIComponent(url), true);

        // Set the response type to 'blob'
        xhr.responseType = 'blob';

        // Function to be executed when the request completes
        xhr.onload = function() {
            if (this.status === 200) {
                // Create a URL for the blob
                var blobUrl = URL.createObjectURL(this.response);

                // Display the app icon
                displayIcon(blobUrl);
            }
        };

        // Error handling
        xhr.onerror = function() {
            console.error('Error retrieving icon');
        };

        // Send the request
        xhr.send();
    }

    function displayIcon(url) {
        // Clear previous icons
        document.getElementById('iconContainer').innerHTML = '';

        // Create an img element
        var img = document.createElement('img');

        // Set the app icon URL as the image source
        img.src = url;

        // Add the img element to the icon container
        document.getElementById('iconContainer').appendChild(img);
    }
});
