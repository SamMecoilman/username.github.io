document.addEventListener("DOMContentLoaded", loadVideos);

function addVideo() {
    const url = document.getElementById('video-url').value;
    const videoId = extractVideoId(url);

    if (videoId) {
        const videoList = document.getElementById('video-list');
        const videoContainer = document.createElement('div');
        videoContainer.className = 'video-container';
        videoContainer.innerHTML = `<iframe src="https://www.youtube.com/embed/${videoId}" width="560" height="315" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;

        videoList.appendChild(videoContainer);
        saveVideo(videoId);
        document.getElementById('video-url').value = '';
    } else {
        alert('有効なYouTubeのURLを入力してください。');
    }
}

function extractVideoId(url) {
    const regExp = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regExp);
    return match ? match[1] : null;
}

function saveVideo(videoId) {
    const videos = JSON.parse(localStorage.getItem('videos') || '[]');
    videos.push(videoId);
    localStorage.setItem('videos', JSON.stringify(videos));
}

function loadVideos() {
    const videos = JSON.parse(localStorage.getItem('videos') || '[]');
    const videoList = document.getElementById('video-list');
    videos.forEach(videoId => {
        const videoContainer = document.createElement('div');
        videoContainer.className = 'video-container';
        videoContainer.innerHTML = `<iframe src="https://www.youtube.com/embed/${videoId}" width="560" height="315" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
        videoList.appendChild(videoContainer);
    });
}
