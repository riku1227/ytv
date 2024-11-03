/**
 * Auto Skip Ads
 * YouTubeの広告をスキップできるようになったら、自動的にスキップするようにします
 */

setInterval(() => {
    // 広告をスキップするボタン
    const skipButton = document.getElementsByTagName("ytlr-skip-button-renderer")[0];
    if(skipButton === undefined) return;
    
    // エンターキーを押すイベントを作成
    const event = new KeyboardEvent('keydown', {
        bubbles: true,
        cancelable: true,
        view: window,
        key: 'Enter',
        keyCode: 13,
        charCode: 13,
    });
    
    // スキップボタンに対し、エンターキーを押すイベントを発火させる
    skipButton.dispatchEvent(event);
}, 100);
