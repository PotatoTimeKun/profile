document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll(".tab-button");
    const contents = document.querySelectorAll(".tab-content");
  
    function showTab(tabName) {
      // タブ切り替え処理
      buttons.forEach(btn => btn.classList.toggle("active", btn.dataset.tab === tabName));
      contents.forEach(content => content.classList.toggle("hidden", content.id !== tabName));
  
      // 表示中のタブ内のカードだけアニメーション遅延を設定
      const activeCards = document.querySelectorAll(`#${tabName} .fade-in`);
      activeCards.forEach((card, i) => {
        card.style.animationDelay = `${i * 0.15}s`;
      });
    }
  
    // URLパラメータから初期タブを選択
    const params = new URLSearchParams(window.location.search);
    const initialTab = params.get("tab") || "game";
    showTab(initialTab);
  
    // タブクリックで切り替え
    buttons.forEach(btn => {
      btn.addEventListener("click", () => {
        const tab = btn.dataset.tab;
        showTab(tab);
        history.replaceState(null, "", `?tab=${tab}`);
      });
    });
  });
  