const spell = document.querySelector(".l-spell"),
  sval = spell.innerHTML;
spell.innerHTML = "";
sval.split("").forEach((char) => {
  let cchar = document.createElement("span");
  cchar.appendChild(document.createTextNode(char));
  spell.appendChild(cchar);
});

document.querySelectorAll(".progress").forEach((progress) => {
  let percent = +progress.getAttribute("percent") || 25;
  progress.querySelector(".p-percent").style.width = `${percent}%`;
});

console.log("discord.gg/debux | Tebex : debux.shop");
let idx = 0;

$(document).ready(function () {
  window.addEventListener("message", function (event) {
    if (event.data.action == "openmenu") {
      $("body").css("display", "block");
    } else if (event.data.action == "close") {
      $("body").css("display", "none");
      $(".l-items").empty();
      $(".b-items").empty();
    } else if (event.data.action == "sound") {
      var sdasd = document.getElementById("myAudio");
      sdasd.play();
      sdasd.volume = 0.5;
      setTimeout(function () {
        var interval = setInterval(function () {
          if (sdasd.volume > 0.1) {
            sdasd.volume -= 0.1;
          } else {
            clearInterval(interval);
            sdasd.volume = 0.5;
            sdasd.pause();
          }
        }, 100);
      }, 1000);
    } else if (event.data.action == "update") {
      $("#speed_prog .p-val").html(event.data.topspeed + " KM/H");
      var topspeedChunk = Math.floor(event.data.topspeed / 25);
      var increasePercentage = topspeedChunk * 10;
      var widthPercentage = Math.min(100, increasePercentage);
      $("#speed_prog .p-percent").css("width", widthPercentage + "%");

      var topspeedChunk = Math.floor(event.data.brakes / 25);
      var increasePercentage = topspeedChunk * 10;
      var widthPercentage = Math.min(100, increasePercentage);
      $("#brake_prog .p-percent").css("width", widthPercentage + "%");
      $("#brake_prog .p-val").html(Math.floor(event.data.brakes) + " BHP");

      var topspeedChunka = Math.floor(event.data.torque / 25);
      var increasePercentagea = topspeedChunka * 10;
      var widthPercentagea = Math.min(100, increasePercentagea);
      $("#torque_prog .p-percent").css("width", widthPercentagea + "%");
      $("#torque_prog .p-val").html(event.data.torque + " Nm");

      var topspeedChunk = Math.floor(event.data.power / 25);
      var increasePercentage = topspeedChunk * 10;
      var widthPercentage = Math.min(100, increasePercentage);
      $("#power_prog .p-percent").css("width", widthPercentage + "%");
      $("#power_prog .p-val").html(event.data.power + " HP");

      $("#engine_prog .p-percent").css("width", event.data.health + "%");
      $("#engine_prog .p-val").html(event.data.health + "%");

      $("#fuel_prog .p-percent").css("width", event.data.fuel + "%");
      $("#fuel_prog .p-val").html(event.data.fuel + "%");
    } else if (event.data.action == "addMods") {
      html =
        `
      <div class="l-item" id="` +
        event.data.id +
        `" onclick="SelectMode('` +
        event.data.id +
        `')">
      <div class="l-item-tape"><img src="./imgs/left-tape.svg" /></div>
      <div class="l-item-img"><img src="` +
        event.data.img +
        `" /></div>
      <div class="l-item-content">
        <div class="l-item-top">retrofit</div>
        <div class="l-item-title">` +
        event.data.label +
        `</div>
      </div>
    </div>
    `;
      $(".l-items").prepend(html);
    } else if (event.data.action == "emptyall") {
      $(".l-items").empty();
    } else if (event.data.action == "emptyitem") {
      $(".b-items").empty();
    } else if (event.data.action == "addItems") {
      html =
        `
        <div  id="` +
        event.data.id +
        `" onclick="SelectItem('` +
        event.data.id +
        `')" class="b-item ` +
        getRandomColor() +
        `">
          <div class="b-item-img"><img src="` +
        event.data.img +
        `" /></div>
          <div class="b-item-tp">
            <div class="b-item-tp-title">` +
        event.data.label +
        `</div>
            <div class="b-item-tp-price">$ ` +
        event.data.price +
        `</div>
          </div>
        </div>
    `;
      $(".b-items").prepend(html);
      if (event.data.select) {
        $(".b-item").removeClass("newwidth");
        $("#" + event.data.id).addClass("newwidth");
      }
    } else if (event.data.action == "updateprice") {
      $(".tp-price").html("$ " + event.data.price);
    }
  });
});

$(document).on("keydown", function (event) {
  switch (event.keyCode) {
    case 27: // ESC
      closex();
  }
});

function SelectMode(id) {
  $(".l-item").removeClass("active");
  $("#" + id).addClass("active");

  $.post("https://BakiTelli_mechanic/SellectId", JSON.stringify({ id: id }));
}

function SelectItem(id) {
  $(".b-item").removeClass("newwidth");
  $("#" + id).addClass("newwidth");
  $.post("https://BakiTelli_mechanic/SellectItem", JSON.stringify({ id: id }));
}

function closex() {
  $.post("https://BakiTelli_mechanic/close");
}

function changecamera() {
  $.post("https://BakiTelli_mechanic/changecam");
}

function getRandomColor() {
  const colors = ["blue", "red", "green", "gray", "green"];
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
}

function BuyItem() {
  $.post("https://BakiTelli_mechanic/BuyItem");
}

document.addEventListener("mousedown", function (e) {
  if (e.button === 2) {
    $("body").animate(
      {
        opacity: "0.7",
      },
      1000
    );
    $.post(
      "https://BakiTelli_mechanic/rightClick",
      JSON.stringify({}),
      function () {
        $("body").animate(
          {
            opacity: "0.99",
          },
          1000
        );
      }
    );
  }
});
