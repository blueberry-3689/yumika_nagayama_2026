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

    // --------------------
  // スワイプ・ドラッグ操作
  // --------------------
  let startX = 0;
  let endX = 0;
  const threshold = 50; // これ以上動いたら反応（px）

  // スマホ：タッチ開始
  $("#slide").on("touchstart", function (e) {
    startX = e.originalEvent.touches[0].clientX;
  });

  // スマホ：タッチ終了
  $("#slide").on("touchend", function (e) {
    endX = e.originalEvent.changedTouches[0].clientX;
    handleSwipe();
  });

  // PC：マウス押下
  $("#slide").on("mousedown", function (e) {
    startX = e.clientX;
  });

  // PC：マウス離す
  $("#slide").on("mouseup", function (e) {
    endX = e.clientX;
    handleSwipe();
  });

  // スワイプ判定
  function handleSwipe() {
    const diff = startX - endX;

    if (Math.abs(diff) < threshold) return;

    clearInterval(timer); // 自動再生を一旦止める

    if (diff > 0) {
      // 左にスワイプ → 次へ
      showSlide((currentIndex + 1) % $slides.length);
    } else {
      // 右にスワイプ → 前へ
      showSlide(
        (currentIndex - 1 + $slides.length) % $slides.length
      );
    }

    startAutoSlide(); // 自動再生再開
  }

});
