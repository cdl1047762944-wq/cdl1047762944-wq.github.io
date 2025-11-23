document.addEventListener('DOMContentLoaded', function(){ // 頁面加載完成後執行函數，document:表示整個文檔 addEventListener：添加事件監聽器 'DOMContentLoaded':當HTML完全加載和解析完成以後觸發事件 function(){...}:當事件發生時執行的函數
    const joinForm = document.getElementById('joinForm'); // 獲取表單的元素 const：聲明一個常量 （不可改變的值） joinFrom：變量名，用來存儲找到的表單 document.getElementById('joinForm'):在文檔中查找ID為“joinFrom”的元素
    if(joinForm){//如果表單存在（在join.html頁面），添加提交事件的監聽器 如果joinFrom不是null或undefined（即是找到了表單）因為只有在join這個頁面有這個表單，其他的頁面是沒有的，所以要進行檢查是否存在
        joinForm.addEventListener('submit',function(event){ //給表單添加“提交”事件的監聽器 'submit':表單提交時觸發的事件 function(event){...}:當用戶點擊提交按鈕時執行的函數
            event.preventDefault();//阻止表單的默認提交行為 event：事件對象。包含事件的相關信息 preventDefault()：阻止瀏覽器的默認行為（默認是刷新頁面提交到服務器）我們不希望頁面刷新，要用JavaScript處理數據
            if(validateForm()){//調用表單驗證函數並檢查返回值 validateFrom（）：調用後面定義的驗證函數 如果返回true，表示驗證通過
                alert('感謝您的申請！我們會盡快與您取得聯繫。');//如果驗證通過，顯示成功的信息 彈出提示框顯示成功信息 alert()：瀏覽器內置的彈窗函數
                joinForm.reset();//清空表單中的所有輸入框 reset():表單對象的方法，重置所有手段
            }
        });
    }

    window.addEventListener('scroll',function(){  //監聽窗口滾動事件 window：瀏覽器窗口對象 'scroll'：當用戶滾動頁面時觸發的事件
        const navbar = this.document.querySelector('.navbar'); // 通過css選擇器獲取導航欄元素 document.querySelector('.navbar'):查找class為"navbar"的第一個元素
        if(navbar){ //如果導航欄存在
            if(window.scrollY > 100){ //檢查用戶滾動了多少距離 window.scrollY：從頁面頂部滾動的像素數 >100:如果滾動超過了100像素
                navbar.style.padding = '0.5rem  0'; //修改導航欄的css樣式 修改內邊距（上下0.5rem 左右0） 
                navbar.style.background = 'rgba(66,64,64,0.9)'; //修改背景色（更不透明）
            }else{ //如果滾動小於100像素 恢復原來樣式
                navbar.style.padding = '1rem 0';
                navbar.style.background = 'rgba(66,64,64,0.6)';
            }
        }
        const scrollBtn = document.querySelector('.scroll-to-top'); // 獲取滾動到頂部按鈕

         // 添加串流和购买按钮功能
        const streamBtn = document.getElementById('stream-btn');
        const buyAlbumBtn = document.getElementById('buy-album-btn')
        
        if(streamBtn) {
            streamBtn.addEventListener('click', function() {
                // 跳转到串流平台
                window.open('https://y.qq.com/n/ryqq/albumDetail/004ZOIop1doXru', '_blank');
            });
        }
        
        if(buyAlbumBtn) {
            buyAlbumBtn.addEventListener('click', function() {
                // 跳转到购买页面
                window.open('https://i2.y.qq.com/n3/cm/pages/putao/product_detail/index.html?productID=1198772461422142&business=putao', '_blank');
            });
        }

          // 如果按鈕存在
        if(scrollBtn) {
            // 如果滾動距離超過300px
            if(window.scrollY > 300) {
                // 顯示按鈕
                scrollBtn.classList.add('show');
            } else {
                // 隱藏按鈕
                scrollBtn.classList.remove('show');
            }
        }
    });

    // 音樂播放器功能
    initMusicPlayer();
});

