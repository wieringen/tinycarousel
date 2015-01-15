function injectFixture(fixtureName, target) {
  target = target || document.body;

  target.innerHTML = __html__[fixtureName];
}

function clearFixture(target) {
  target = target || document.body;
  target.innerHTML = '';
}