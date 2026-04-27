document.addEventListener('DOMContentLoaded', () => {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    const progressBar = document.getElementById('progress-bar');

// 進捗バーの更新とラベルの装飾を一括で行う関数
    function updateProgress() {
        const total = checkboxes.length;
        const checkedCount = document.querySelectorAll('input[type="checkbox"]:checked').length;
        const percentage = Math.round((checkedCount / total) * 100);

    // バーの幅とテキストを更新
    progressBar.style.width = percentage + '%';
    progressBar.textContent = percentage + '%';

    // すべてのチェックボックスに対してラベルのスタイルを更新
   checkboxes.forEach(checkbox => {
        const label = checkbox.nextElementSibling;
        if (checkbox.checked) {
        label.classList.add('is-completed');
        } else {
        label.classList.remove('is-completed');
        }
        });
}

    // すべてのチェックボックスにイベントリスナーを設定
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', updateProgress);
    });

    // ページ読み込み時に一度実行して初期状態を整える
    updateProgress();
});