document.querySelectorAll('[data-slider]').forEach((slider) => {
  const sliderItems = slider.querySelectorAll('[data-item]');
  const sliderButtons = slider.querySelectorAll('[data-to]');
  const prevButton = slider.querySelector('[data-prev]');
  const nextButton = slider.querySelector('[data-next]');
  const lastIndex = sliderItems.length - 1;
  let currentIndex = 0;

  const setSlide = (index) => {
    if (index >= lastIndex) {
      currentIndex = lastIndex;
    } else if (index <= 0) {
      currentIndex = 0;
    } else {
      currentIndex = index;
    }
    prevButton.disabled = currentIndex === 0;
    nextButton.disabled = currentIndex === lastIndex;

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


  slider.addEventListener('click', (event) => {
    if (event.target === prevButton) {
      setSlide(currentIndex - 1);    
    } else if (event.target === nextButton) {
      setSlide(currentIndex + 1);
    } else {
      sliderButtons.forEach((button, i) => {
        if (button === event.target) {
          setSlide(i);
        }
      });
    }
  });
});
