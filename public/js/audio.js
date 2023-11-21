export let globalFileName;

const constraints = { audio: true };

function createMediaRecorder(stream) {
    const mediaRecorder = new MediaRecorder(stream);
    const chunks = [];

    mediaRecorder.ondataavailable = function (e) {
        if (e.data.size > 0) {
            chunks.push(e.data);
        }
    }

    mediaRecorder.onstart = function () {
        console.log("Started recording");
    }

    mediaRecorder.onstop = function () {
        console.log("Stopped recording");
        saveAudioBlob(chunks);
    }

    return mediaRecorder;
}

function saveAudioBlob(chunks) {
    const blob = new Blob(chunks, { 'type': 'audio/wav' });

    // Save the Blob data to a file on the server
    fetch('https://p0cg69m8hb.execute-api.eu-west-3.amazonaws.com/dev/upload-audio', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/octet-stream',
        },
        body: blob,
    })
        .then(handleAudioUploadResponse)
        .catch(handleAudioUploadError);
}

function handleAudioUploadResponse(response) {
    if (response.ok) {
        response.json().then(data => {
            console.log("Saved audio : ", data.file_name);
            globalFileName = data.file_name;
        });
    } else {
        console.error('Failed to save audio:', response.status, response.statusText)
    }
}

function handleAudioUploadError(error) {
    console.error('Error uploading audio:', error);
}

function initMediaRecorder() {
    navigator.mediaDevices.getUserMedia(constraints)
        .then(function (stream) {
            const mediaRecorder = createMediaRecorder(stream);

            const recordButton = document.getElementById('record-button');
            const stopButton = document.getElementById('stop-button');

            recordButton.addEventListener('click', function () {
                mediaRecorder.start();
            });

            stopButton.addEventListener('click', function () {
                mediaRecorder.stop();
            });
        })
        .catch(function (err) {
            console.error('Error accessing microphone:', err);
        });
}

initMediaRecorder();
