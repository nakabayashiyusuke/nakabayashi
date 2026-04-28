document.addEventListener('DOMContentLoaded', () => {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    const progressBar = document.getElementById('progress-bar');

    function updateProgress() {
        const total = checkboxes.length;
        const checkedCount = document.querySelectorAll('input[type="checkbox"]:checked').length;
        const percentage = Math.round((checkedCount / total) * 100);

        // --- 追加ポイント：0%の判定 ---
        if (percentage === 0) {
            progressBar.classList.add('is-empty');
        } else {
            progressBar.classList.remove('is-empty');
        }
        // ----------------------------

        // バーの幅とテキストを更新
        progressBar.style.width = percentage + '%';
        progressBar.textContent = percentage + '%';

        // 完了した項目のスタイル更新
        checkboxes.forEach(checkbox => {
            const label = checkbox.nextElementSibling;
            if (checkbox.checked) {
                label.classList.add('is-completed');
            } else {
                label.classList.remove('is-completed'); 
            }
        });
    }

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', updateProgress);
    });
    
    updateProgress();
});