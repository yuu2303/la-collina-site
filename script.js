document.addEventListener('DOMContentLoaded', function() {
    
    // --- 日付を自動更新する機能 ---
    const dateElement = document.querySelector('.date');
    if (dateElement) {
        const today = new Date();
        const month = today.getMonth() + 1;
        const day = today.getDate();
        const week = ['日', '月', '火', '水', '木', '金', '土'];
        const dayOfWeek = week[today.getDay()];
        
        dateElement.textContent = `${month}月${day}日(${dayOfWeek})`;
    }

    // --- APIから本日の混雑状況を取得し、テーブルを動的に生成する機能 ---
    const todayStatusTableBody = document.querySelector('.today-status-table tbody');
    const apiUrl = 'https://la-collina-site-5.onrender.com/api/status'; // ★★★ここが重要★★★

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            todayStatusTableBody.innerHTML = ''; // テーブルの中身をクリア
            data.forEach(item => {
                const row = document.createElement('tr');
                
                // SVGアイコンの生成
                // ここでは簡略化のため、固定のアイコンを表示しています。
                // 本来はstatus_classに応じて表示を変えるロジックが必要です。
                const iconHtml = `
                    <div class="congestion-icon-svg ${item.status_class}">
                        <svg class="person-icon" viewBox="0 0 100 100"><path class="roof" d="M0 20 L50 0 L100 20 Z"></path><circle cx="50" cy="50" r="15"></circle><path d="M25 100 L25 70 L75 70 L75 100 Z"></path></svg>
                        <svg class="person-icon" viewBox="0 0 100 100"><path class="roof" d="M0 20 L50 0 L100 20 Z"></path><circle cx="50" cy="50" r="15"></circle><path d="M25 100 L25 70 L75 70 L75 100 Z"></path></svg>
                        <svg class="person-icon" viewBox="0 0 100 100"><path class="roof" d="M0 20 L50 0 L100 20 Z"></path><circle cx="50" cy="50" r="15"></circle><path d="M25 100 L25 70 L75 70 L75 100 Z"></path></svg>
                        <svg class="person-icon faint" viewBox="0 0 100 100"><path class="roof" d="M0 20 L50 0 L100 20 Z"></path><circle cx="50" cy="50" r="15"></circle><path d="M25 100 L25 70 L75 70 L75 100 Z"></path></svg>
                    </div>
                    <span>${item.status_text}</span>
                `;
                
                row.innerHTML = `
                    <th>${item.time}</th>
                    <td>${iconHtml}</td>
                `;
                todayStatusTableBody.appendChild(row);
            });
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
            todayStatusTableBody.innerHTML = '<tr><td colspan="2">情報の読み込みに失敗しました。</td></tr>';
        });

    // --- タブ切り替え機能 ---
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault(); 
            
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            button.classList.add('active');

            const contentId = button.id.replace('btn-', 'content-');
            document.getElementById(contentId).classList.add('active');
        });
    });

    // --- メニューの開閉機能 ---
    const menuOpenBtn = document.getElementById('menu-open-btn');
    const menuCloseBtn = document.getElementById('menu-close-btn');
    const menuOverlay = document.getElementById('menu-overlay');

    if (menuOpenBtn && menuCloseBtn && menuOverlay) {
        menuOpenBtn.addEventListener('click', () => {
            menuOverlay.classList.add('open');
        });

        menuCloseBtn.addEventListener('click', () => {
            menuOverlay.classList.remove('open');
        });
    }
});