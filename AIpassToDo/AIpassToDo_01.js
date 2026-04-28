document.addEventListener('DOMContentLoaded', () => {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    const progressBar = document.getElementById('progress-bar');
    const STORAGE_KEY = 'ai_learning_progress'; // ローカルストレージ用のキー名

    /**
     * 【保存】現在のチェック状態をローカルストレージに保存する
     */
    function saveProgress() {
        const checkedIds = Array.from(checkboxes)
            .filter(cb => cb.checked)
            .map(cb => cb.id);
        
        localStorage.setItem(STORAGE_KEY, JSON.stringify(checkedIds));
    }

    /**
     * 【読み込み】保存されたデータを復元する
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
     * 【更新】画面上の進捗表示（バー、章ごとの数字、スタイル）を更新する
     */
    function updateProgress() {
        const total = checkboxes.length;
        const checkedCount = Array.from(checkboxes).filter(cb => cb.checked).length;
        const percentage = total === 0 ? 0 : Math.round((checkedCount / total) * 100);

        // プログレスバーの更新
        if (percentage === 0) {
            progressBar.classList.add('is-empty');
        } else {
            progressBar.classList.remove('is-empty');
        }
        progressBar.style.width = percentage + '%';
        progressBar.textContent = percentage + '%';

        // ラベルのスタイル（緑色・太字）の更新
        checkboxes.forEach(checkbox => {
            const label = checkbox.nextElementSibling;
            if (checkbox.checked) {
                label.classList.add('is-completed');
            } else {
                label.classList.remove('is-completed'); 
            }
        });

        // 章ごとの進捗（0/0 の部分）の更新
        const chapters = document.querySelectorAll('h2');
        chapters.forEach(h2 => {
            const group = h2.nextElementSibling;
            if (!group) return;

            const boxes = group.querySelectorAll('input[type="checkbox"]');
            const checked = group.querySelectorAll('input[type="checkbox"]:checked');
            const span = h2.querySelector('.chapter-progress');
            if (span) {
                span.textContent = `${checked.length}/${boxes.length}`;
            }
        });
    }

    // --- 初期化処理 ---

    // 1. 保存されているデータを読み込む
    loadProgress();

    // 2. 読み込んだデータに基づいて表示を最新にする
    updateProgress();

    // 3. 各チェックボックスにイベントを設定
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            updateProgress(); // 見た目を更新
            saveProgress();   // データを保存
        });
    });
});