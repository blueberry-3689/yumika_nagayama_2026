$(function () {
  const $slides = $("#slide li");
  const $buttons = $("#button ul li a");
  let currentIndex = 0;
  let timer;

  // --------------------
  // スライド表示処理
  // --------------------
  function showSlide(index) {
    if (index === currentIndex) return;

    const $current = $slides.eq(currentIndex);
    const $next = $slides.eq(index);

    // 今表示中のスライドをフェードアウト
    $current.stop(true, true).fadeOut(800);

    // 次のスライドをフェードイン
    $next.stop(true, true).fadeIn(800);

    // インジケーター更新
    $buttons.removeClass("active");
    $buttons.eq(index).addClass("active");

    currentIndex = index;
  }

  // --------------------
  // 初期表示
  // --------------------
  $slides.hide().eq(0).show();
  $buttons.eq(0).addClass("active");

  // --------------------
  // 自動スライド開始
  // --------------------
  function startAutoSlide() {
    timer = setInterval(function () {
      const nextIndex = (currentIndex + 1) % $slides.length;
      showSlide(nextIndex);
    }, 5000);
  }

  startAutoSlide();

  // --------------------
  // インジケータークリック
  // --------------------
  $buttons.on("click", function (e) {
    e.preventDefault();

    clearInterval(timer); // 一旦停止

    const index = $buttons.index(this);
    showSlide(index);

    startAutoSlide(); // 再開
  });
});
