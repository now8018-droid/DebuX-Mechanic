const r = l;
for (var e = l, t = u(); ; )
  try {
    if (
      902769 ==
      +parseInt(e(373)) +
        -parseInt(e(394)) / 2 +
        (parseInt(e(395)) / 3) * (-parseInt(e(387)) / 4) +
        parseInt(e(385)) / 5 +
        (-parseInt(e(381)) / 6) * (parseInt(e(386)) / 7) +
        (-parseInt(e(392)) / 8) * (parseInt(e(368)) / 9) +
        parseInt(e(393)) / 10
    )
      break;
    t.push(t.shift());
  } catch (e) {
    t.push(t.shift());
  }
const n = document.querySelector(".bottom-section");
let o = !1,
  s,
  c;
function u() {
  const e = [
    "cursor",
    "mousedown",
    "8393325bYjVSA",
    "742rBeDGO",
    "95372EemExM",
    "grabbing",
    "scrollTop",
    "preventDefault",
    "clientY",
    "40928UKGFbv",
    "7600860fbHkpl",
    "15576yRZXOq",
    "165ZWCnfV",
    "grab",
    "639oIgCEv",
    "log",
    "top",
    "offsetLeft",
    "left",
    "513909hFXyNf",
    ".l-items",
    "mousemove",
    "scrollLeft",
    "clientX",
    "addEventListener",
    "mouseup",
    "pageX",
    "20802ttoyQl",
    "style",
  ];
  return (u = function () {
    return e;
  })();
}
var a = () => {
  var e = l;
  (o = !1), (n[e(382)][e(383)] = e(396));
};
function l(e, t) {
  const n = u();
  return (l = function (e, t) {
    return (e -= 368), n[e];
  })(e, t);
}
n[r(378)](r(375), (e) => {
  var t = r;
  e[t(390)](), o && ((e = e[t(380)] - n[t(371)] - s), (n[t(376)] = c - e));
}),
  n.addEventListener(
    r(384),
    (e) => {
      var t = r;
      (o = !0),
        (s = e[t(380)] - n[t(371)]),
        (c = n.scrollLeft),
        (n.style.cursor = t(388));
    },
    !1
  ),
  n[r(378)]("mouseup", a, !1),
  n.addEventListener("mouseleave", a, !1);
const f = document.querySelector(r(374));
let v;
function p(e) {
  var t = r,
    n = e[t(377)] - v.x,
    e = e[t(391)] - v.y;
  (f[t(389)] = v[t(370)] - e), (f.scrollLeft = v[t(372)] - n);
}
function i() {
  var e = r;
  document.removeEventListener(e(375), p),
    document.removeEventListener(e(379), i),
    (f[e(382)].cursor = e(396)),
    f[e(382)].removeProperty("user-select");
}
f.addEventListener(r(384), function (e) {
  var t = r;
  (f[t(382)][t(383)] = t(388)),
    (f[t(382)].userSelect = "none"),
    (v = { left: f[t(376)], top: f.scrollTop, x: e[t(377)], y: e[t(391)] }),
    document[t(378)]("mousemove", p, !1),
    document[t(378)](t(379), i, !1);
});
