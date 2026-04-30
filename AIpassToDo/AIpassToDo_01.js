document.addEventListener('DOMContentLoaded', () => {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    const progressBar = document.getElementById('progress-bar');
    const STORAGE_KEY = 'ai_learning_progress';

    /**
     * 【保存】チェック状態保存
     */
    function saveProgress() {
        const checkedIds = Array.from(checkboxes)
        .filter(cb => cb.checked)
        .map(cb => cb.id);

        localStorage.setItem(STORAGE_KEY, JSON.stringify(checkedIds));
    }

    /**
     * 【読み込み】復元
     */
    function loadProgress() {
        const savedData = localStorage.getItem(STORAGE_KEY);
        if (!savedData) return;

        const checkedIds = JSON.parse(savedData);
        checkboxes.forEach(cb => {
        if (checkedIds.includes(cb.id)) {
        cb.checked = true;
        }
        });
    }

    /**
     * 【進捗更新】
     */
    function updateProgress() {
        const total = checkboxes.length;
        const checkedCount = Array.from(checkboxes).filter(cb => cb.checked).length;
        const percentage = total === 0 ? 0 : Math.round((checkedCount / total) * 100);

        // プログレスバー
        if (percentage === 0) {
        progressBar.classList.add('is-empty');
        } else {
        progressBar.classList.remove('is-empty');
        }
        progressBar.style.width = percentage + '%';
        progressBar.textContent = percentage + '%';

        // ラベル更新
        checkboxes.forEach(checkbox => {
        const label = checkbox.nextElementSibling;
        if (checkbox.checked) {
        label.classList.add('is-completed');
        } else {
        label.classList.remove('is-completed');
        }
        });

        // 章ごとの進捗更新
        const chapters = document.querySelectorAll('.chapter');
        chapters.forEach(chapter => {
        const boxes = chapter.querySelectorAll('input[type="checkbox"]');
        const checked = chapter.querySelectorAll('input[type="checkbox"]:checked');
        const span = chapter.querySelector('.chapter-progress');

        if (span) {
        span.textContent = `${checked.length}/${boxes.length}`;
        }
        });
    }

    // --- 🔥 アコーディオン機能追加 ---
    const chapterTitles = document.querySelectorAll('.chapter-title');

    chapterTitles.forEach(title => {
    title.addEventListener('click', () => {
    const chapter = title.parentElement;
    chapter.classList.toggle('open');
    });
    });

    // --- 初期化 ---

    loadProgress();
    updateProgress();

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {

    updateProgress();
    saveProgress();
    });
    });
});