function addVideo() {
    const url = document.getElementById('video-url').value;
    if (url) {
        const videoList = document.getElementById('video-list');
        const videoContainer = document.createElement('div');
        videoContainer.className = 'video-container';

        // YouTubeの埋め込み用URLを生成
        const videoId = extractVideoId(url);
        if (videoId) {
            const iframe = document.createElement('iframe');
            iframe.src = `https://www.youtube.com/embed/${videoId}`;
            iframe.width = '560';
            iframe.height = '315';
            iframe.frameBorder = '0';
            iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
            iframe.allowFullscreen = true;

            videoContainer.appendChild(iframe);
            videoList.appendChild(videoContainer);
            
            document.getElementById('video-url').value = '';
        } else {
            alert('有効なYouTubeのURLを入力してください。');
        }
    } else {
        alert('URLを入力してください。');
    }
}

function extractVideoId(url) {
    const regExp = /^.*(youtu.be\/|v\/|\/u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length == 11) ? match[2] : null;
}
