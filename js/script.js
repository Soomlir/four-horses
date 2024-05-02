document.querySelectorAll('[data-slider]').forEach((slider) => {
  const sliderItems = slider.querySelectorAll('[data-item]');
  const sliderButtons = slider.querySelectorAll('[data-to]');
  const prevButton = slider.querySelector('[data-prev]');
  const nextButton = slider.querySelector('[data-next]');
  const lastIndex = sliderItems.length - 1;
  let currentIndex = 0;

  const setSlide = (index) => {
    prevButton.disabled = false;
    nextButton.disabled = false;
    if (index > lastIndex) {
      currentIndex = lastIndex;
      nextButton.disabled = true;
    } else if (index < 0) {
      currentIndex = 0;
      prevButton.disabled = true;
    } else {
      currentIndex = index;
    }

    sliderItems.forEach((item, i) => {
      if (i === currentIndex) {
        item.setAttribute('data-current', '');
      } else {
        item.removeAttribute('data-current');
      }
    });
  };

  slider.addEventListener('click', (event) => {
    if (event.target === prevButton) {
      setSlide(currentIndex - 1);    
    } else if (event.target === nextButton) {
      setSlide(currentIndex + 1);
    }
    
    sliderButtons.forEach((button, i) => {
        if (button === event.target) {
          button.setAttribute('data-current', '');
          setSlide(i);
        } else {
          button.removeAttribute('data-current');
        }
    });
  });
});
