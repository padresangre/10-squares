const numDivs = 36;
const maxHits = 10;

let hits = 0;
let miss = 0;
let firstHitTime = 0;

function round() {
  // FIXME: надо бы убрать "target" прежде чем искать новый // done
  if ($(".game-field").hasClass("target") || $(".game-field").hasClass("miss")) {
    $(".game-field").removeClass("target").removeClass("miss").text("");
  }

  let divSelector = randomDivId();
  $(divSelector).addClass("target");
  // TODO: помечать target текущим номером // done
  $(".target").text(hits + 1);
  // FIXME: тут надо определять при первом клике firstHitTime // done
  if (hits === 1) {
    firstHitTime = getTimestamp();
  }

  if (hits === maxHits) {
    endGame();
  }
}

function endGame() {
  // FIXME: спрятать игровое поле сначала // done

  $(".gameWindow").addClass("d-none");
  let totalPlayedMillis = getTimestamp() - firstHitTime;
  let totalPlayedSeconds = Number(totalPlayedMillis / 1000).toPrecision(3);
  $("#total-time-played").text(totalPlayedSeconds);
  $("#total-miss").text(miss);
  $("#total-hits").text(hits + miss);

  $("#win-message").removeClass("d-none");
}

function handleClick(event) {
  // FIXME: убирать текст со старых таргетов. Кажется есть .text? // done
  if ($(event.target).hasClass("target")) {
    hits = hits + 1;

    round();
  }
  else {
    $(event.target).addClass("miss");
    miss += 1;
    if (hits > 0) {
      hits -= 1;
    }
  }
  // TODO: как-то отмечать если мы промахнулись? См CSS класс .miss // done
}

function init() {
  // TODO: заказчик просил отдельную кнопку, запускающую игру а не просто по загрузке // done
  round();

  $(".game-field").click(handleClick);
  $("#button-reload").click(function () {
    location.reload();
  });
  $("#button-reloaded-2").click(function () {
    hits = 0;
    miss = 0;
    firstHitTime = 0;
    $(".gameWindow").removeClass("d-none");
    $("#win-message").addClass("d-none");
    round();
  });
}

$(document).ready(init);
