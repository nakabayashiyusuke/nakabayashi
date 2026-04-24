// すべてのチェックボックスを取得
const checkboxes = document.querySelectorAll('input[type="checkbox"]');

checkboxes.forEach(checkbox => {
    // チェック状態が変わった時のイベント
    checkbox.addEventListener('change', function() {
        // チェックボックスの隣にあるラベルを取得
        const label = this.nextElementSibling;
        
        if (this.checked) {
            // チェックが入ったらクラスを追加して緑色にする
            label.classList.add('is-completed');
        } else {
            // チェックが外れたらクラスを削除して元に戻す
            label.classList.remove('is-completed');
        }
    });
});