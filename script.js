document.addEventListener('DOMContentLoaded', function() {
    // --- 日付を自動更新する機能 ---
    const dateElement = document.querySelector('.date');
    if (dateElement) {
        const today = new Date();
        const month = today.getMonth() + 1; // getMonth()は0から始まるため+1
        const day = today.getDate();
        const week = ['日', '月', '火', '水', '木', '金', '土'];
        const dayOfWeek = week[today.getDay()];
        
        dateElement.textContent = `${month}月${day}日(${dayOfWeek})`;
    }
    
    // --- タブ切り替え機能 ---
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // すべてのボタンとコンテンツから 'active' クラスを削除
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // クリックされたボタンに 'active' クラスを追加
            button.classList.add('active');

            // 対応するコンテンツを表示
            const contentId = button.id.replace('btn-', 'content-');
            document.getElementById(contentId).classList.add('active');
        });
    });

});