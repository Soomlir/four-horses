const getDiff = () => {
  if (document.body.clientWidth >= 1262) {
    return 3;
  }
  return 1;
}

let diff = getDiff();
window.addEventListener('resize', () => {
  diff = getDiff();
});

document.querySelectorAll('[data-slider]').forEach((slider) => {
  const sliderItems = slider.querySelectorAll('[data-item]');
  const sliderButtons = slider.querySelectorAll('[data-to]');
  const prevButton = slider.querySelector('[data-prev]');
  const nextButton = slider.querySelector('[data-next]');
  const counter = slider.querySelector('[data-counter]');
  const lastIndex = sliderItems.length - 1;
  let currentIndex = 0;

  const setCounter = () => {
    if (counter) {
      counter.textContent = currentIndex + diff;
    }
  };

  const setSlide = (index) => {
    if (index >= lastIndex) {
      currentIndex = lastIndex;
    } else if (index <= 0) {
      currentIndex = 0;
    } else {
      currentIndex = index;
    }

    if (counter) {
      counter.textContent = currentIndex + diff;
    }

    prevButton.disabled = currentIndex === 0;
    nextButton.disabled = currentIndex === lastIndex;
    setCounter();

    sliderItems.forEach((item, i) => {
      if (i === currentIndex) {
        item.setAttribute('data-current', '');
        if (sliderButtons[i]) {
          sliderButtons[i].setAttribute('data-current', '');
        }
      } else {
        item.removeAttribute('data-current');
        if (sliderButtons[i]) {
          sliderButtons[i].removeAttribute('data-current');
        }
      }
    });
  };

  setCounter();

  slider.addEventListener('click', (event) => {
    if (event.target === prevButton) {
      setSlide(currentIndex - diff);    
    } else if (event.target === nextButton) {
      setSlide(currentIndex + diff);
    } else {
      sliderButtons.forEach((button, i) => {
        if (button === event.target) {
          setSlide(i);
        }
      });
    }
  });
});
