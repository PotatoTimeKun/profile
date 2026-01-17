document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".tab-button");
  const contents = document.querySelectorAll(".tab-content");

  function showTab(tabName) {
    // === フェードインアニメーションのリセット ===
    const sections = document.querySelectorAll('.work-card');
    sections.forEach(entry => {
      entry.classList.remove('visible');
    });
    fadeinObserve();

    // タブ切り替え処理
    buttons.forEach(btn => btn.classList.toggle("active", btn.dataset.tab === tabName));
    contents.forEach(content => content.classList.toggle("hidden", content.id !== tabName));
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

function fadeinObserve() {
  // === フェードインアニメーション ===
  const sections = document.querySelectorAll('.work-card');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // 一度だけ実行
      }
    });
  }, { threshold: 0.2 });

  sections.forEach(section => observer.observe(section));
}

fadeinObserve();