function validateForm() { //聲明一個名為validateFrom的函數 function：關鍵字，用於聲明函數 validateFrom：函數名
    //獲取表單中各個輸入框的值 value：獲取輸入框的內容 trim（）：去除字符串兩端的空格
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const interest = document.getElementById('interest').value;
    const reason = document.getElementById('reason').value.trim();

    if(name.length <2) { //驗證姓名長度 name.length:獲取字符串的長度 <2:如果長度小於2 return false:返回false表示驗證失敗
        alert('請輸入有效的姓名（至少2個字符）');
        return false;
    }
    
    if(email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        alert('請輸入有效的電子郵件地址');
        return false;
    }

    // 驗證電話號碼（填寫必須得是數字）
    if (phone && !/^\d+$/.test(phone)) { //phone &&：如果phone不為空 | /^\d+$/:正則表達式，表示只能包含數字 | \d:數字字符 | +：一個或多個
        alert('請輸入有效的電話號碼（只能包含數字）');
        return false;
    }

     if(!interest) {
        alert('請選擇您的興趣領域');
        return false;
    }

    // 驗證申請理由的長度，如果所有驗證都通過，返回true
    if(reason.length <10){
        alert('請詳細說明您想加入的理由（至少10個字符）');
        return false;
    }

    return true ; //所有驗證通過，返回true
}
//創建一個平滑滾動到頁面頂部函數
function scrollToTop(){
    window.scrollToTop({ //滾動到指定位置的方法
        top:0, //滾動到頂部 （0元素位置）
        behavior:'smooth' //使用平滑滾動動畫
    });
}
// 音樂播放器初始化
function initMusicPlayer() {
    const audioPlayer = document.getElementById('audio-player');
    const playBtn = document.getElementById('play-btn');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const progressBar = document.querySelector('.progress');
    const currentTimeEl = document.getElementById('current-time');
    const totalTimeEl = document.getElementById('total-time');
    const albumImg = document.querySelector('.album-cover img');
    const songTitle = document.getElementById('song-title');
    const songAlbum = document.getElementById('song-album');

    // 歌曲列表
    const songs = [
        {
            title: "江南",
            album: "《第二天堂》專輯",
            src: "music/jiangnan.mp3",
            cover: "images/song1.jpg"
        },
        {
            title: "不為誰而作的歌",
            album: "《和自己對話》專輯",
            src: "music/buwei.mp3",
            cover: "images/song2.jpg"
        },
        {
            title: "她說",
            album: "《她說》專輯",
            src: "music/tashuo.mp3",
            cover: "images/song3.jpg"
        }
    ];
    
    let currentSongIndex = 0;
    let isPlaying = false;
    
    // 加載歌曲
    function loadSong(index) {
        const song = songs[index];
        audioPlayer.src = song.src;
        albumImg.src = song.cover;
        // 确保图片元素存在再设置src
        if (albumImg) {
            albumImg.src = song.cover;
            albumImg.alt = song.title;
        }

        songTitle.textContent = song.title;
        songAlbum.textContent = song.album;
        
        // 重置進度條
        progressBar.style.width = '0%';
        currentTimeEl.textContent = '0:00';
        totalTimeEl.textContent = '0:00';

        // 加载元数据获取总时长
        audioPlayer.addEventListener('loadedmetadata', function() {
            totalTimeEl.textContent = formatTime(audioPlayer.duration);
        }, { once: true });
    }
    
    // 播放/暫停
    function togglePlay() {
        if (isPlaying) {
            audioPlayer.pause();
            playBtn.textContent = '▶';
        } else {
            audioPlayer.play().catch(error => {
                console.error('播放失败:', error);
            });
            playBtn.textContent = '❚❚';
        }
        isPlaying = !isPlaying;
    }
    
    // 更新進度條
    function updateProgress(e) {
        const { duration, currentTime } = e.srcElement;
        const progressPercent = (currentTime / duration) * 100;
        progressBar.style.width = `${progressPercent}%`;
        
        // 更新時間顯示
        currentTimeEl.textContent = formatTime(currentTime);
        if (duration && !isNaN(duration)) {
            totalTimeEl.textContent = formatTime(duration);
        }
    }
    
    // 設置進度
    function setProgress(e) {
        const width = this.clientWidth;
        const clickX = e.offsetX;
        const duration = audioPlayer.duration;

        if (duration && !isNaN(duration)) {
            audioPlayer.currentTime = (clickX / width) * duration;
        }
    }
    
    // 下一首
    function nextSong() {
        // 先停止当前播放
        audioPlayer.pause();

        currentSongIndex = (currentSongIndex + 1) % songs.length;
        loadSong(currentSongIndex);

         // 如果是播放状态，立即播放新歌曲
        if (isPlaying) {
            // 确保新歌曲加载完成后再播放
            audioPlayer.addEventListener('canplay', function onCanPlay() {
                audioPlayer.play().catch(error => {
                    console.error('播放失败:', error);
                });
                audioPlayer.removeEventListener('canplay', onCanPlay);
            }, { once: true });
        } else {
            // 如果不是播放状态，更新按钮状态
            playBtn.textContent = '▶';
        }
    }
    
    // 上一首
    function prevSong() {
        audioPlayer.pause();

        currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
        loadSong(currentSongIndex);

        if (isPlaying) {
             audioPlayer.addEventListener('canplay', function onCanPlay() {
                audioPlayer.play().catch(error => {
                    console.error('播放失败:', error);
                });
                audioPlayer.removeEventListener('canplay', onCanPlay);
            }, { once: true });
        } else {
            playBtn.textContent = '▶';
        }
    }
    
    // 格式化時間
    function formatTime(seconds) {
        if (isNaN(seconds)) return '0:00';
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    }
    
    // 事件監聽器
    if (playBtn) {
        playBtn.addEventListener('click', togglePlay);
        prevBtn.addEventListener('click', prevSong);
        nextBtn.addEventListener('click', nextSong);
        audioPlayer.addEventListener('timeupdate', updateProgress);
        audioPlayer.addEventListener('ended', nextSong);
        audioPlayer.addEventListener('loadstart', function() {
            currentTimeEl.textContent = '0:00';
            progressBar.style.width = '0%';
        });
        
        const progressContainer = document.querySelector('.progress-bar');
        if (progressContainer) {
            progressContainer.addEventListener('click', setProgress);
        }   
        // 加載第一首歌
        loadSong(currentSongIndex);
    }
}

function saveToLocalStorage(formData) {
    // 获取现有数据或初始化空数组
    const existingData = JSON.parse(localStorage.getItem('formSubmissions')) || [];
    
    // 添加新数据
    existingData.push(formData);
    
    // 保存回本地存储
    localStorage.setItem('formSubmissions', JSON.stringify(existingData));
    
    console.log('数据已保存到本地存储');
    console.log('所有提交的数据:', existingData);
}
