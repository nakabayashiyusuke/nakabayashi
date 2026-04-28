document.addEventListener('DOMContentLoaded', () => {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    const progressBar = document.getElementById('progress-bar');

    function updateProgress() {
        const total = checkboxes.length;
        const checkedCount = document.querySelectorAll('input[type="checkbox"]:checked').length;
        const percentage = Math.round((checkedCount / total) * 100);

        // --- 0%判定 ---
        if (percentage === 0) {
            progressBar.classList.add('is-empty');
        } else {
            progressBar.classList.remove('is-empty');
        }

        // バー更新
        progressBar.style.width = percentage + '%';
        progressBar.textContent = percentage + '%';

        // チェック済みスタイル
        checkboxes.forEach(checkbox => {
            const label = checkbox.nextElementSibling;
            if (checkbox.checked) {
                label.classList.add('is-completed');
            } else {
                label.classList.remove('is-completed'); 
            }
        });

        // =========================
        // ⭐ ここから追加（章ごと進捗）
        // =========================
        const chapters = document.querySelectorAll('h2');

        chapters.forEach(h2 => {
            const group = h2.nextElementSibling;
            if (!group) return;

            const boxes = group.querySelectorAll('input[type="checkbox"]');
            const checked = group.querySelectorAll('input[type="checkbox"]:checked');

            const total = boxes.length;
            const done = checked.length;

            const span = h2.querySelector('.chapter-progress');
            if (span) {
                span.textContent = `${done}/${total}`;
            }
        });
        // =========================
    }

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', updateProgress);
    });

    updateProgress();
});