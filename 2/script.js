const btn = document.querySelector('.btn');

btn.addEventListener('click', () => {
  window.alert(`Размеры экрана девайса\/монитора: ${window.screen.width}x${window.screen.height}\nРазмер окна браузера: ${window.innerWidth}x${window.innerHeight} (с учетом скролла); ${ document.documentElement.clientWidth}x${ document.documentElement.clientHeight}(без учета скрола) `)
});