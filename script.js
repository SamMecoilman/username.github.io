function addVideo() {
    const url = document.getElementById('video-url').value;
    if (url) {
        const videoList = document.getElementById('video-list');
        const videoContainer = document.createElement('div');
        videoContainer.className = 'video-container';
        
        const iframe = document.createElement('iframe');
        iframe.src = url;
        iframe.width = '560';
        iframe.height = '315';
        iframe.frameBorder = '0';
        iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
        iframe.allowFullscreen = true;
        
        videoContainer.appendChild(iframe);
        videoList.appendChild(videoContainer);
        
        document.getElementById('video-url').value = '';
    } else {
        alert('URLを入力してください。');
    }
}
