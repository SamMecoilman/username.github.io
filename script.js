document.addEventListener("DOMContentLoaded", loadVideos);

function addVideo() {
    const url = document.getElementById('video-url').value;
    const videoId = extractVideoId(url);

    if (videoId) {
        const videoList = document.getElementById('video-list');
        const videoContainer = document.createElement('div');
        videoContainer.className = 'video-container';
        videoContainer.innerHTML = `
            <iframe src="https://www.youtube.com/embed/${videoId}" width="560" height="315" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            <div class="like-container">
                <button class="like-button" onclick="likeVideo('${videoId}')">👍 <span id="like-count-${videoId}">0</span></button>
            </div>
        `;

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
    if (!videos.includes(videoId)) {
        videos.push(videoId);
        localStorage.setItem('videos', JSON.stringify(videos));
        localStorage.setItem(`like-count-${videoId}`, '0');
    }
}

function loadVideos() {
    const videos = JSON.parse(localStorage.getItem('videos') || '[]');
    const videoList = document.getElementById('video-list');
    videos.forEach(videoId => {
        const likeCount = localStorage.getItem(`like-count-${videoId}`) || '0';
        const videoContainer = document.createElement('div');
        videoContainer.className = 'video-container';
        videoContainer.innerHTML = `
            <iframe src="https://www.youtube.com/embed/${videoId}" width="560" height="315" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            <div class="like-container">
                <button class="like-button" onclick="likeVideo('${videoId}')">👍 <span id="like-count-${videoId}">${likeCount}</span></button>
            </div>
        `;
        videoList.appendChild(videoContainer);
    });
}

function likeVideo(videoId) {
    const likeCountElement = document.getElementById(`like-count-${videoId}`);
    let likeCount = parseInt(likeCountElement.textContent);
    likeCount++;
    likeCountElement.textContent = likeCount;
    localStorage.setItem(`like-count-${videoId}`, likeCount.toString());
}
