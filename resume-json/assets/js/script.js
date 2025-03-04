document.addEventListener("DOMContentLoaded", () => {
  const list = document.querySelector(".scroll-list");
  const items = Array.from(list.children);

  // Duplicate items to create a seamless effect
  items.forEach((item) => {
    let clone = item.cloneNode(true);
    list.appendChild(clone);
  });

  let scrollSpeed = .2; // Adjust scrolling speed
  let listWidth = list.scrollWidth / 2; // Get width of one full set of items

  function scrollLoop() {
    list.style.transform = `translateX(${-scrollPosition}px)`;
    scrollPosition += scrollSpeed;

    // Reset position for infinite effect
    if (scrollPosition >= listWidth) {
      scrollPosition = 0;
    }

    requestAnimationFrame(scrollLoop);
  }

  let scrollPosition = 0;
  scrollLoop();
});
